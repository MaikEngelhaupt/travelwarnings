import * as am5 from '@amcharts/amcharts5';
export class RiskCountry {

  lastModified: number = 0;
  effective: number = 0;
  title: string = '';
  countryCode: string = '';
  iso3CountryCode: string = '';
  countryName: string = '';
  warning: boolean = false;
  partialWarning: boolean = false;
  situationWarning: boolean = false;
  situationPartWarning: boolean = false;
  contentId: string = '';
  id: string= '';
  content: string = '';
  polygonSettings:any = {}

  constructor(data: any) {
    this.lastModified = data.lastModified;
    this.effective = data.effective;
    this.title = data.title;
    this.countryCode = data.countryCode;
    this.iso3CountryCode = data.iso3CountryCode;
    this.countryName = data.countryName;
    this.warning = data.warning;
    this.partialWarning = data.partialWarning;
    this.situationWarning = data.situationWarning;
    this.situationPartWarning = data.situationPartWarning;
    this.contentId = data.contentId;
    this.id = data.countryCode;
    this.polygonSettings.fill = am5.color(0x4EDC68);
    this.setCountryColor();
    this.checkContentId();
  }

  private setCountryColor() {
    if (this.warning) {
      this.polygonSettings.fill = am5.color(0xdc6767);
    }
    else if (this.partialWarning) {
      this.polygonSettings.fill = am5.color(0xdcd467);
    }
  }

  private checkContentId(){
    if (this.contentId === undefined && this.countryName !== undefined) {
      this.polygonSettings.fill = am5.color(0xa3a9b2);
      this.countryName = this.countryName.concat(" - Keine Daten verfügbar");
    }
  }
}
