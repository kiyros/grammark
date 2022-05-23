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
  selector: 'app-transitions-fix',
  templateUrl: './transitions-fix.component.html',
  styleUrls: ['./transitions-fix.component.css'],
})
export class TransitionsFixComponent implements OnInit {
  title = 'Tranistions-Fix';

  // Global global
  message: string;
  grade: number;
  gradeAlertColor: string;
  gradeFeedback: string;
  totalSentences: number;

  // Transitions
  transitionsFeedback: string = ' ';
  transitionsScore: number;
  totalTransitions: number;
  transitionsTable: any;
  transitionsUserTable: any;
  transitionsAlertColor: any;

  constructor(
    private data: DataService,
    private transitions: TransitionsService,
    private academic: AcademicStyleService,
    private eggcorns: EggcornService,
    private grammar: GrammarService,
    private nominalizations: NominalizationsService,
    private passivevoice: PassivevoiceService,
    private wordiness: WordinessService,
    private sentences: SentencesService
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
    this.transitionsUserTable = { find: [], suggestion: [] };

    // variables
    // user text = paragraph from the html file
    let userText = this.message.replace(/<\/?span[^>]*>/g, "");
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
      this.transitionsFix(userText);
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
    this.transitionsService();
  }

  transitionsFix(userText: string) {
    //find transition in user text
    for (const fix in this.transitionsTable.__zone_symbol__value) {
      // changing user text to lower Case to match with transitionsTable
      if (userText.toLocaleLowerCase().includes(fix)) {
        this.transitions.changeTotalTransitions(this.totalTransitions + 1);
        // add transition in user text into an array
        this.transitionsUserTable.find.push(
          '• ' + fix + ' ⟶ ' + this.transitionsTable.__zone_symbol__value[fix]
        );
        this.transitions.changeTransitionsUserTable(this.transitionsUserTable);
        // this.transitionsUserTable.suggestion.push(" ⟶ " + this.transitionsTable[fix]);
        this.highlight(fix);
      }
    }
    //calcutale score
    this.transitionsScore = (this.totalTransitions / this.totalSentences) * 100;
    // if (this.transitionsScore === NaN || this.transitionsScore === Infinity) {
    //  this.transitionsScore = 0;
    // }
    // round to whole number
    // this.transitions.changeTransitionsScore(Math.round(this.transitionsScore));
    // this.transitions.changeTransitionsScore(this.transitionsScore);
    if (isNaN(this.transitionsScore) || this.transitionsScore === Infinity) {
      this.transitionsScore = 0;
    }
    try {
      if (this.transitionsScore == 0) {
        this.transitionsAlertColor = 'red';
        this.transitionsFeedback =
          'Your writing seems to have no transition word';
      } else if (this.transitionsScore <= 10) {
        this.transitionsFeedback =
          'The number of transition words in your writing seems low';
        this.transitionsAlertColor = 'orange';
      } else if (this.transitionsScore <= 80) {
        this.transitionsFeedback =
          'Woot! Your writing seems to have a good proportion of transitions';
        this.transitionsAlertColor = 'green';
      } else {
        this.transitionsFeedback =
          "Woot! Your writing seems to have a lot of transitions. Make sure you're not overusing transition words";
        this.transitionsAlertColor = 'green';
      }
      if (this.totalSentences === 0) {
        throw new Error('');
      }
    } catch (e) {
      this.transitionsFeedback = 'Make sure you enter at least one sentence.';
      this.transitionsAlertColor = 'orange';
      this.transitionsScore = 0;
    }
    // if (this.transitionsScore == 0) {
    //  this.transitionsAlertColor = "red";
    //  this.transitionsFeedback = "Your writing seems to have no transition word";
    // } else if (this.transitionsScore <= 10) {
    //  this.transitionsFeedback = "The number of transition words in your writing seems low";
    //  this.transitionsAlertColor = "orange";
    // } else if (this.transitionsScore <= 80) {
    //  this.transitionsFeedback = "Woot! Your writing seems to have a good proportion of transitions";
    //  this.transitionsAlertColor = "green";
    // } else {
    //  this.transitionsFeedback = "Woot! Your writing seems to have a lot of transitions. Make sure you\'re not overusing transition words";
    //  this.transitionsAlertColor = "green";
    //}
    this.transitions.changeTransitionsScore(
      Math.round(this.transitionsScore * 10) / 10
    );
    this.transitions.changeTransitionsFeedback(this.transitionsFeedback);
    this.transitions.changeTransitionsAlertColor(this.transitionsAlertColor);
  }

  transitionsService() {
    //result color
    this.transitions.currentTransitionsAlertColor.subscribe(
      (transitionsAlertColor) =>
        (this.transitionsAlertColor = transitionsAlertColor)
    );
    //Feedback
    this.transitions.currentTransitionsFeedback.subscribe(
      (transitionsFeedback) => (this.transitionsFeedback = transitionsFeedback)
    );
    // Total number of sentences in the user input
    // this.transitions.currentTotalSentences.subscribe(totalSentences => this.totalSentences = totalSentences);
    // Total number of transitions in the user input
    this.transitions.currentTotalTransitions.subscribe(
      (totalTransitions) => (this.totalTransitions = totalTransitions)
    );
    // Transition Table of all transitions
    this.transitions.currentTransitionsTable.subscribe(
      (transitionsTable) => (this.transitionsTable = transitionsTable)
    );
    // Transition Table of Current User Errors in Text
    this.transitions.currentTransitionsUserTable.subscribe(
      (transitionsUserTable) =>
        (this.transitionsUserTable = transitionsUserTable)
    );
    // Transitions score
    this.transitions.currentTransitionsScore.subscribe(
      (transitionsScore) => (this.transitionsScore = transitionsScore)
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
