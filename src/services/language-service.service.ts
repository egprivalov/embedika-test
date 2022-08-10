import { Injectable } from '@angular/core';
import {CountriesService} from "./countries-service.service";
import {BehaviorSubject} from "rxjs";
import {ILanguage} from "../app/models/languageModel";
import {Language} from "countries-list";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  languages = new BehaviorSubject<ILanguage[]>([])
  constructor(private countiesService: CountriesService) {
    countiesService.getLanguages().subscribe(value => {
      this.getFormattedLanguages(value)
    })
  }
  getFormattedLanguages(languages: Language[]){
    const newLanguages:ILanguage[] = [];
    for (let language of languages){
      newLanguages.push({name: language.name, checked: false});
    }
    this.languages.next(newLanguages);
  }
}
