import { TestBed } from '@angular/core/testing';

import { RiskCountriesService } from './risk-countries.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { RiskCountry } from './risk-country';
import { HttpErrorResponse } from '@angular/common/http';
describe('RiskCountriesService', () => {
  let service: RiskCountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RiskCountriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

  it('should return an empty array when the API returns no data', () => {
    httpClientSpy.get.and.returnValue(of([]));

    service.getRiskCountries().subscribe({
      next: riskCountries => expect(riskCountries.length).toBe(0, 'expected no risk countries'),
      error: err => fail('expected no errors, but got ' + err)
    });
  });
});
