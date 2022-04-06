import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { NominalizationsService } from '../../../services/nominalizations.service';
import { PassivevoiceService } from '../../../services/passivevoice.service';
import { WordinessService } from '../../../services/wordiness.service';
import { SentencesService } from '../../../services/sentences.service';
import { TransitionsService } from '../../../services/transitions.service';
import { AcademicStyleService } from '../../../services/academicstyle.service';
import { EggcornService } from '../../../services/eggcorns.service';
import { GrammarService } from '../../../services/grammar.service';

@Component({
  selector: 'app-nominalizations-fix',
  templateUrl: './nominalizations-fix.component.html',
  styleUrls: ['./nominalizations-fix.component.css'],
})
export class NominalizationsFixComponent implements OnInit {
  title = 'Nominalizations-Fix';

  // Global global
  message: string;
  grade: number;
  gradeAlertColor: string;
  gradeFeedback: string;
  totalSentences: number;

  // Nominalizations
  nominalizationsNumber: number;
  nominalizationsTable: any;
  nominalizationsUserTable: any;
  nominalizationsAlertColor: string;
  nominalizationsFeedback: string;
  nominalizationsScore: number;

  constructor(
    private data: DataService,
    private nominalizations: NominalizationsService,
    private academic: AcademicStyleService,
    private eggcorns: EggcornService,
    private grammar: GrammarService,
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
    this.nominalizationsUserTable = { find: [], suggestion: [] };

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
      this.nominalizationsFix(userText);
    }
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe((message) => (this.message = message));
    this.data.currentTotalSentences.subscribe(
      (totalSentences) => (this.totalSentences = totalSentences)
    );

    // Service
    this.nominalizationsService();
  }

  // tslint:disable-next-line: typedef
  nominalizationsFix(userText: string) {
    let word;
    word = '';
    let wordCounter = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < userText.length; i++) {
      if (
        /[a-zA-Z]/.test(userText[i]) ||
        userText[i] === '’' ||
        userText[i] === "'"
      ) {
        word += userText[i];
      } else {
        for (const fix in this.nominalizationsTable) {
          if (word.length > 7 && word.includes(fix)) {
            this.nominalizationsUserTable.find.push(
              '• ' + word + ' ⟶ ' + this.nominalizationsTable[fix]
            );
            this.nominalizations.changeNominalizationsNumber(
              this.nominalizationsNumber + 1
            );
            this.nominalizations.changeNominalizationsUserTable(
              this.nominalizationsUserTable
            );
            this.highlight(word);
          }
        }
        word = '';
        wordCounter++;
      }
    }
    this.nominalizationsScore =
      (this.nominalizationsNumber / wordCounter) * 100;
    if (
      isNaN(this.nominalizationsScore) ||
      this.nominalizationsScore === Infinity
    ) {
      this.nominalizationsScore = 0;
    }
    try {
      if (this.nominalizationsScore <= 6) {
        this.nominalizationsFeedback =
          'Rock on. Your writing has a reasonable number of "nominalized" word forms, highlighted below. You probably don\'t need to reduce these any further.';
        this.nominalizationsAlertColor = 'green';
      } else {
        this.nominalizationsFeedback =
          'Most of the words below are perfectly acceptable. However, you use many of these "nominalized" (non root-form) words. They bog down writing and decrease readability.';
        this.nominalizationsAlertColor = 'red';
      }
      if (this.totalSentences === 0) {
        throw new Error('');
      }
    } catch (e) {
      this.nominalizationsFeedback =
        'Make sure you enter at least one sentence.';
      this.nominalizationsAlertColor = 'orange';
      this.nominalizationsScore = 0;
    }
    this.nominalizations.changeNominalizationsFeedback(
      this.nominalizationsFeedback
    );
    this.nominalizations.changeNominalizationsScore(
      Math.round(this.nominalizationsScore * 10) / 10
    );
    this.nominalizations.changeNominalizationsAlertColor(
      this.nominalizationsAlertColor
    );
  }

  // tslint:disable-next-line: typedef
  nominalizationsService() {
    // tslint:disable-next-line: max-line-length
    this.nominalizations.currentNominalizationsAlertColor.subscribe(
      (nominalizationsAlertColor) =>
        (this.nominalizationsAlertColor = nominalizationsAlertColor)
    );
    // tslint:disable-next-line: max-line-length
    this.nominalizations.currentNominalizationsFeedback.subscribe(
      (nominalizationsFeedback) =>
        (this.nominalizationsFeedback = nominalizationsFeedback)
    );
    this.nominalizations.currentNominalizationsScore.subscribe(
      (nominalizationsScore) =>
        (this.nominalizationsScore = nominalizationsScore)
    );
    // tslint:disable-next-line: max-line-length
    this.nominalizations.currentNominalizationsNumber.subscribe(
      (nominalizationsNumber) =>
        (this.nominalizationsNumber = nominalizationsNumber)
    );
    // tslint:disable-next-line: max-line-length
    this.nominalizations.currentNominalizationsUserTable.subscribe(
      (nominalizationsUserTable) =>
        (this.nominalizationsUserTable = nominalizationsUserTable)
    );
    this.nominalizations.currentNominalizationsTable.subscribe(
      (nominalizationsTable) =>
        (this.nominalizationsTable = nominalizationsTable)
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
