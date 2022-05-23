import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

// firebase
import { FirebaseService } from 'src/firefireStore.service';

@Injectable({
  providedIn: 'root'
})
export class TransitionsService {



  //variables for transistions score
  private transitionsAlertColor = new BehaviorSubject<string>(" ");
  currentTransitionsAlertColor = this.transitionsAlertColor.asObservable();

  private transitionsFeedback = new BehaviorSubject<string>(" ");
  currentTransitionsFeedback = this.transitionsFeedback.asObservable();

  private transitionsScore = new BehaviorSubject<number>(0);
  currentTransitionsScore = this.transitionsScore.asObservable();

  //private totalSentences = new BehaviorSubject<number>(0);
  //currentTotalSentences = this.totalSentences.asObservable();

  private totalTransitions = new BehaviorSubject<number>(0);
  currentTotalTransitions = this.totalTransitions.asObservable();

  //this table contains all of the transition words
  private transitionsTable = new BehaviorSubject<any>(
    this.testFireBase.getTransitions()
  );
  currentTransitionsTable = this.transitionsTable.asObservable();

  // this table will contain the user's transition words
  private transitionsUserTable = new BehaviorSubject<any>({});
  currentTransitionsUserTable = this.transitionsUserTable.asObservable();

  changeTransitionsScore(transitionsScore: number) {
    this.transitionsScore.next(transitionsScore);
  }

  //changeTotalSentences(totalSentences: number) {
  //  this.totalSentences.next(totalSentences);
  //}

  changeTotalTransitions(totalTransitions: number) {
    this.totalTransitions.next(totalTransitions);
  }

  changeTable(table: any) {
    this.transitionsTable.next(table);
  }

  changeTransitionsUserTable(transitionsUserTable: any) {
    this.transitionsUserTable.next(transitionsUserTable);
  }

  changeTransitionsFeedback(transitionsFeedback: string) {
    this.transitionsFeedback.next(transitionsFeedback);
  }

  changeTransitionsAlertColor(transitionsAlertColor: string) {
    this.transitionsAlertColor.next(transitionsAlertColor);
  }

  constructor(
    private testFireBase: FirebaseService
  ) { }

  //resetTransitionFix(){
  //  this.transitionsFeedback.next(" ");
  //  this.transitionsScore.next(0);
  //  this.totalSentences.next(0);
  //  this.totalTransitions.next(0);
  //}
}
