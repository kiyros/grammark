import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

// firebase
import { FirebaseService } from 'src/firefireStore.service';

@Injectable({
  providedIn: 'root'
})
export class WordinessService {

  private wordinessAlertColorSource = new BehaviorSubject<string>(" ");
  currentWordinessAlertColor = this.wordinessAlertColorSource.asObservable();

  private wordinessFeedbackSource = new BehaviorSubject<string>(" ");
  currentWordinessFeedback = this.wordinessFeedbackSource.asObservable();

  private wordinessScoreSource = new BehaviorSubject<number>(0);
  currentWordinessScore = this.wordinessScoreSource.asObservable();

  // Wordiness Number of Errors
  private wordinessNumberSource = new BehaviorSubject<number>(0);
  currentWordinessNumber = this.wordinessNumberSource.asObservable();

  // Passive Voice Error List
  private wordinessTableSource = new BehaviorSubject<any>(this.testFireBase.getWordiness());
  currentWordinessTable = this.wordinessTableSource.asObservable();

  // Wordiness Current User Errors
  private wordinessUserTableSource = new BehaviorSubject<any>({});
  currentWordinessUserTable = this.wordinessUserTableSource.asObservable();

  constructor(
    private testFireBase : FirebaseService
  ) { }

  changeWordinessAlertColor(wordinessAlertColor: string) {
    this.wordinessAlertColorSource.next(wordinessAlertColor);
  }

  changeWordinessFeedback(wordinessFeedback: string) {
    this.wordinessFeedbackSource.next(wordinessFeedback);
  }

  changeWordinessScore(wordinessScore: number) {
    this.wordinessScoreSource.next(wordinessScore);
  }

  changeWordinessNumber(wordinessNumber: number) {
    this.wordinessNumberSource.next(wordinessNumber);
  }

  changeWordinessTable(wordinessTable: any) {
    this.wordinessTableSource.next(wordinessTable);
  }

  changeWordinessUserTable(wordinessUserTable: any) {
    this.wordinessUserTableSource.next(wordinessUserTable);
  }
}
