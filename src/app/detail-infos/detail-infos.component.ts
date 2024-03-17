import { Component, effect, inject } from '@angular/core';
import { RiskCountriesService } from '../risk-countries.service';
import { RiskCountry } from '../risk-country';


@Component({
  selector: 'app-detail-infos',
  templateUrl: './detail-infos.component.html',
  styleUrl: './detail-infos.component.scss',
})
export class DetailInfosComponent {

  #riskCountriesService = inject(RiskCountriesService);
  selectedCountry = this.#riskCountriesService.selectedCountry;
  expanded = false;
  flagImg = "https://flagsapi.com/BE/flat/64.png";
  constructor() {
    effect(() => {
      this.selectedCountry();
      if(this.selectedCountry().countryCode !== undefined){
        this.expanded = true;
        this.flagImg = "https://flagsapi.com/".concat(this.selectedCountry().countryCode).concat("/flat/64.png");
      }
      else{
        this.expanded = false;
      }
    });
  }

  close(){
    this.expanded = false;
    this.#riskCountriesService.setSelectedCountry(new RiskCountry({}));
  }


}
