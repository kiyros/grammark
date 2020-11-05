import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { TransitionsService } from '../../../services/transitions.service';

@Component({
  selector: 'app-transitions-fix',
  templateUrl: './transitions-fix.component.html',
  styleUrls: ['./transitions-fix.component.css']
})
export class TransitionsFixComponent implements OnInit {

  title = 'Tranistions-Fix';

  // var
  message: string;
  transitionsFeedback: string = " ";
  transitionsScore: number;
  totalSentences: number;
  totalTransitions: number;
  transitionsTable: any;
  transitionsUserTable: any;



  constructor(private data: DataService, private transitions: TransitionsService) { }

  reHighlight(): void {

    // Reset every time you hit re-highlight
    this.transitions.resetTransitionFix();

    // Clear -- Reset
    this.transitionsUserTable = { find: [], suggestion: [] };

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

      // find transition in user text
      for (const fix in this.transitionsTable) {
        if (userText.includes(fix)) {
          this.totalTransitions++;
          this.transitions.changeTotalTransitions(this.totalTransitions);

          // add transition in user text into an array
          this.transitionsUserTable.find.push(fix);
          this.transitionsUserTable.suggestion.push(this.transitionsUserTable[fix]);
          this.transitions.changeTransitionsUserTable(this.transitionsUserTable);
        }
      }
      // find total sentences in user text
      for (let i = 0; i < userText.length; i++) {
        if (userText.charAt(i) === "." || userText.charAt(i) === "!" || userText.charAt(i) === "?") {
          this.totalSentences++;
          this.transitions.changeTotalSentences(this.totalSentences);
        }
      }
      // calcutale score
      this.transitionsScore = (this.totalTransitions / this.totalSentences) * 100;
      this.transitions.changeTransitionsScore(this.transitionsScore);

      if (this.transitionsScore <= 69 || this.transitionsScore == 0) {
        this.transitionsFeedback = "The number of transition words in your writing seems low";
      } else if (this.transitionsScore <= 80) {
        this.transitionsFeedback = "Woot! Your writing seems to have a good proportion of transitions";
      } else {
        this.transitionsFeedback = "Woot! Your writing seems to have a lot of transitions. Make sure you\'re not overusing transition words";
      }
      this.transitions.changeTransitionsFeedback(this.transitionsFeedback);
    }
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
    // Feedback
    this.transitions.currentTransitionsFeedback.subscribe(transitionsFeedback => this.transitionsFeedback = transitionsFeedback);

    // Transitions score
    this.transitions.currentTransitionsScore.subscribe(transitionsScore => this.transitionsScore = transitionsScore);

    // Total number of sentences in the user input
    this.transitions.currentTotalSentences.subscribe(totalSentences => this.totalSentences = totalSentences);

    // Total number of transitions in the user input
    this.transitions.currentTotalTransitions.subscribe(totalTransitions => this.totalTransitions = totalTransitions);

    // Transition Table of all transitions
    this.transitions.currentTransitionsTable.subscribe(transitionsTable => this.transitionsTable = transitionsTable);

    // Transition Table of Current User Errors in Text
    this.transitions.currentTransitionsUserTable.subscribe(transitionsUserTable => this.transitionsUserTable = transitionsUserTable);
  }
}
