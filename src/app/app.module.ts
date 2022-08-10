import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardListComponent } from './card-list/card-list.component';
import { CountryCardComponent } from './country-card/country-card.component';
import {GraphQLModule} from "./graph-ql/graph-ql.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { FiltersComponent } from './filters/filters.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FullInformationCountryCardComponent } from './full-information-country-card/full-information-country-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CardListComponent,
    CountryCardComponent,
    FiltersComponent,
    FullInformationCountryCardComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
