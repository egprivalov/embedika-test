import {Component} from '@angular/core';
import {ILanguage} from "../models/languageModel";
import {LanguageService} from "../../services/language-service.service";
import {FormControl} from "@angular/forms";
import {FormattedCountriesService} from "../../services/formatted-countries-service.service";
import {IContinent} from "../models/continentModel";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent{
  allLanguages: ILanguage[] = []
  nameFilter = new FormControl('')
  amountOfCheckedLanguages = 0;
  selectedLanguagesNames: string[] = [];
  currentContinentName: string = '';
  currentName: string = '';

  continents: IContinent[] = [
    {name: "Africa", checked: false, control: new FormControl()},
    {name: "Antarctica", checked: false, control: new FormControl()},
    {name: "Asia", checked: false, control: new FormControl()},
    {name: "Europe", checked: false, control: new FormControl()},
    {name: "North America", checked: false, control: new FormControl()},
    {name: "Oceania", checked: false, control: new FormControl()},
    {name: "South America", checked: false, control: new FormControl()}
  ]

  constructor(private languageService: LanguageService, private formattedCountriesService: FormattedCountriesService) {
    languageService.languages.subscribe(value => this.allLanguages = value)
    this.nameFilter.valueChanges.subscribe(value => {
      if (value !== null) {
        formattedCountriesService.filter(value,
          this.selectedLanguagesNames,
          this.currentContinentName)
        this.currentName = value
      }
    })
    this.formattedCountriesService.languageChanges.subscribe(newLanguage =>{
        let index = 0
        for (let language of this.allLanguages){
          if (language.name === newLanguage){
            this.setLanguageChecked(index);
          }
          index++;
        }
    });
    this.formattedCountriesService.continentChanges.subscribe(newContinent =>{
      let index = 0
      for (let continent of this.continents){
        if (continent.name === newContinent){
          this.setContinentChecked(index);
        }
        index++;
      }
      });
  }

  public setLanguageChecked(index:number){
    if (this.allLanguages[index].checked) {
      let indexOfLanguage = this.selectedLanguagesNames.indexOf(this.allLanguages[index].name)
      this.selectedLanguagesNames.splice(indexOfLanguage, indexOfLanguage+1);
      this.allLanguages[index].checked = false;
      this.amountOfCheckedLanguages--;
    }
    else{
      this.selectedLanguagesNames.push(this.allLanguages[index].name);
      this.allLanguages[index].checked = true;
      this.amountOfCheckedLanguages++;
    }
    this.formattedCountriesService.filter(this.currentName,
      this.selectedLanguagesNames,
      this.currentContinentName)
  }

  public setContinentChecked(index:number){
    for (let i = 0; i<this.continents.length; i++){
      if (i === index){
        if (this.continents[i].checked){
          this.continents[i].checked = false;
          this.currentContinentName = '';
          this.formattedCountriesService.filter(this.currentName,
            this.selectedLanguagesNames, '')
          this.continents[i].control.setValue('');
        }
        else{
          this.continents[i].checked = true;
          this.formattedCountriesService.filter(this.currentName,
            this.selectedLanguagesNames, this.continents[i].name);
          this.currentContinentName = this.continents[i].name;
        }
      }
      else {
        this.continents[i].checked = false;
        this.continents[i].control.setValue('');
      }
    }
  }
}
