import {Component, OnInit} from '@angular/core';
import {FullInformationCard} from "../models/cardModel";
import {CountriesService} from "../../services/countries-service.service";

@Component({
  selector: 'app-full-information-country-card',
  templateUrl: './full-information-country-card.component.html',
  styleUrls: ['./full-information-country-card.component.css']
})
export class FullInformationCountryCardComponent implements OnInit {
  country: FullInformationCard = {
    name: "",
    languages: [],
    continentName: "",
    code: "",
    capitalName: "",
    phone: "",
    currency: ""
  }
  pageSelected = false;

  constructor(private countriesService: CountriesService) {
    this.countriesService.selectedCountry.subscribe(() => {
      this.country = this.countriesService.selectedCountry.getValue();
    })
    this.countriesService.pageSelected.subscribe(value => {
      this.pageSelected = value
    })
  }

  ngOnInit(): void { }

  getBack(){
    this.countriesService.pageSelected.next(false);
  }
}
