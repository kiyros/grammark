import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class PassivevoiceService {

  // Passive Voice Number of Errors
  private passiveVoiceNumberSource = new BehaviorSubject<number>(0);
  currentPassiveVoiceNumber = this.passiveVoiceNumberSource.asObservable();

  // Passive Voice Error List
  private passiveVoiceTableSource = new BehaviorSubject<any>({
    ' arisen': '',
    ' babysat': '',
    ' been': '',
    ' beaten': '',
    ' become': '',
    ' bent': '',
    ' begun': '',
    ' bet': '',
    ' bound': '',
    ' bitten': '',
    ' bled': '',
    ' blown': '',
    ' broken': '',
    ' bred': '',
    ' brought': '',
    ' broadcast': '',
    ' built': '',
    ' bought': '',
    ' caught': '',
    ' chosen': '',
    ' come': '',
    ' cost': '',
    ' cut': '',
    ' dealt': '',
    ' dug': '',
    ' done': '',
    ' drawn': '',
    ' drunk': '',
    ' driven': '',
    ' eaten': '',
    ' fallen': '',
    ' fed': '',
    ' felt': '',
    ' fought': '',
    ' found': '',
    ' flown': '',
    ' forbidden': '',
    ' forgotten': '',
    ' forgiven': '',
    ' frozen': '',
    ' gotten': '',
    ' given': '',
    ' gone': '',
    ' grown': '',
    ' hung': '',
    ' had': '',
    ' heard': '',
    ' hidden': '',
    ' hit': '',
    ' held': '',
    ' hurt': '',
    ' kept': '',
    ' known': '',
    ' lain': '',
    ' led': '',
    ' left': '',
    ' lent': '',
    ' let': '',
    ' lit': '',
    ' lost': '',
    ' made': '',
    ' meant': '',
    ' met': '',
    ' paid': '',
    ' put': '',
    ' quit': '',
    ' read': '',
    ' ridden': '',
    ' rung': '',
    ' risen': '',
    ' run': '',
    ' said': '',
    ' seen': '',
    ' sold': '',
    ' sent': '',
    ' set': '',
    ' shaken': '',
    ' shone': '',
    ' shot': '',
    ' shown': '',
    ' shut': '',
    ' sung': '',
    ' sunk': '',
    ' sat': '',
    ' slept': '',
    ' slid': '',
    ' spoken': '',
    ' spent': '',
    ' spun': '',
    ' spread': '',
    ' stood': '',
    ' stolen': '',
    ' stuck': '',
    ' stung': '',
    ' struck': '',
    ' sworn': '',
    ' swept': '',
    ' swum': '',
    ' swung': '',
    ' taken': '',
    ' taught': '',
    ' torn': '',
    ' told': '',
    ' thought': '',
    ' thrown': '',
    ' understood': '',
    ' woken': '',
    ' worn': '',
    ' won': '',
    ' withdrawn': '',
    ' written': '',
    ' burned': '',
    ' burnt': '',
    ' dreamed': '',
    ' dreamt': '',
    ' learned': '',
    ' smelled': '',
    ' awoken': '',
  });
  currentPassiveVoiceTable = this.passiveVoiceTableSource.asObservable();

  // Passive Voice Helper List
  private passiveVoiceHelperTableSource = new BehaviorSubject<any>({
    ' is': '',
    ' was': '',
    ' were': '',
    ' be': '',
    ' being': '',
    ' having': '',
    ' been': '',
  });
  currentPassiveVoiceHelperTable = this.passiveVoiceHelperTableSource.asObservable();

  // Passive Voice Current User Errors
  private passiveVoiceUserTableSource = new BehaviorSubject<any>({});
  currentPassiveVoiceUserTable = this.passiveVoiceUserTableSource.asObservable();

  // Table2
  private passiveVoiceUserTable2Source = new BehaviorSubject<any>({});
  currentPassiveVoiceUser2 = this.passiveVoiceUserTable2Source.asObservable();
  currentPassiveVoiceUserTable2: any;

  constructor() { }

  // tslint:disable-next-line: typedef
  changePassiveVoiceNumber(passiveVoiceNumber: number) {
    this.passiveVoiceNumberSource.next(passiveVoiceNumber);
  }

  // tslint:disable-next-line: typedef
  changePassiveVoiceTable(passiveVoiceTable: any) {
    this.passiveVoiceTableSource.next(passiveVoiceTable);
  }

  // tslint:disable-next-line: typedef
  changePassiveVoiceHelperTable(passiveVoiceHelperTable: any) {
    this.passiveVoiceHelperTableSource.next(passiveVoiceHelperTable);
  }

  // tslint:disable-next-line: typedef
  changePassiveVoiceUserTable(passiveVoiceUserTable: any) {
    this.passiveVoiceUserTableSource.next(passiveVoiceUserTable);
  }

  // tslint:disable-next-line: typedef
  changePassiveVoiceUserTable2(passiveVoiceUserTable2: any) {
    this.passiveVoiceUserTable2Source.next(passiveVoiceUserTable2);
  }
}
