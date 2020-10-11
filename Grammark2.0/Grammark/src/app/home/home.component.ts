import { stringify } from '@angular/compiler/src/util';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { PassiveVoiceFixComponent } from './fixes/passive-voice-fix/passive-voice-fix.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message: string;
  grade: number;
  passiveVoice: number;
  passiveVoiceTable: any;
  passiveVoiceUserTable: any;

  title = 'OverView';

  table = { find:[], suggestion:[] };

  constructor(private router : Router, private data: DataService) { }

  submitClick() : void {
    // Reset every time you hit re-highlight
    this.data.changePassiveVoice(0);
    // Clear -- Reset
    this.table = { find:[], suggestion:[] };
    this.passiveVoiceUserTable = { find:[], suggestion:[] };

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

          this.data.changePassiveVoice(this.passiveVoice + 1);

          this.table.find.push(fix);
          this.table.suggestion.push(this.passiveVoiceTable[fix]);

          this.passiveVoiceUserTable.find.push(fix);
          this.passiveVoiceUserTable.suggestion.push(this.passiveVoiceTable[fix]);

          this.data.changePassiveVoiceUserTable(this.passiveVoiceUserTable);
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
    this.data.currentPassiveVoice.subscribe(passiveVoice => this.passiveVoice = passiveVoice);

    this.data.currentPassiveVoiceTable.subscribe(passiveVoiceTable => this.passiveVoiceTable = passiveVoiceTable);

    this.data.currentPassiveVoiceUserTable.subscribe(passiveVoiceUserTable => this.passiveVoiceUserTable = this.passiveVoiceUserTable);
  }
}
