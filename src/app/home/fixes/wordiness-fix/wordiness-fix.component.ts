import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { AcademicStyleService } from '../../../services/academicstyle.service';
import { EggcornService } from '../../../services/eggcorns.service';
import { GrammarService } from '../../../services/grammar.service';
import { NominalizationsService } from '../../../services/nominalizations.service';
import { PassivevoiceService } from '../../../services/passivevoice.service';
import { WordinessService } from '../../../services/wordiness.service';
import { SentencesService } from '../../../services/sentences.service';
import { TransitionsService } from '../../../services/transitions.service';

@Component({
  selector: 'app-wordiness-fix',
  templateUrl: './wordiness-fix.component.html',
  styleUrls: ['./wordiness-fix.component.css'],
})
export class WordinessFixComponent implements OnInit {
  title = 'Wordiness-Fix';

  // Global global
  message: string;
  grade: number;
  gradeAlertColor: string;
  gradeFeedback: string;
  totalSentences: number;

  // Wordiness
  wordinessNumber: number;
  wordinessTable: any;
  wordinessUserTable: any;
  wordinessAlertColor: string;
  wordinessFeedback: string = ' ';
  wordinessScore: number;

  constructor(
    private data: DataService,
    private wordiness: WordinessService,
    private passivevoice: PassivevoiceService,
    private academic: AcademicStyleService,
    private eggcorns: EggcornService,
    private grammar: GrammarService,
    private nominalizations: NominalizationsService,
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
    this.wordinessUserTable = { find: [], suggestion: [] };

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
      this.wordinessFix(userText);
    }
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe((message) => (this.message = message));
    this.data.currentTotalSentences.subscribe(
      (totalSentences) => (this.totalSentences = totalSentences)
    );

    // Services
    this.wordinessService();
  }
  wordinessFix(userText: string) {
    console.log(this.wordinessTable.__zone_symbol__value);
    // tslint:disable-next-line: forin
    for (const fix in this.wordinessTable.__zone_symbol__value) {
      if (userText.includes(fix)) {
        this.wordiness.changeWordinessNumber(this.wordinessNumber + 1);
        this.wordinessUserTable.find.push(
          '• ' + fix + ' ⟶ ' + this.wordinessTable.__zone_symbol__value[fix]
        );
        // this.wordinessUserTable.suggestion.push("→ " + this.wordinessTable[fix]);
        this.wordiness.changeWordinessUserTable(this.wordinessUserTable);
        this.highlight(fix);
      }
    }
    this.wordinessScore = (this.wordinessNumber / this.totalSentences) * 100;
    if (isNaN(this.wordinessScore) || this.wordinessScore === Infinity) {
      this.wordinessScore = 0;
    }
    try {
      if (this.wordinessScore > 2) {
        this.wordinessFeedback =
          'Your writing seems too wordy. Why use 3 words when you can say it with 1?';
        this.wordinessAlertColor = 'red';
      } else {
        this.wordinessFeedback =
          'Woohoo! Your writing seems concise, precise, and snappy. George Orwell would be proud.';
        this.wordinessAlertColor = 'green';
      }
      if (this.totalSentences === 0) {
        throw new Error('');
      }
    } catch (e) {
      this.wordinessFeedback = 'Make sure you enter at least one sentence.';
      this.wordinessAlertColor = 'orange';
      this.wordinessScore = 0;
    }
    this.wordiness.changeWordinessFeedback(this.wordinessFeedback);
    this.wordiness.changeWordinessScore(
      Math.round(this.wordinessScore * 10) / 10
    );
    this.wordiness.changeWordinessAlertColor(this.wordinessAlertColor);
  }

  wordinessService() {
    this.wordiness.currentWordinessNumber.subscribe(
      (wordinessNumber) => (this.wordinessNumber = wordinessNumber)
    );
    this.wordiness.currentWordinessTable.subscribe(
      (wordinessTable) => (this.wordinessTable = wordinessTable)
    );
    this.wordiness.currentWordinessUserTable.subscribe(
      (wordinessUserTable) => (this.wordinessUserTable = wordinessUserTable)
    );
    this.wordiness.currentWordinessAlertColor.subscribe(
      (wordinessAlertColor) => (this.wordinessAlertColor = wordinessAlertColor)
    );
    this.wordiness.currentWordinessFeedback.subscribe(
      (wordinessFeedback) => (this.wordinessFeedback = wordinessFeedback)
    );
    this.wordiness.currentWordinessScore.subscribe(
      (wordinessScore) => (this.wordinessScore = wordinessScore)
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
