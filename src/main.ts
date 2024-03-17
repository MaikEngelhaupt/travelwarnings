import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { signal } from '@angular/core';
import { RiskCountry } from './app/risk-country';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

