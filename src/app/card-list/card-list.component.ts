import {Component} from '@angular/core';
import { ICard } from "../models/cardModel";
import {FormattedCountriesService} from "../../services/formatted-countries-service.service";
import {CountriesService} from "../../services/countries-service.service";


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  cards: Array<ICard> = [];
  amountOfAllCards = 0;
  page = 0;
  maxPages = 0;
  amountOfCards = 5;
  startCardNumber = 0;
  endCardNumber = this.amountOfCards;
  pageSelected: boolean = false;

  constructor(public formattedCountriesService: FormattedCountriesService, private countriesService: CountriesService) {
    this.formattedCountriesService.ViewedCountries.subscribe(value => {
      this.page = 0;
      this.startCardNumber = 0;
      this.endCardNumber = this.amountOfCards;
      this.updateCards(value);
    });
    this.countriesService.pageSelected.subscribe(value => this.pageSelected = value)
  }

  updateCards(newCards: ICard[]): void {
    this.cards = newCards;
    this.amountOfAllCards = this.cards.length;
    this.maxPages = Math.ceil(this.amountOfAllCards / this.amountOfCards);
    this.cards = this.cards.slice(this.startCardNumber, this.endCardNumber)
  }

  incrementPages(){
    this.page = Math.min(this.maxPages-1, this.page+1);
    this.startCardNumber = this.page * this.amountOfCards;
    this.endCardNumber = Math.min((this.page + 1) * this.amountOfCards, this.amountOfAllCards);
    this.updateCards(this.formattedCountriesService.ViewedCountries.value);
  }
  decrementPages(){
    this.page = Math.max(0, this.page-1);
    this.startCardNumber = this.page * this.amountOfCards;
    this.endCardNumber = Math.min((this.page + 1) * this.amountOfCards, this.amountOfAllCards);
    this.updateCards(this.formattedCountriesService.ViewedCountries.value)
  }
}
