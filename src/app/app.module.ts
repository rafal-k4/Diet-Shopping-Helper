import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
import { ProductdataPipe } from './infrastructure/productdata.pipe';
import { Reflection } from './Infrastructure/Reflection';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ShoppingListComponent,
    DropdownInitDirective,
    FooterComponent,
    ProductdataPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
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
      provide: ConfigService,
      useValue: CONFIG_SERVICE_VALUE
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
