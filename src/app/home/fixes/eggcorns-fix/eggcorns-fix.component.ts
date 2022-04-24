import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { EggcornService } from '../../../services/eggcorns.service';
import { GrammarService } from '../../../services/grammar.service';
import { NominalizationsService } from '../../../services/nominalizations.service';
import { PassivevoiceService } from '../../../services/passivevoice.service';
import { WordinessService } from '../../../services/wordiness.service';
import { SentencesService } from '../../../services/sentences.service';
import { TransitionsService } from '../../../services/transitions.service';
import { AcademicStyleService } from '../../../services/academicstyle.service';

@Component({
  selector: 'app-eggcorns-fix',
  templateUrl: './eggcorns-fix.component.html',
  styleUrls: ['./eggcorns-fix.component.css'],
})
export class EggcornsFixComponent implements OnInit {
  title = 'Eggcorns-Fix';

  // Global global
  message: string;
  grade: number;
  gradeAlertColor: string;
  gradeFeedback: string;
  totalSentences: number;

  // Eggcorns
  eggcornsFeedback: string = ' ';
  eggcornsScore: number;
  totalEggcorns: number;
  eggcornsTable: any;
  eggcornsUserTable: any;
  eggcornsAlertColor: any;

  constructor(
    private data: DataService,
    private eggcorns: EggcornService,
    private academic: AcademicStyleService,
    private grammar: GrammarService,
    private nominalizations: NominalizationsService,
    private passivevoice: PassivevoiceService,
    private wordiness: WordinessService,
    private sentences: SentencesService,
    private transitions: TransitionsService
  ) { }

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
    this.eggcorns.changeTotalEggcorns(0);
    this.wordiness.changeWordinessNumber(0);
    this.transitions.changeTotalTransitions(0);
    this.academic.changeTotalNonAcademic(0);
    this.grammar.changeTotalGrammar(0);
    this.nominalizations.changeNominalizationsNumber(0);
    this.sentences.changeSentencesNumber(0);

    // Clear -- Reset
    this.eggcornsUserTable = { find: [], suggestion: [] };
    // variables
    // tslint:disable-next-line: prefer-const
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

      // fixes
      this.eggcornsFix(userText);
    }
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe((message) => (this.message = message));
    this.data.currentTotalSentences.subscribe(
      (totalSentences) => (this.totalSentences = totalSentences)
    );
    this.data.currentTotalSentences.subscribe(
      (totalSentences) => (this.totalSentences = totalSentences)
    );
    this.data.currentGradeAlertColor.subscribe(
      (gradeAlertColor) => (this.gradeAlertColor = gradeAlertColor)
    );
    this.data.currentGradeFeedback.subscribe(
      (gradeFeedback) => (this.gradeFeedback = gradeFeedback)
    );

    // Services
    this.eggcornnsService();
  }

  eggcornsFix(userText: string) {
    for (const fix in this.eggcornsTable) {
      if (userText.toLocaleLowerCase().includes(fix)) {
        this.eggcorns.changeTotalEggcorns(this.totalEggcorns + 1);
        this.eggcornsUserTable.find.push(
          '• ' + fix + ' ⟶ ' + this.eggcornsTable[fix]
        );
        this.highlight(fix);
        // this.eggcornsUserTable.suggestion.push(" ⟶ " + this.eggcornsTable[fix]);
        this.eggcorns.changeEggcornsUserTable(this.eggcornsUserTable);
      }
    }
    this.eggcornsScore = (this.totalEggcorns / this.totalSentences) * 100;
    try {
      if (this.eggcornsScore == 0) {
        this.eggcornsAlertColor = 'green';
        this.eggcornsFeedback =
          'Great job! Your writing seems to have no Eggcorns.';
      } else if (this.eggcornsScore <= 5) {
        this.eggcornsFeedback =
          ' Good job, the number of Eggcorns words in your writing seems low';
        this.eggcornsAlertColor = 'orange';
      } else if (this.eggcornsScore <= 10) {
        this.eggcornsFeedback = 'Your writing seems to have a lot of eggcorns';
        this.eggcornsAlertColor = 'red';
      } else {
        this.eggcornsFeedback =
          "Your writing seems to have a many eggcorns. Make sure you're not using eggcorns";
        this.eggcornsAlertColor = 'red';
      }
      if (this.totalSentences === 0) {
        throw new Error('');
      }
    } catch (e) {
      this.eggcornsFeedback = 'Make sure you enter at least one sentence.';
      this.eggcornsAlertColor = 'orange';
      this.eggcornsScore = 0;
    }
    this.eggcorns.changeEggcornsScore(Math.round(this.eggcornsScore));
    this.eggcorns.changeEggcornsFeedback(this.eggcornsFeedback);
    this.eggcorns.changeEggcornsAlertColor(this.eggcornsAlertColor);
  }

  eggcornnsService() {
    this.eggcorns.currentEggcornsAlertColor.subscribe(
      (eggcornsAlertColor) => (this.eggcornsAlertColor = eggcornsAlertColor)
    );
    this.eggcorns.currentEggcornsFeedback.subscribe(
      (eggcornsFeedback) => (this.eggcornsFeedback = eggcornsFeedback)
    );
    this.eggcorns.currentEggcornsScore.subscribe(
      (eggcornsScore) => (this.eggcornsScore = eggcornsScore)
    );
    this.eggcorns.currentTotalEggcorns.subscribe(
      (totalEggcorns) => (this.totalEggcorns = totalEggcorns)
    );
    this.eggcorns.currentEggcornsTable.subscribe(
      (eggcornsTable) => (this.eggcornsTable = eggcornsTable)
    );
    this.eggcorns.currentEggcornsUserTable.subscribe(
      (eggcornsUserTable) => (this.eggcornsUserTable = eggcornsUserTable)
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
