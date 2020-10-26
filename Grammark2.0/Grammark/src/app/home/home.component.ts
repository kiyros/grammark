import { stringify } from '@angular/compiler/src/util';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { PassivevoiceService } from '../services/passivevoice.service';
import { TransitionsService} from '../services/transitions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message: string;
  grade: number;
  passiveVoiceNumber: number;
  passiveVoiceTable: any;
  passiveVoiceHelperTable: any;
  passiveVoiceUserTable: any;
  passiveVoiceUserTable2: any;

  //var for transitions 
  transitionsFeedback: string = " ";
  transitionsScore: number;
  totalSentences: number;
  totalTransitions: number;
  transitionsTable: any;
  transitionsUserTable: any;

  title = 'OverView';

  table = { find:[], suggestion:[] };

  constructor(private router : Router, private data: DataService, private passivevoice: PassivevoiceService, private transitions: TransitionsService) { }

  submitClick() : void {
    // Reset every time you hit re-highlight
    // this.data.changePassiveVoice(0);
    this.passivevoice.changePassiveVoiceNumber(0);
    this.transitions.resetTransitionFix();
    // Clear -- Reset
    this.table = { find:[], suggestion:[] };
    this.passiveVoiceUserTable = { find:[], suggestion:[] };
    this.passiveVoiceUserTable2 = { find: [], suggestion: [] };
    this.transitionsUserTable = { find: [], suggestion: [] };

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

      // tslint:disable-next-line: forin
      for (const fix in this.passiveVoiceTable) {

        // tslint:disable-next-line: forin
        for (const helper in this.passiveVoiceHelperTable) {
          // String
          const compareString = helper + fix;

          if (userText.includes(compareString)) {

            // this.data.changePassiveVoice(this.passiveVoiceNumber + 1);
            this.passivevoice.changePassiveVoiceNumber(this.passiveVoiceNumber + 1);
            this.passiveVoiceUserTable.find.push(compareString);
            this.passiveVoiceUserTable.suggestion.push(this.passiveVoiceTable[fix]);
            this.passivevoice.changePassiveVoiceUserTable(this.passiveVoiceUserTable);
          }
        }
      }

       //transition fix!!
      this.transitionFix(userText);
  }
}

  ngOnInit(): void {
    // Input Text
    this.data.currentMessage.subscribe(message => this.message = message);
    // Grade
    this.data.currentGrade.subscribe(grade => this.grade = grade);
    // Passive Voice
    // this.data.currentPassiveVoice.subscribe(passiveVoice => this.passiveVoice = passiveVoice);

    // this.data.currentPassiveVoiceTable.subscribe(passiveVoiceTable => this.passiveVoiceTable = passiveVoiceTable);

    // this.data.currentPassiveVoiceUserTable.subscribe(passiveVoiceUserTable => this.passiveVoiceUserTable = this.passiveVoiceUserTable);

    this.passivevoice.currentPassiveVoiceNumber.subscribe(passiveVoiceNumber => this.passiveVoiceNumber = passiveVoiceNumber);

    this.passivevoice.currentPassiveVoiceTable.subscribe(passiveVoiceTable => this.passiveVoiceTable = passiveVoiceTable);

    // Passive Voice Table of Helpers
    // tslint:disable-next-line: max-line-length
    this.passivevoice.currentPassiveVoiceHelperTable.subscribe(passiveVoiceHelperTable => this.passiveVoiceHelperTable = passiveVoiceHelperTable);

    this.passivevoice.currentPassiveVoiceUserTable.subscribe(passiveVoiceUserTable => this.passiveVoiceUserTable = passiveVoiceUserTable);

    // tslint:disable-next-line: max-line-length
    // this.passivevoice.currentPassiveVoiceUserTable2.subscribe(passiveVoiceUserTable2 => this.passiveVoiceUserTable2 = passiveVoiceUserTable2);
    
    //subscribe to transition service 
    this.transitionService();
  }

  // subscribe to transition variables 
  transitionService(){
    //Feedback
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

  // this function will calculate the transition score
  transitionFix(userText: string){
    for (const fix in this.transitionsTable) {
      if (userText.includes(fix)) {
        this.transitions.changeTotalTransitions(this.totalTransitions + 1);


        // add transition in user text into an array 
        this.transitionsUserTable.find.push(fix);
        this.transitionsUserTable.suggestion.push(this.transitionsUserTable[fix]);
        this.transitions.changeTransitionsUserTable(this.transitionsUserTable);
      }
  }
  //find total sentences in user text 
    for (let i = 0; i < userText.length; i++) {
      if(userText.charAt(i)=== "." || userText.charAt(i)=== "!"|| userText.charAt(i)=== "?"){
        this.transitions.changeTotalSentences(this.totalSentences + 1 );
      } 
    }
  //calcutale score
  this.transitionsScore = (this.totalTransitions/this.totalSentences)*100;
  this.transitions.changeTransitionsScore(this.transitionsScore);

  if(this.transitionsScore <= 69 || this.transitionsScore == 0 ){
    this.transitionsFeedback = "The number of transition words in your writing seems low";
  }else if(this.transitionsScore <= 80){
    this.transitionsFeedback = "Woot! Your writing seems to have a good proportion of transitions";
  }else{
    this.transitionsFeedback ="Woot! Your writing seems to have a lot of transitions. Make sure you\'re not overusing transition words";
  }
  this.transitions.changeTransitionsFeedback(this.transitionsFeedback);
  }
}
