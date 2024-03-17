import { RiskCountry } from './risk-country';

describe('RiskCountry', () => {
  it('should create an instance', () => {
  });

  it('should set the countryCode property correctly', () => {
    const riskCountry = new RiskCountry({ countryCode: 'US', countryName: 'United States' });
    expect(riskCountry.countryCode).toBe('US');
  });

  it('should set the countryName property correctly', () => {
    const riskCountry = new RiskCountry({ countryCode: 'US', countryName: 'United States' });
    expect(riskCountry.countryName).toBe('United States - Keine Daten verfügbar');
  });

  it('should throw an error when no parameters are provided', () => {
    expect(() => new RiskCountry(null)).toThrowError();
  });
});
