import { InjectionToken } from '@angular/core';
import { ProductDictionaryModel } from '../Models/ProductDictionaryModel';
import { Mapper } from './Mapper';
import { ProductModel } from '../Models/ProductModel';
import { Reflection } from './Reflection';
import { ConfigService } from '../config.service';
import { APP_CONFIG, SpreadsheetBaseUrl } from './Consts';


export const DICTIONARY_PRODUCT_MAPPER_TOKEN = new InjectionToken<Mapper<ProductDictionaryModel>>('dictionary-product-mapper-token');
export const DICTIONARY_PRODUCT_MAPPER_FACTORY = (reflect: Reflection) => {
  return new Mapper<ProductDictionaryModel>(ProductDictionaryModel, reflect);
};

export const DIET_HARMONOGRAM_MAPPER_TOKEN = new InjectionToken<Mapper<ProductModel>>('diet-harmonogram-mapper-token');
export const DIET_HARMONOGRAM_MAPPER_FACTORY = (reflect: Reflection) => {
  return new Mapper<ProductModel>(ProductModel, reflect);
};

export const CONFIG_SERVICE_VALUE = new ConfigService(APP_CONFIG, SpreadsheetBaseUrl);




