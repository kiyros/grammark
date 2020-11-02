import { stringify } from '@angular/compiler/src/util';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { PassivevoiceService } from '../services/passivevoice.service';
import { WordinessService } from '../services/wordiness.service';
import { TransitionsService} from '../services/transitions.service';
import { GrammarService} from '../services/grammar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message: string;
  grade: number;
  // Passive Voice
  passiveVoiceNumber: number;
  passiveVoiceTable: any;
  passiveVoiceHelperTable: any;
  passiveVoiceUserTable: any;
  // Wordiness
  wordinessNumber: number;
  wordinessTable: any;
  wordinessUserTable: any;

  //var for transitions 
  transitionsFeedback: string = " ";
  transitionsScore: number;
  totalSentences: number;
  totalTransitions: number;
  transitionsTable: any;
  transitionsUserTable: any;
  transitionsAlertColor: any;

  //grammar
  grammarFeedback: string = " ";
  totalGrammar: number;
  grammarTable: any;
  grammarUserTable: any;
  grammarAlertColor: any;

  title = 'OverView';

  constructor(private router : Router, private data: DataService, private passivevoice: PassivevoiceService,
              private wordiness: WordinessService, private transitions: TransitionsService, private grammar: GrammarService) { }
  table = { find:[], suggestion:[] };

  submitClick() : void {
    // Reset every time you hit re-highlight
    // this.data.changePassiveVoice(0);
    this.passivevoice.changePassiveVoiceNumber(0);
    this.wordiness.changeWordinessNumber(0);
    this.transitions.resetTransitionFix();
    this.grammar.resetGrammarFix();
    // Clear -- Reset
    this.passiveVoiceUserTable = { find:[], suggestion:[] };
    this.wordinessUserTable = { find:[], suggestion:[] };
    this.transitionsUserTable = { find: [], suggestion: [] };
    this.grammarUserTable = { find: [], suggestion: [] };

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

      for (const fix in this.wordinessTable) {

        if (userText.includes(fix)) {

          this.wordiness.changeWordinessNumber(this.wordinessNumber + 1);
          this.wordinessUserTable.find.push(fix);
          this.wordiness.changeWordinessUserTable(this.wordinessUserTable);
        }
      }
    }
       //transition fix!!
      this.transitionFix(userText);

      //grammar fix!
      this.grammarFix(userText);
  }


  ngOnInit(): void {
    // Input Text
    this.data.currentMessage.subscribe(message => this.message = message);
    // Grade
    this.data.currentGrade.subscribe(grade => this.grade = grade);

    // ************************
    // *                      *
    // *     Passive Voice    *
    // *                      *
    // ************************
    this.passivevoice.currentPassiveVoiceNumber.subscribe(passiveVoiceNumber => this.passiveVoiceNumber = passiveVoiceNumber);
    this.passivevoice.currentPassiveVoiceTable.subscribe(passiveVoiceTable => this.passiveVoiceTable = passiveVoiceTable);
    // tslint:disable-next-line: max-line-length
    this.passivevoice.currentPassiveVoiceHelperTable.subscribe(passiveVoiceHelperTable => this.passiveVoiceHelperTable = passiveVoiceHelperTable);
    this.passivevoice.currentPassiveVoiceUserTable.subscribe(passiveVoiceUserTable => this.passiveVoiceUserTable = passiveVoiceUserTable);

    // *********************
    // *                   *
    // *     Wordiness     *
    // *                   *
    // *********************
    this.wordiness.currentWordinessNumber.subscribe(wordinessNumber => this.wordinessNumber = wordinessNumber);
    this.wordiness.currentWordinessTable.subscribe(wordinessTable => this.wordinessTable = wordinessTable);
    this.wordiness.currentWordinessUserTable.subscribe(wordinessUserTable => this.wordinessUserTable = wordinessUserTable);
    // tslint:disable-next-line: max-line-length
    // this.passivevoice.currentPassiveVoiceUserTable2.subscribe(passiveVoiceUserTable2 => this.passiveVoiceUserTable2 = passiveVoiceUserTable2);
    
    // *********************
    // *                   *
    // *    Transitions    *
    // *                   *
    // *********************
    //subscribe to transition service 
    this.transitions.currentTransitionsAlertColor.subscribe(transitionsAlertColor => this.transitionsAlertColor = transitionsAlertColor);
    this.transitions.currentTransitionsFeedback.subscribe(transitionsFeedback => this.transitionsFeedback = transitionsFeedback);
    this.transitions.currentTransitionsScore.subscribe(transitionsScore => this.transitionsScore = transitionsScore);
    this.transitions.currentTotalSentences.subscribe(totalSentences => this.totalSentences = totalSentences);
    this.transitions.currentTotalTransitions.subscribe(totalTransitions => this.totalTransitions = totalTransitions);
    this.transitions.currentTransitionsTable.subscribe(transitionsTable => this.transitionsTable = transitionsTable);
    this.transitions.currentTransitionsUserTable.subscribe(transitionsUserTable => this.transitionsUserTable = transitionsUserTable);
    
    // *********************
    // *                   *
    // *    Grammar        *
    // *                   *
    // *********************
    this.grammar.currentGrammarAlertColor.subscribe(grammarAlertColor => this.grammarAlertColor = grammarAlertColor);
    this.grammar.currentGrammarFeedback.subscribe(grammarFeedback => this.grammarFeedback = grammarFeedback);
    this.grammar.currentTotalGrammar.subscribe(totalGrammar => this.totalGrammar = totalGrammar);
    this.grammar.currentGrammarTable.subscribe(grammarTable => this.grammarTable = grammarTable);
    this.grammar.currentGrammarUserTable.subscribe(grammarUserTable => this.grammarUserTable = grammarUserTable);
  }


  // this function will calculate the transition score
  transitionFix(userText: string){
    for (const fix in this.transitionsTable) {
      // changing user text to lower Case to match with transitionsTable
      if (userText.toLocaleLowerCase().includes(fix)) {
        this.transitions.changeTotalTransitions(this.totalTransitions + 1);

        // add transition in user text into an array 
        this.transitionsUserTable.find.push(fix);
        this.transitionsUserTable.suggestion.push(this.transitionsTable[fix]);
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
  if(isNaN(this.transitionsScore)  || this.transitionsScore === Infinity){
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

  // this function will calculate the total grammar traps
  grammarFix(userText: string){
    for (const fix in this.grammarTable) {
      // changing user text to lower Case to match with grammarTable
      if (userText.toLocaleLowerCase().includes(fix)) {
        this.totalGrammar ++;
        this.grammar.changeTotalGrammar(this.totalGrammar);

        // add grammar traps in user text into an array 
        this.grammarUserTable.find.push(fix);
        this.grammarUserTable.suggestion.push(this.grammarTable[fix]);
        this.grammar.changeGrammarUserTable(this.grammarUserTable);
      }
  }

  if(this.totalGrammar  == 0 ){
    this.grammarAlertColor = "green";
    this.grammarFeedback = "Woohoo! We didn't find any obvious grammark errors. However, " +
     "beware: Grammark does not check for fragments, comma splices, subject-verb errors, "+ 
     "number and pronoun problems. What's the best way to find grammar errors? Read your writing aloud.";
  }else if (this.totalGrammar > 0){
    this.grammarAlertColor = "orange";
    this.grammarFeedback = "Your writing includes words or phrases usually considered to be grammar errors";
  }
  this.grammar.changeGrammarFeedback(this.grammarFeedback);
  this.grammar.changeGrammarAlertColor(this.grammarAlertColor);
  }
}

