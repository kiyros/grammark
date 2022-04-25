import { ThrowStmt } from '@angular/compiler';
import {MatToolbarModule} from '@angular/material/toolbar'; 
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
  selector: 'app-academic-style-fix',
  templateUrl: './academic-style-fix.component.html',
  styleUrls: ['./academic-style-fix.component.css'],
})
export class AcademicStyleFixComponent implements OnInit {
  title = 'Academic-Style-Fix';

  // Global global
  message: string;
  grade: number;
  gradeAlertColor: string;
  gradeFeedback: string;
  totalSentences: number;

  // Academic Style
  academicStyleFeedback: string = ' ';
  academicStyleScore: number;
  totalNonAcademic: number;
  academicStyleTable: any;
  academicStyleUserTable: any;
  academicStyleAlertColor: any;

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
    this.wordiness.changeWordinessNumber(0);
    this.transitions.changeTotalTransitions(0);
    this.academic.changeTotalNonAcademic(0);
    this.grammar.changeTotalGrammar(0);
    this.eggcorns.changeTotalEggcorns(0);
    this.nominalizations.changeNominalizationsNumber(0);
    this.sentences.changeSentencesNumber(0);

    // Clear -- Reset
    this.academicStyleUserTable = [];

    // variables
    // user text = paragraph from the html file
    let userText = this.message.replace(/<\/?span[^>]*>/g, "");
    console.log(userText)
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

      this.academicStyleFix(userText);
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

    // Service
    this.academicStyleService();
  }

  academicStyleFix(userText: string) {
    //find non academic word in user text
    const errorHolder = new Map();
    for (const fix in this.academicStyleTable) {
      if (userText.includes(fix)) {
        let errorIndex = userText.indexOf(fix);
        errorHolder.set(
          errorIndex,
          '• ' + fix + ' ⟶ ' + this.academicStyleTable[fix]
        );
        this.academic.changeTotalNonAcademic(this.totalNonAcademic + 1);

        //highlights the error
        this.highlight(fix);

        while (userText.indexOf(fix, errorIndex + 1) > errorIndex) {
          // console.log(errorIndex, "• " + fix + " ⟶ " + this.academicStyleTable[fix])
          errorIndex = userText.indexOf(fix, errorIndex + 1);
          errorHolder.set(
            errorIndex,
            '• ' + fix + ' ⟶ ' + this.academicStyleTable[fix]
          );
          // console.log(errorIndex + " • " + fix + " ⟶ " + this.academicStyleTable[fix]);

          this.academic.changeTotalNonAcademic(this.totalNonAcademic + 1);
        }
        // this.academicStyleUserTable.push(errorHolder.get(47) + " testing" + userText.indexOf(fix));
        // this.academicStyleUserTable.suggestion.push("→ " + this.academicStyleTable[fix]);
      }
    }

    // sort by value; in order of when they appear in the text
    const sortedErrors = Array.from(
      new Map([...errorHolder.entries()].sort(([a], [b]) => a - b)).values()
    );
    this.academicStyleUserTable = sortedErrors;

    // const userSentenceArray = userText.split(".");
    // for (const sentence in userSentenceArray) {
    //   this.academicStyleUserTable.push("------" + userSentenceArray[sentence]);
    //   const errorHolder = new Map();

    //   for (const fix in this.academicStyleTable) {
    //     if (userSentenceArray[sentence].includes(fix)) {
    //       this.academic.changeTotalNonAcademic(this.totalNonAcademic + 1);

    //       errorHolder.set(userSentenceArray[sentence].indexOf(fix), "");

    //       this.academicStyleUserTable.push("• " + "index of: " + userSentenceArray[sentence].indexOf(fix) + "    " + fix + " ⟶ " + this.academicStyleTable[fix]);
    //     }
    //   }
    // }

    this.academicStyleUserTable.find = this.academicStyleUserTable;
    this.academic.changeAcademicStyleUserTable(
      this.academicStyleUserTable.find
    );

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
        word = '';
        wordCounter++;
      }
    }
    //calculate academic style score
    this.academicStyleScore = (this.totalNonAcademic / wordCounter) * 100;
    if (
      isNaN(this.academicStyleScore) ||
      this.academicStyleScore === Infinity
    ) {
      this.academicStyleScore = 0;
    }
    try {
      if (this.academicStyleScore > 1) {
        this.academicStyleAlertColor = 'red';
        this.academicStyleFeedback =
          'Your writing may contain language that is either too casual or too extreme for academic discourse.';
      } else {
        this.academicStyleAlertColor = 'green';
        this.academicStyleFeedback =
          'Your writing has a low percentage of casual and/or extreme language. This makes it more acceptable for academic style.';
      }
      if (this.totalSentences === 0) {
        throw new Error('');
      }
    } catch (e) {
      this.academicStyleFeedback = 'Make sure you enter at least one sentence.';
      this.academicStyleAlertColor = 'orange';
      this.academicStyleScore = 0;
    }
    if (
      isNaN(this.academicStyleScore) ||
      this.academicStyleScore === Infinity
    ) {
      this.academicStyleScore = 0;
    }
    this.academic.changeAcademicStyleScore(
      Math.round(this.academicStyleScore * 10) / 10
    );
    this.academic.changeAcademicStyleFeedback(this.academicStyleFeedback);
    this.academic.changeAcademicStyleAlertColor(this.academicStyleAlertColor);
  }

  academicStyleService() {
    //result color
    this.academic.currentAcademicStyleAlertColor.subscribe(
      (academicStyleAlertColor) =>
        (this.academicStyleAlertColor = academicStyleAlertColor)
    );
    //Feedback
    this.academic.currentAcademicStyleFeedback.subscribe(
      (academicStyleFeedback) =>
        (this.academicStyleFeedback = academicStyleFeedback)
    );
    // Total number of sentences in the user input
    // this.academic.currentTotalSentences.subscribe(totalSentences => this.sentences = totalSentences);
    // Total number of non academic style instances in the user input
    this.academic.currentTotalNonAcademic.subscribe(
      (totalNonAcademic) => (this.totalNonAcademic = totalNonAcademic)
    );
    // academic style table
    this.academic.currentAcademicStyleTable.subscribe(
      (academicStyleTable) => (this.academicStyleTable = academicStyleTable)
    );
    // non academic style table of Current User Errors in Text
    this.academic.currentAcademicStyleUserTable.subscribe(
      (academicStyleUserTable) =>
        (this.academicStyleUserTable = academicStyleUserTable)
    );
    // non academic style score
    this.academic.currentAcademicStyleScore.subscribe(
      (academicStyleScore) => (this.academicStyleScore = academicStyleScore)
    );
  }

  //new hgihlight feature uses regex to replace the errors in the entire paragraph
  highlight(text) {
    //hold the message from the html textbox with id= userinput
    var paragraph = document.getElementById('userinput');

    //dynamic/custom regex expression -> only way to use variable inside regex
    let re = new RegExp(`\\b${text}\\b`, 'gi');

    //replace with -> span and highlight
    paragraph.innerHTML = paragraph.innerHTML.replace(
      re,
      '<span style="background-color: #FF6363; padding: 0.1em, 0.2em ;font-family: Georgia;" >' +
      text +
      ' </span>'
    );
  }
}
