import { stringify } from '@angular/compiler/src/util';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../../../data.service';
import { PassivevoiceService } from '../../../services/passivevoice.service';

@Component({
  selector: 'app-passive-voice-fix',
  templateUrl: './passive-voice-fix.component.html',
  styleUrls: ['./passive-voice-fix.component.css']
})
export class PassiveVoiceFixComponent implements OnInit {

  message: string;
  passiveVoiceNumber: number;
  passiveVoiceTable: any;
  passiveVoiceHelperTable: any;
  passiveVoiceUserTable: any;

  title = 'Passive-Voice-Fix';

  /*
  corrections = {
    'arisen':'feedback1',
    'babysat':'feedback2',
    'been':'feedback3',
    'beaten':'feedback4',
    'become':'feedback5',
  };
  */

  // table = { find:[], suggestion:[] };
  // textArray = { nostyle:[], style:[] };

  constructor(private data: DataService, private passivevoice: PassivevoiceService) { }



  reHighlight(): void {

    // Reset every time you hit re-highlight
    // this.data.changePassiveVoice(0);
    this.passivevoice.changePassiveVoiceNumber(0);

    // Clear -- Reset
    // this.table = { find:[], suggestion:[] };
    this.passiveVoiceUserTable = { find: [], suggestion: [] };
    /*
    this.textArray = { nostyle:[], style:[] };
    var tempText = "";
    var tempNoStyle = "";
    var tempStyle = "";
    var wordFound = false;
    var moreThanOneWordFound = false;
    var W1_initialIndex = 0;
    var W1_finalIndex = 0;
    var W2_initialIndex = 0;
    var W2_finalIndex = 0;
    */

    // variables
    // tslint:disable-next-line: prefer-const
    let userText = (document.getElementById('userinput') as HTMLTextAreaElement).value;
    let aLetter = false;

    // This function checks if there is at least one letter inputed
    const validateChar = function () {
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

      // tslint:disable-next-line: forin
      for (const fix in this.passiveVoiceTable) {

        // tslint:disable-next-line: forin
        for (const helper in this.passiveVoiceHelperTable) {
          // String
          const compareString = helper + fix;

          if (userText.includes(compareString)) {

            // this.data.changePassiveVoice(this.passiveVoiceNumber + 1);
            this.passivevoice.changePassiveVoiceNumber(this.passiveVoiceNumber + 1);

            // If more than one more is found to be fixed
            // Then store the previous indexes into new variables
            /*
            if (this.passiveVoice >= 2) {
              moreThanOneWordFound = true;

              W2_initialIndex = W1_initialIndex;
              W2_finalIndex = W2_finalIndex;
            }

            W1_initialIndex = userText.indexOf(fix);
            W1_finalIndex = userText.indexOf(fix) + fix.length-1;

            // Found a word to fix
            wordFound = true;
            */

            // this.table.find.push(fix);
            // this.table.suggestion.push(this.passiveVoiceTable[fix]);
            this.passiveVoiceUserTable.find.push(compareString);
            this.passiveVoiceUserTable.suggestion.push(this.passiveVoiceTable[fix]);
          }

          // Separate text into parts
          /*
          if (wordFound === true && moreThanOneWordFound === false) {
            this.textArray.nostyle.push(userText.substr(0, W1_initialIndex));
            this.textArray.style.push(userText.substr(W1_initialIndex, W1_finalIndex - W1_initialIndex + 1));
          }
          else if (wordFound === true && moreThanOneWordFound === true) {
            this.textArray.nostyle.push(userText.substr(W2_finalIndex - W1_initialIndex + 1, W1_initialIndex));
            this.textArray.style.push(userText.substr(W1_initialIndex, W1_finalIndex - W1_initialIndex + 1));
          }
          else {
            this.textArray.nostyle.push(userText.substr(W1_finalIndex + 1));
            this.textArray.style.push('');
          }
          */
        }
      }
    }
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);

    // this.data.currentPassiveVoice.subscribe(passiveVoiceNumber => this.passiveVoiceNumber = passiveVoiceNumber);

    // this.data.currentPassiveVoiceTable.subscribe(passiveVoiceTable => this.passiveVoiceTable = passiveVoiceTable);

    // this.data.currentPassiveVoiceUserTable.subscribe(passiveVoiceUserTable => this.passiveVoiceUserTable = passiveVoiceUserTable);

    // Passive Voice Number of Errors
    this.passivevoice.currentPassiveVoiceNumber.subscribe(passiveVoiceNumber => this.passiveVoiceNumber = passiveVoiceNumber);

    // Passive Voice Table of Errors
    this.passivevoice.currentPassiveVoiceTable.subscribe(passiveVoiceTable => this.passiveVoiceTable = passiveVoiceTable);

    // Passive Voice Table of Helpers
    // tslint:disable-next-line: max-line-length
    this.passivevoice.currentPassiveVoiceHelperTable.subscribe(passiveVoiceHelperTable => this.passiveVoiceHelperTable = passiveVoiceHelperTable);

    // Passive Voice Table of Current User Errors in Text (Feedback)
    this.passivevoice.currentPassiveVoiceUserTable.subscribe(passiveVoiceUserTable => this.passiveVoiceUserTable = passiveVoiceUserTable);
  }
}
