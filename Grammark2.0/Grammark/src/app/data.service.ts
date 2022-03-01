import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  // Input text
  private messageSource = new BehaviorSubject<string>('I love words! I have always loved words. After a career working with words, I have decided that how people use language directly relates to how intelligent they are perceived! Note that I am talking about perception, and not necessarily reality. People with multiple college degrees who speak or write improperly convey to the world that they are, in fact, not smart. Likewise, people who may not have a college degree but talk and write correctly convey to the world that they are extremely intelligent. It’s all in the words.');
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
