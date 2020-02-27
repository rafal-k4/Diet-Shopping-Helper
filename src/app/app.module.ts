import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {
  DICTIONARY_PRODUCT_MAPPER_TOKEN,
  DIET_HARMONOGRAM_MAPPER_TOKEN,
  DICTIONARY_PRODUCT_MAPPER_FACTORY,
  DIET_HARMONOGRAM_MAPPER_FACTORY,
  CONFIG_SERVICE_VALUE
   } from './Infrastructure/InjectionTokens';
import { ConfigService } from './config.service';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { DropdownInitDirective } from './infrastructure/dropdown-init.directive';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ShoppingListComponent,
    DropdownInitDirective,
    FooterComponent
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
