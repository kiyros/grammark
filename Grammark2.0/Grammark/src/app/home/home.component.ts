import { stringify } from '@angular/compiler/src/util';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { PassivevoiceService } from '../services/passivevoice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message: string;
  grade: number;
  passiveVoiceNumber: number;
  passiveVoiceTable: any;
  passiveVoiceUserTable: any;
  passiveVoiceUserTable2: any;

  title = 'OverView';

  table = { find:[], suggestion:[] };

  constructor(private router : Router, private data: DataService, private passivevoice: PassivevoiceService) { }

  submitClick() : void {
    // Reset every time you hit re-highlight
    // this.data.changePassiveVoice(0);
    this.passivevoice.changePassiveVoiceNumber(0);
    // Clear -- Reset
    this.table = { find:[], suggestion:[] };
    this.passiveVoiceUserTable = { find:[], suggestion:[] };
    this.passiveVoiceUserTable2 = { find: [], suggestion: [] };

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

      for (const fix in this.passiveVoiceTable) {
        if (userText.includes(fix)) {

          this.passivevoice.changePassiveVoiceNumber(this.passiveVoiceNumber + 1);

          this.table.find.push(fix);
          this.table.suggestion.push(this.passiveVoiceTable[fix]);

          this.passiveVoiceUserTable.find.push(fix);
          this.passiveVoiceUserTable.suggestion.push(this.passiveVoiceTable[fix]);

          this.passivevoice.changePassiveVoiceUserTable(this.passiveVoiceUserTable);
        }
      }
    }
  }

  ngOnInit(): void {
    // Input Text
    this.data.currentMessage.subscribe(message => this.message = message);
    // Grade
    this.data.currentGrade.subscribe(grade => this.grade = grade);
    // Passive Voice
    // this.data.currentPassiveVoice.subscribe(passiveVoice => this.passiveVoice = passiveVoice);

    // this.data.currentPassiveVoiceTable.subscribe(passiveVoiceTable => this.passiveVoiceTable = passiveVoiceTable);

    // this.data.currentPassiveVoiceUserTable.subscribe(passiveVoiceUserTable => this.passiveVoiceUserTable = this.passiveVoiceUserTable);

    this.passivevoice.currentPassiveVoiceNumber.subscribe(passiveVoiceNumber => this.passiveVoiceNumber = passiveVoiceNumber);

    this.passivevoice.currentPassiveVoiceTable.subscribe(passiveVoiceTable => this.passiveVoiceTable = passiveVoiceTable);

    this.passivevoice.currentPassiveVoiceUserTable.subscribe(passiveVoiceUserTable => this.passiveVoiceUserTable = passiveVoiceUserTable);

    // tslint:disable-next-line: max-line-length
    this.passivevoice.currentPassiveVoiceUserTable2.subscribe(passiveVoiceUserTable2 => this.passiveVoiceUserTable2 = passiveVoiceUserTable2);
  }
}
