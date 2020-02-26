import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { HttpClientModule } from '@angular/common/http';
import {
  DICTIONARY_PRODUCT_MAPPER_TOKEN,
  DIET_HARMONOGRAM_MAPPER_TOKEN,
  DICTIONARY_PRODUCT_MAPPER_FACTORY,
  DIET_HARMONOGRAM_MAPPER_FACTORY,
  CONFIG_SERVICE_VALUE
   } from './Infrastructure/InjectionTokens';
import { ConfigService } from './config.service';
import { ResponsiveNavbarComponent } from './responsive-navbar/responsive-navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    ResponsiveNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: DICTIONARY_PRODUCT_MAPPER_TOKEN,
      useFactory: DICTIONARY_PRODUCT_MAPPER_FACTORY
    },
    {
      provide: DIET_HARMONOGRAM_MAPPER_TOKEN,
      useFactory: DIET_HARMONOGRAM_MAPPER_FACTORY
    },
    {
      provide: ConfigService,
      useValue: CONFIG_SERVICE_VALUE
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
