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
  currentPassiveVoiceNumber: any;

  /*
  // Passive Voice Errors Number
  private passiveVoiceSource = new BehaviorSubject<number>(0);
  currentPassiveVoice = this.passiveVoiceSource.asObservable();

  // Passive Voice Errors
  private passiveVoiceTableSource = new BehaviorSubject<any>({
    'arisen':'feedback123',
    'babysat':'feedback22323',
    'been':'feedback32323',
    'beaten':'feedback42323',
    'become':'feedback52323',

  });
  currentPassiveVoiceTable = this.passiveVoiceTableSource.asObservable();

  // Passive Voice Current User Errors
  private passiveVoiceUserTableSource = new BehaviorSubject<any>({ });
  currentPassiveVoiceUserTable = this.passiveVoiceUserTableSource.asObservable();
  */

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

  /*
  changePassiveVoice(passiveVoice: number) {
    this.passiveVoiceSource.next(passiveVoice);
  }

  changePassiveVoiceTable(passiveVoiceTable: any) {
    this.passiveVoiceTableSource.next(passiveVoiceTable);
  }

  changePassiveVoiceUserTable(passiveVoiceUserTable: any) {
    this.passiveVoiceUserTableSource.next(passiveVoiceUserTable);
  }
  */
}
