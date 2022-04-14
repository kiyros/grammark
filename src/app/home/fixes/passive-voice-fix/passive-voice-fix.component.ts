import { stringify } from '@angular/compiler/src/util';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../../../data.service';
import { WordinessService } from '../../../services/wordiness.service';
import { PassivevoiceService } from '../../../services/passivevoice.service';
import { SentencesService } from '../../../services/sentences.service';
import { TransitionsService } from '../../../services/transitions.service';
import { AcademicStyleService } from '../../../services/academicstyle.service';
import { EggcornService } from '../../../services/eggcorns.service';
import { GrammarService } from '../../../services/grammar.service';
import { NominalizationsService } from '../../../services/nominalizations.service';

@Component({
  selector: 'app-passive-voice-fix',
  templateUrl: './passive-voice-fix.component.html',
  styleUrls: ['./passive-voice-fix.component.css'],
})
export class PassiveVoiceFixComponent implements OnInit {
  // Global global
  message: string;
  grade: number;
  gradeAlertColor: string;
  gradeFeedback: string;
  totalSentences: number;

  // Passive Voice
  passiveVoiceNumber: number;
  passiveVoiceTable: any;
  passiveVoiceHelperTable: any;
  passiveVoiceUserTable: any;
  passiveVoiceFeedback: string;
  passiveVoiceAlertColor: string;
  passiveVoiceScore: number;

  title = 'Passive-Voice-Fix';

  constructor(
    private data: DataService,
    private academic: AcademicStyleService,
    private eggcorns: EggcornService,
    private grammar: GrammarService,
    private nominalizations: NominalizationsService,
    private passivevoice: PassivevoiceService,
    private wordiness: WordinessService,
    private sentences: SentencesService,
    private transitions: TransitionsService
  ) {}

  startOverClick(): void {
    this.data.changeMessage('');
  }

  //returns the element that is displayed in the html
  getContent() {
    return document.getElementById('userinput').innerHTML;
  }

  reHighlight(): void {
    // Reset every time you hit re-highlight
    this.data.changeTotalSentences(0);
    this.data.changeGrade(0);
    this.passivevoice.changePassiveVoiceNumber(0);
    this.wordiness.changeWordinessNumber(0);
    this.transitions.changeTotalTransitions(0);
    this.academic.changeTotalNonAcademic(0);
    this.grammar.changeTotalGrammar(0);
    this.eggcorns.changeTotalEggcorns(0);
    this.nominalizations.changeNominalizationsNumber(0);
    this.sentences.changeSentencesNumber(0);

    // Clear -- Reset
    this.passiveVoiceUserTable = { find: [], suggestion: [] };

    // variables
    // user text = paragraph from the html file
    let userText = this.getContent();
    let aLetter = false;

    // This function checks if there is at least one letter inputed
    const validateChar = function () {
      if (/[a-zA-Z]/.test(userText)) {
        aLetter = true;
      }
    };
    // calling function - checker
    validateChar();

    // alters! or proceed to overview
    if (userText === '') {
      alert('Please fill out the text area');
    } else if (aLetter === false) {
      alert('Please enter at least one letter');
    } else {
      this.data.changeMessage(userText);

      // Find total sentences in text
      for (let i = 0; i < userText.length; i++) {
        if (
          userText.charAt(i) === '.' ||
          userText.charAt(i) === '!' ||
          userText.charAt(i) === '?'
        ) {
          this.data.changeTotalSentences(this.totalSentences + 1);
        }
      }

      // Fixes
      this.passiveVoiceFix(userText);
    }
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe((message) => (this.message = message));
    this.data.currentTotalSentences.subscribe(
      (totalSentences) => (this.totalSentences = totalSentences)
    );

    // Service
    this.passiveVoiceService();
  }

  passiveVoiceFix(userText: string) {
    // tslint:disable-next-line: forin
    for (const fix in this.passiveVoiceTable) {
      // tslint:disable-next-line: forin
      for (const helper in this.passiveVoiceHelperTable) {
        // String
        const compareString = helper + fix;

        if (userText.includes(compareString)) {
          this.passivevoice.changePassiveVoiceNumber(
            this.passiveVoiceNumber + 1
          );
          this.passiveVoiceUserTable.find.push(
            '• ' + compareString + ' ⟶ ' + this.passiveVoiceTable[fix]
          );
          // this.passiveVoiceUserTable.suggestion.push(" ⟶ " + this.passiveVoiceTable[fix]);
          this.passivevoice.changePassiveVoiceUserTable(
            this.passiveVoiceUserTable
          );
          this.highlight(fix);
        }
      }
    }
    this.passiveVoiceScore =
      (this.passiveVoiceNumber / this.totalSentences) * 100;
    if (isNaN(this.passiveVoiceScore) || this.passiveVoiceScore === Infinity) {
      this.passiveVoiceScore = 0;
    }
    try {
      if (this.passiveVoiceScore > 10) {
        this.passiveVoiceFeedback =
          'Generally, writing is clearer in active voice.';
        this.passiveVoiceAlertColor = 'red';
      } else {
        this.passiveVoiceFeedback =
          'Your writing passed the criterion for passive sentences. Congrats!';
        this.passiveVoiceAlertColor = 'green';
      }
      if (this.totalSentences === 0) {
        throw new Error('');
      }
    } catch (e) {
      this.passiveVoiceFeedback = 'Make sure you enter at least one sentence.';
      this.passiveVoiceAlertColor = 'orange';
      this.passiveVoiceScore = 0;
    }
    this.passivevoice.changePassiveVoiceFeedback(this.passiveVoiceFeedback);
    this.passivevoice.changePassiveVoiceScore(
      Math.round(this.passiveVoiceScore * 10) / 10
    );
    this.passivevoice.changePassiveVoiceAlertColor(this.passiveVoiceAlertColor);
  }

  passiveVoiceService() {
    this.passivevoice.currentPassiveVoiceNumber.subscribe(
      (passiveVoiceNumber) => (this.passiveVoiceNumber = passiveVoiceNumber)
    );
    this.passivevoice.currentPassiveVoiceTable.subscribe(
      (passiveVoiceTable) => (this.passiveVoiceTable = passiveVoiceTable)
    );
    this.passivevoice.currentPassiveVoiceHelperTable.subscribe(
      (passiveVoiceHelperTable) =>
        (this.passiveVoiceHelperTable = passiveVoiceHelperTable)
    );
    this.passivevoice.currentPassiveVoiceUserTable.subscribe(
      (passiveVoiceUserTable) =>
        (this.passiveVoiceUserTable = passiveVoiceUserTable)
    );
    this.passivevoice.currentPassiveVoiceAlertColor.subscribe(
      (passiveVoiceAlertColor) =>
        (this.passiveVoiceAlertColor = passiveVoiceAlertColor)
    );
    this.passivevoice.currentPassiveVoiceFeedback.subscribe(
      (passiveVoiceFeedback) =>
        (this.passiveVoiceFeedback = passiveVoiceFeedback)
    );
    this.passivevoice.currentPassiveVoiceScore.subscribe(
      (passiveVoiceScore) => (this.passiveVoiceScore = passiveVoiceScore)
    );
  }

  highlight(text) {
    //hold the message from the html textbox with id= userinput
    var paragraph = document.getElementById('userinput');

    //dynamic/custom regex expression -> only way to use variable inside regex
    let re = new RegExp(`\\b${text}\\b`, 'gi');

    //replace with -> span and highlight
    paragraph.innerHTML = paragraph.innerHTML.replace(
      re,
      '<span style="background-color: #FF6363; font-family: Georgia;" >' +
        text +
        ' </span>'
    );
  }
}
