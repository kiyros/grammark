import { stringify } from '@angular/compiler/src/util';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { PassivevoiceService } from '../services/passivevoice.service';
import { WordinessService } from '../services/wordiness.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message: string;
  grade: number;
  // Passive Voice
  passiveVoiceNumber: number;
  passiveVoiceTable: any;
  passiveVoiceHelperTable: any;
  passiveVoiceUserTable: any;
  // Wordiness
  wordinessNumber: number;
  wordinessTable: any;
  wordinessUserTable: any;

  title = 'OverView';

  constructor(private router : Router, private data: DataService, private passivevoice: PassivevoiceService,
              private wordiness: WordinessService) { }

  submitClick() : void {
    // Reset every time you hit re-highlight
    // this.data.changePassiveVoice(0);
    this.passivevoice.changePassiveVoiceNumber(0);
    this.wordiness.changeWordinessNumber(0);
    // Clear -- Reset
    this.passiveVoiceUserTable = { find:[], suggestion:[] };
    this.wordinessUserTable = { find:[], suggestion:[] };

    // variables
    var userText = ( document.getElementById('userinput') as HTMLTextAreaElement).value;
    let aLetter = false;

    // This function checks if there is at least one letter inputed
    var validateChar = function() {
      if (/[a-zA-Z]/.test(userText)) {
        aLetter = true;
      }
    }

    // calling function - checker
    validateChar();

    // alters! or proceed to overview
    if (userText === '') {
      alert('Please fill out the text area');
    }
    else if (aLetter === false) {
      alert('Please enter at least one letter');
    }
    else {
      this.data.changeMessage(userText);
      this.router.navigate(['home/overview']);

      // tslint:disable-next-line: forin
      for (const fix in this.passiveVoiceTable) {

        // tslint:disable-next-line: forin
        for (const helper in this.passiveVoiceHelperTable) {
          // String
          const compareString = helper + fix;

          if (userText.includes(compareString)) {

            // this.data.changePassiveVoice(this.passiveVoiceNumber + 1);
            this.passivevoice.changePassiveVoiceNumber(this.passiveVoiceNumber + 1);
            this.passiveVoiceUserTable.find.push(compareString);
            this.passiveVoiceUserTable.suggestion.push(this.passiveVoiceTable[fix]);
            this.passivevoice.changePassiveVoiceUserTable(this.passiveVoiceUserTable);
          }
        }
      }

      for (const fix in this.wordinessTable) {

        if (userText.includes(fix)) {

          this.wordiness.changeWordinessNumber(this.wordinessNumber + 1);
          this.wordinessUserTable.find.push(fix);
          this.wordiness.changeWordinessUserTable(this.wordinessUserTable);
        }
      }
    }
  }

  ngOnInit(): void {
    // Input Text
    this.data.currentMessage.subscribe(message => this.message = message);
    // Grade
    this.data.currentGrade.subscribe(grade => this.grade = grade);

    // ************************
    // *                      *
    // *     Passive Voice    *
    // *                      *
    // ************************
    this.passivevoice.currentPassiveVoiceNumber.subscribe(passiveVoiceNumber => this.passiveVoiceNumber = passiveVoiceNumber);
    this.passivevoice.currentPassiveVoiceTable.subscribe(passiveVoiceTable => this.passiveVoiceTable = passiveVoiceTable);
    // tslint:disable-next-line: max-line-length
    this.passivevoice.currentPassiveVoiceHelperTable.subscribe(passiveVoiceHelperTable => this.passiveVoiceHelperTable = passiveVoiceHelperTable);
    this.passivevoice.currentPassiveVoiceUserTable.subscribe(passiveVoiceUserTable => this.passiveVoiceUserTable = passiveVoiceUserTable);

    // *********************
    // *                   *
    // *     Wordiness     *
    // *                   *
    // *********************
    this.wordiness.currentWordinessNumber.subscribe(wordinessNumber => this.wordinessNumber = wordinessNumber);
    this.wordiness.currentWordinessTable.subscribe(wordinessTable => this.wordinessTable = wordinessTable);
    this.wordiness.currentWordinessUserTable.subscribe(wordinessUserTable => this.wordinessUserTable = wordinessUserTable);
  }
}
