import { Apollo, gql } from 'apollo-angular';
import {Observable, map, BehaviorSubject} from 'rxjs';
import { Injectable } from '@angular/core';
import {Country, Language} from 'countries-list';
import {FullInformationCard} from "../app/models/cardModel";


@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  pageSelected = new BehaviorSubject<boolean>(false);
  selectionCode = new BehaviorSubject<string>('')
  selectedCountry = new BehaviorSubject<FullInformationCard>({
    name: "",
    languages: [],
    continentName: "",
    code: "",
    capitalName: "",
    phone: "",
    currency: ""});

  constructor(private apollo: Apollo) {
    this.selectionCode.subscribe(code => {
      this.getFormattedCountry(code).subscribe(value => {
        this.selectedCountry.next(value)
      })
    })
  }

  getAllCountries(): Observable<Country[]> {
    return this.apollo
      .watchQuery<any>({
        query: gql`{
                      countries {
                        name
                        languages{
                          name
                        }
                        continent{
                          name
                        }
                        code
                      }
                    }`
      })
      .valueChanges.pipe(map((result) => result.data.countries));
  }

  getCountryInformation(code: string): Observable<Country> {
    return this.apollo
      .watchQuery<any>({
        query: gql`{
                      country(code: "${code}"){
                        name
                        languages{
                          name
                        }
                        continent{
                          name
                        }
                        capital
                        phone
                        currency
                      }
                    }`
      })
      .valueChanges.pipe(map((result) => result.data.country));
  }

  getFormattedCountry(code:string): BehaviorSubject<FullInformationCard> {
    const FormattedCountries= new BehaviorSubject<FullInformationCard>({
      name: "",
      languages: [],
      continentName: "",
      code: "",
      capitalName: "",
      phone: "",
      currency: ""});
    this.getCountryInformation(code).subscribe(value => {
      if (value !== null) {
        let newInformationCard: FullInformationCard = {
          name: value.name,
          languages: [],
          continentName: value.continent.name,
          code: value.code,
          capitalName: value.capital,
          phone: value.phone,
          currency: value.currency
        };
        value.languages.forEach(language => {
          newInformationCard.languages.push(language.name)
        })
        FormattedCountries.next(newInformationCard)
      }
    })
    return FormattedCountries;
  }

  getLanguages() : Observable<Language[]>{
    return this.apollo
      .watchQuery<any>({
        query: gql`{
                      languages {
                        name
                      }
                    }`
      })
      .valueChanges.pipe(map((result) => result.data.languages));
  }
}
