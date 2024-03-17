import { Component, Inject, NgZone, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from "@amcharts/amcharts5/map";
import worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark';
import { RiskCountriesService } from '../risk-countries.service';
import { RiskCountry } from '../risk-country';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})

export class MapComponent {
  private root!: am5.Root;
  #riskCountriesService = inject(RiskCountriesService)
  riskCountries: Observable<RiskCountry[]> = this.#riskCountriesService.getRiskCountries();

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) { }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    this.browserOnly(() => {
      let root = am5.Root.new("chartdiv");

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(am5map.MapChart.new(root, {})
      );
      let polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: worldLow
        })
      );

      polygonSeries.mapPolygons.template.setAll({
        tooltipText: "{countryName}",
        templateField: "polygonSettings",
        interactive: true,
        cursorOverStyle: "pointer"
      });

      polygonSeries.mapPolygons.template.states.create("hover", {
        opacity: 0.6
      });

      this.riskCountries.subscribe((data: RiskCountry[]) => {

        let contryCodePoly = polygonSeries.dataItems.map((item: any) => item);
        let dataCountryCode = data.map((item: any) => item.countryCode);
        let notIncludedCountries = contryCodePoly.filter((country: any) => !dataCountryCode.includes(country.get("id")));

        notIncludedCountries.forEach((country: any) => {
          let tempRiskCountry = new RiskCountry({ countryCode: country.get("id"), countryName: country.dataContext.name });
          data.push(tempRiskCountry);
        });

        polygonSeries.data.setAll(data);
      });

      polygonSeries.mapPolygons.template.events.on("click", (ev) => {
        if (ev.target.dataItem !== undefined) {
          this.setSelectedCountry(new RiskCountry(ev.target.dataItem.dataContext));
        }
      });
      this.root = root;
    });

  }

  setSelectedCountry(country: RiskCountry) {
    this.#riskCountriesService.isLoadingCountryDataSignal.update(() => true);
    this.#riskCountriesService.setSelectedCountry(country);
  }

  ngOnDestroy() {
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }

}
