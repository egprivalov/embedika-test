import {Component, OnInit, Input} from '@angular/core';
import {ICard} from "../models/cardModel";
import {CountriesService} from "../../services/countries-service.service";
import {FormattedCountriesService} from "../../services/formatted-countries-service.service";

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.css']
})
export class CountryCardComponent implements OnInit {
  @Input() card!: ICard;
  name: string = '';
  continentName: string = '';
  languages: string[] = [];

  constructor(private countriesService: CountriesService,
              private formattedCountriesService: FormattedCountriesService) {}

  ngOnInit(): void {
    this.name = this.card.name;
    this.languages = this.card.languages;
    this.continentName = this.card.continentName;
  }

  showFullInformationCard(){
    this.countriesService.pageSelected.next(true);
    this.countriesService.selectionCode.next(this.card.code);
    this.countriesService.selectedCountry.next(this.countriesService.getFormattedCountry(this.card.code).value)
  }

  filterContinent(continentName: string){
    this.formattedCountriesService.continentChanges.next(continentName);
  }

  filterLanguage(language: string){
    this.formattedCountriesService.languageChanges.next(language)
  }
}
