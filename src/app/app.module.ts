import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {
  DICTIONARY_PRODUCT_MAPPER_TOKEN,
  DIET_HARMONOGRAM_MAPPER_TOKEN,
  AVAILABLE_DIETS_MAPPER_TOKEN,
  AVAILABLE_DIETS_MAPPER_FACTORY,
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
import { ProductdataPipe } from './infrastructure/productdata.pipe';
import { Reflection } from './Infrastructure/Reflection';
import { ProductSelectSearchComponent } from './product-select-search/product-select-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DayscardComponent } from './home/dayscard/dayscard.component';
import { CookieService } from 'ngx-cookie-service';
import { SelectDietComponent } from './select-diet/select-diet.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ShoppingListComponent,
    DropdownInitDirective,
    FooterComponent,
    ProductdataPipe,
    ProductSelectSearchComponent,
    DayscardComponent,
    SelectDietComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [
    CookieService,
    {
      provide: DICTIONARY_PRODUCT_MAPPER_TOKEN,
      useFactory: DICTIONARY_PRODUCT_MAPPER_FACTORY,
      deps: [Reflection]
    },
    {
      provide: DIET_HARMONOGRAM_MAPPER_TOKEN,
      useFactory: DIET_HARMONOGRAM_MAPPER_FACTORY,
      deps: [Reflection]
    },
    {
      provide: AVAILABLE_DIETS_MAPPER_TOKEN,
      useFactory: AVAILABLE_DIETS_MAPPER_FACTORY,
      deps: [Reflection]
    },
    {
      provide: ConfigService,
      useValue: CONFIG_SERVICE_VALUE
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
