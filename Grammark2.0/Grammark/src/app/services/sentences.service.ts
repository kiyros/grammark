import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SentencesService {

  private sentencesAlertColorSource = new BehaviorSubject<string>("");
  currentSentencesAlertColor = this.sentencesAlertColorSource.asObservable();

  private sentencesFeedbackSource = new BehaviorSubject<string>("");
  currentSentencesFeedback = this.sentencesFeedbackSource.asObservable();

  private sentencesScoreSource = new BehaviorSubject<number>(0);
  currentSentencesScore = this.sentencesScoreSource.asObservable();

  private sentencesNumberSource = new BehaviorSubject<number>(0);
  currentSentencesNumber = this.sentencesNumberSource.asObservable();

  private sentencesUserTableSource = new BehaviorSubject<any>({});
  currentSentencesUserTable = this.sentencesUserTableSource.asObservable();

  private sentencesTableSource = new BehaviorSubject<any>({
    And: '',
    But: '',
    Or: '',
  });
  currentSentencesTable = this.sentencesTableSource.asObservable();

  constructor() { }

  changeSentencesAlertColor(sentencesAlertColor: string) {
    this.sentencesAlertColorSource.next(sentencesAlertColor);
  }

  changeSentencesFeedback(sentencesFeedback: string) {
    this.sentencesFeedbackSource.next(sentencesFeedback);
  }

  changeSentencesScore(sentencesScore: number) {
    this.sentencesScoreSource.next(sentencesScore);
  }

  changeSentencesNumber(sentencesNumber: number) {
    this.sentencesNumberSource.next(sentencesNumber);
  }

  changeSentencesUserTable(sentencesUserTable: any) {
    this.sentencesUserTableSource.next(sentencesUserTable);
  }

  changeSentencesTable(sentencesTable: any) {
    this.sentencesTableSource.next(sentencesTable);
  }
}
