import { Component, effect, inject, signal } from '@angular/core';
import { RiskCountriesService } from './risk-countries.service';
import { OpenAiServiceService } from './open-ai-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'travelwarnings';

  #riskCountriesService = inject(RiskCountriesService);

  selectedCountry = this.#riskCountriesService.selectedCountry;
  isLoadingCountryData = this.#riskCountriesService.isLoadingCountryData;
  expanded = false;

  constructor() {


    effect(() => {
      this.selectedCountry();
      this.isLoadingCountryData();
      if(this.selectedCountry().countryCode !== undefined){
        this.expanded = true;
      }
      else{
        this.expanded = false;
      }
    });
  }
}
