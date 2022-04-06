import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class NominalizationsService {

  private nominalizationsAlertColorSource = new BehaviorSubject<string>("");
  currentNominalizationsAlertColor = this.nominalizationsAlertColorSource.asObservable();

  private nominalizationsFeedbackSource = new BehaviorSubject<string>("");
  currentNominalizationsFeedback = this.nominalizationsFeedbackSource.asObservable();

  private nominalizationsScoreSource = new BehaviorSubject<number>(0);
  currentNominalizationsScore = this.nominalizationsScoreSource.asObservable();

  private nominalizationsNumberSource = new BehaviorSubject<number>(0);
  currentNominalizationsNumber = this.nominalizationsNumberSource.asObservable();

  private nominalizationsUserTableSource = new BehaviorSubject<any>({});
  currentNominalizationsUserTable = this.nominalizationsUserTableSource.asObservable();

  private nominalizationsTableSource = new BehaviorSubject<any>({
    'ization': 7,
    'izations': 8,
    'ing': 3,
    'ings': 4,
    'ism': 3,
    'isms': 4,
    'ation': 5,
    'ations': 6,
    'ition': 5,
    'itions': 6,
    'ment': 4,
    'ments': 5,
    'ability': 7,
    'abilities': 9,
    'ness': 4,
    'nesses': 6,
    'ity': 3,
    'ities': 5,
    'ence': 4,
    'ences': 5,
  });
  currentNominalizationsTable = this.nominalizationsTableSource.asObservable();

  constructor() { }

  changeNominalizationsAlertColor(nominalizationsAlertColor: string) {
    this.nominalizationsAlertColorSource.next(nominalizationsAlertColor);
  }

  changeNominalizationsFeedback(nominalizationsFeedback: string) {
    this.nominalizationsFeedbackSource.next(nominalizationsFeedback);
  }

  changeNominalizationsScore(nominalizationsScore: number) {
    this.nominalizationsScoreSource.next(nominalizationsScore);
  }

  changeNominalizationsNumber(nominalizationsNumber: number) {
    this.nominalizationsNumberSource.next(nominalizationsNumber);
  }

  changeNominalizationsUserTable(nominalizationsUserTable: any) {
    this.nominalizationsUserTableSource.next(nominalizationsUserTable);
  }

  changeNominalizationsTable(nominalizationsTable: any) {
    this.nominalizationsTableSource.next(nominalizationsTable);
  }
}
