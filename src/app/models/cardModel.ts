export interface ICard {
  name: string;
  languages: string[];
  continentName: string
  code: string;
}

export interface FullInformationCard extends ICard{
  capitalName: string;
  phone: string;
  currency: string;
}
