import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RiskCountry } from './risk-country';

@Injectable({
  providedIn: 'root'
})
export class RiskCountriesService {

  private http = inject(HttpClient);

  private url = 'https://www.auswaertiges-amt.de/opendata/travelwarning';

  private selectedCountrySignal = signal(new RiskCountry({}));
  readonly selectedCountry = this.selectedCountrySignal.asReadonly();

  public isLoadingCountryDataSignal = signal(false);
  readonly isLoadingCountryData = this.isLoadingCountryDataSignal.asReadonly();

  public getRiskCountriesApi(): Observable<any> {
    return this.http.get(this.url);
  }

  public getRiskCountries(): Observable<RiskCountry[]> {
    return this.getRiskCountriesApi().pipe(
      map((data: any) => Object.keys(data.response)
      .filter((key: string) => key !== 'contentList' && key !== 'lastModified') .map((key: string) => {
          data.response[key].contentId = key;
          return new RiskCountry(data.response[key]);

      }))
    );
  }

  public setSelectedCountry(country: RiskCountry) {
    if(country.contentId === undefined) {
      this.selectedCountrySignal.update(() => country);
      this.isLoadingCountryDataSignal.update(() => false);
      return;
    }

    (this.getRiskCountryDetails(country.contentId)).subscribe((data) => {
      country.content = data.response[country.contentId].content;
      this.selectedCountrySignal.update(() => country);
      this.isLoadingCountryDataSignal.update(() => false);
    });
  }

  public getRiskCountryDetails(contentId: string): Observable<any> {
    return this.http.get(this.url.concat('/').concat(contentId));
  }

}
