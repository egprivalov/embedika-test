import { ICard } from "../app/models/cardModel";
import {CountriesService} from "./countries-service.service";
import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class FormattedCountriesService {
  public AllCountries = new BehaviorSubject<Array<ICard>>([]);
  public ViewedCountries: BehaviorSubject<Array<ICard>>;
  public languageChanges = new BehaviorSubject<string>("");
  public continentChanges = new BehaviorSubject<string>("");
  public currentLanguages: string[] = [];
  public currentName = ""
  public currentContinentName = ""

  constructor(private countriesService: CountriesService) {
    this.AllCountries = this.getFormattedCountries();
    this.ViewedCountries = new BehaviorSubject<Array<ICard>>(this.AllCountries.value);
    this.AllCountries.subscribe(value => this.ViewedCountries.next(value))
  }

  getFormattedCountries() : BehaviorSubject<Array<ICard>> {
    const FormattedCountries= new BehaviorSubject<Array<ICard>>([]);
    this.countriesService.getAllCountries().subscribe(value => {
      let newCardArray: ICard[] = []
      value.forEach((item) => {
        let newCard: ICard = {name: item.name, languages: [], code: item.code, continentName: item.continent.name}
        item.languages.forEach(value => {
          newCard.languages.push(value.name)
        })
        newCardArray.push(newCard)
      })
      FormattedCountries.next(newCardArray)
    });
    return FormattedCountries;
  }

  filter(name: string, languages: string[], continent: string){
    this.undoFilters()
    let newViewed: ICard[] = [];
    for (let country of this.ViewedCountries.value) {
      if (country.continentName.indexOf(continent) !== -1) {
        newViewed.push(country);
      }
    }
    this.currentContinentName = continent;

    let newViewedContinent: ICard[] = [];
    for (let country of newViewed) {
      if (country.name.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
        newViewedContinent.push(country);
      }
    }
    this.currentName = name;

    const newViewedContinentName: ICard[] = []
    for (let country of newViewedContinent) {
      let filtered = true;
      for (let language of languages){
        if (!country.languages.includes(language)){
          filtered = false;
        }
      }
      if (filtered){
        newViewedContinentName.push(country);
      }
    }
    this.currentLanguages = languages;

    this.ViewedCountries.next(newViewedContinentName)
  }

  undoFilters(){
    this.ViewedCountries.next(this.AllCountries.value)
  }
}

