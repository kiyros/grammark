import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  // Input text
  private messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();

  // Grade
  private gradeSource = new BehaviorSubject<number>(100);
  currentGrade = this.gradeSource.asObservable();

  private totalSentencesSource = new BehaviorSubject<number>(0);
  currentTotalSentences = this.totalSentencesSource.asObservable();

  private totalErrorsSource = new BehaviorSubject<string>('');
  currentTotalErrors = this.totalErrorsSource.asObservable();

  private gradeAlertColorSource = new BehaviorSubject<string>('');
  currentGradeAlertColor = this.gradeAlertColorSource.asObservable();

  private gradeFeedbackSource = new BehaviorSubject<string>('');
  currentGradeFeedback = this.gradeFeedbackSource.asObservable();

  // Constructor
  constructor() { }

  // Changing variables

  // tslint:disable-next-line: typedef
  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  // tslint:disable-next-line: typedef
  changeGrade(grade: number) {
    this.gradeSource.next(grade);
  }

  // tslint:disable-next-line: typedef
  changeTotalSentences(totalSentences: number) {
    this.totalSentencesSource.next(totalSentences);
  }

  changeTotalErrors(totalErrors: string) {
    this.totalErrorsSource.next(totalErrors);
  }

  // tslint:disable-next-line: typedef
  changeGradeAlertColor(gradeAlertColor: string) {
    this.gradeAlertColorSource.next(gradeAlertColor);
  }

  // tslint:disable-next-line: typedef
  changeGradeFeedback(gradeFeedback: string) {
    this.gradeFeedbackSource.next(gradeFeedback);
  }
}
