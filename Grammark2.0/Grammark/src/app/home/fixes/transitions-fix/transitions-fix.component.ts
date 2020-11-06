import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { TransitionsService} from '../../../services/transitions.service';

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
  transitionsAlertColor: any;
  
  

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

          //find transition in user text
          for (const fix in this.transitionsTable) {
              // changing user text to lower Case to match with transitionsTable
              if (userText.toLocaleLowerCase().includes(fix)) {
                this.transitions.changeTotalTransitions(this.totalTransitions + 1);

                // add transition in user text into an array 
                this.transitionsUserTable.find.push(fix);
                this.transitions.changeTransitionsUserTable(this.transitionsUserTable);
                //this.transitionsUserTable.suggestion.push(this.transitionsTable[fix]);
              }
          }
          //find total sentences in user text 
            for (let i = 0; i < userText.length; i++) { 
              if(userText.charAt(i)=== "." || userText.charAt(i)=== "!"|| userText.charAt(i)=== "?"){
                this.transitions.changeTotalSentences(this.totalSentences + 1);
              } 
            }
          //calcutale score
          this.transitionsScore = (this.totalTransitions/this.totalSentences)*100;
          if(this.transitionsScore === NaN || this.transitionsScore === Infinity){
            this.transitionsScore = 0;
          }
          // round to whole number
          this.transitions.changeTransitionsScore(Math.round(this.transitionsScore));
          // this.transitions.changeTransitionsScore(this.transitionsScore);

          if(this.transitionsScore == 0 ){
            this.transitionsAlertColor = "red";
            this.transitionsFeedback = "Your writing seems to have no transition word";
          }else if (this.transitionsScore <= 10){
            this.transitionsFeedback = "The number of transition words in your writing seems low";
            this.transitionsAlertColor = "orange";
          }else if(this.transitionsScore <= 80){
            this.transitionsFeedback = "Woot! Your writing seems to have a good proportion of transitions";
            this.transitionsAlertColor = "green";
          }else{
            this.transitionsFeedback ="Woot! Your writing seems to have a lot of transitions. Make sure you\'re not overusing transition words";
            this.transitionsAlertColor = "green";
          }
          this.transitions.changeTransitionsFeedback(this.transitionsFeedback);
          this.transitions.changeTransitionsAlertColor(this.transitionsAlertColor);
    }
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
    //result color 
    this.transitions.currentTransitionsAlertColor.subscribe(transitionsAlertColor => this.transitionsAlertColor = transitionsAlertColor);

    //Feedback
    this.transitions.currentTransitionsFeedback.subscribe(transitionsFeedback => this.transitionsFeedback = transitionsFeedback);

    // Total number of sentences in the user input
    this.transitions.currentTotalSentences.subscribe(totalSentences => this.totalSentences = totalSentences);

    // Total number of transitions in the user input
    this.transitions.currentTotalTransitions.subscribe(totalTransitions => this.totalTransitions = totalTransitions);

    // Transition Table of all transitions
    this.transitions.currentTransitionsTable.subscribe(transitionsTable => this.transitionsTable = transitionsTable);

    // Transition Table of Current User Errors in Text 
    this.transitions.currentTransitionsUserTable.subscribe(transitionsUserTable => this.transitionsUserTable = transitionsUserTable);

    // Transitions score
    this.transitions.currentTransitionsScore.subscribe(transitionsScore => this.transitionsScore = transitionsScore);
  } 
}
