import { stringify } from '@angular/compiler/src/util';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { PassivevoiceService } from '../services/passivevoice.service';
import { WordinessService } from '../services/wordiness.service';
import { TransitionsService } from '../services/transitions.service';
import { GrammarService } from '../services/grammar.service';
import { EggcornService } from '../services/eggcorns.service';

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
  passiveVoiceFeedback: string;
  passiveVoiceAlertColor: string;
  passiveVoiceScore: number;

  // Wordiness
  wordinessFeedback: string = " ";
  wordinessAlertColor: string = " ";
  wordinessScore: number;
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
  //Eggcorns
  eggcornsFeedback: string = " ";
  eggcornsScore: number;
  totalEggcorns: number;
  eggcornsTable: any;
  eggcornsUserTable: any;
  eggcornsAlertColor: any;

  // For all fix types
  totalSentencesInText: number;

  title = 'OverView';

  constructor(private router: Router, private data: DataService, private passivevoice: PassivevoiceService,
              private wordiness: WordinessService, private transitions: TransitionsService, private grammar: GrammarService,
              private eggcorns: EggcornService) { }

  table = { find: [], suggestion: [] };

  submitClick(): void {
    // Reset every time you hit re-highlight
    this.data.changeTotalSentences(0);
    this.passivevoice.changePassiveVoiceNumber(0);
    this.wordiness.changeWordinessNumber(0);
    this.transitions.resetTransitionFix();
    this.grammar.resetGrammarFix();
    this.eggcorns.resetEggcornFix();

    // Clear -- Reset
    this.passiveVoiceUserTable = { find: [], suggestion: [] };
    this.wordinessUserTable = { find: [], suggestion: [] };
    this.transitionsUserTable = { find: [], suggestion: [] };
    this.grammarUserTable = { find: [], suggestion: [] };
    this.eggcornsUserTable = { find: [], suggestion: [] };

    // variables
    var userText = (document.getElementById('userinput') as HTMLTextAreaElement).value;
    let aLetter = false;

    // This function checks if there is at least one letter inputed
    var validateChar = function () {
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

      // Find total sentences in text
      for (let i = 0; i < userText.length; i++) {
        if (userText.charAt(i) === "." || userText.charAt(i) === "!" || userText.charAt(i) === "?") {
          this.data.changeTotalSentences(this.totalSentences + 1);
        }
      }

      // fixes
      this.passiveVoiceFix(userText);
      this.wordinessFix(userText);
      this.transitionFix(userText);
      this.grammarFix(userText);
      this.eggcornFix(userText);
    }
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.data.currentGrade.subscribe(grade => this.grade = grade);
    this.data.currentTotalSentences.subscribe(totalSentences => this.totalSentences = totalSentences);

    // Passive Voice
    this.passiveVoiceService();
    // Wordiness
    this.wordinessService();
    // Subscribe to Transition Service
    this.transitionService();
  }

  wordinessFix(userText: string) {
    // tslint:disable-next-line: forin
    for (const fix in this.wordinessTable) {
      if (userText.includes(fix)) {
        this.wordiness.changeWordinessNumber(this.wordinessNumber + 1);
        this.wordinessUserTable.find.push("• " + fix);
        this.wordinessUserTable.suggestion.push("→ " + this.wordinessTable[fix]);
        this.wordiness.changeWordinessUserTable(this.wordinessUserTable);
      }
    }
    this.wordinessScore = (this.wordinessNumber / this.totalSentences) * 100;
    try {
      if (this.wordinessScore > 2) {
        this.wordinessFeedback = "Your writing seems too wordy. Why use 3 words when you can say it with 1?";
        this.wordinessAlertColor = "red";
      }
      else {
        this.wordinessFeedback = "Woohoo! Your writing seems concise, precise, and snappy. George Orwell would be proud.";
        this.wordinessAlertColor = "green";
      }
    }
    catch (e) {
      this.wordinessFeedback = "Make sure you enter at least one sentence.";
      this.wordinessAlertColor = "orange";
      this.wordinessScore = 0;
    }
    this.wordiness.changeWordinessFeedback(this.wordinessFeedback);
    this.wordiness.changeWordinessScore(Math.round(this.wordinessScore));
    this.wordiness.changeWordinessAlertColor(this.wordinessAlertColor);

  }

  wordinessService() {
    this.wordiness.currentWordinessNumber.subscribe(wordinessNumber => this.wordinessNumber = wordinessNumber);
    this.wordiness.currentWordinessTable.subscribe(wordinessTable => this.wordinessTable = wordinessTable);
    this.wordiness.currentWordinessUserTable.subscribe(wordinessUserTable => this.wordinessUserTable = wordinessUserTable);
    this.wordiness.currentWordinessAlertColor.subscribe(wordinessAlertColor => this.wordinessAlertColor = wordinessAlertColor);
    this.wordiness.currentWordinessFeedback.subscribe(wordinessFeedback => this.wordinessFeedback = wordinessFeedback);
    this.wordiness.currentWordinessScore.subscribe(wordinessScore => this.wordinessScore = wordinessScore);
  }

  passiveVoiceFix(userText: string) {
    // tslint:disable-next-line: forin
    for (const fix in this.passiveVoiceTable) {

      // tslint:disable-next-line: forin
      for (const helper in this.passiveVoiceHelperTable) {
        // String
        const compareString = helper + fix;

        if (userText.includes(compareString)) {
          this.passivevoice.changePassiveVoiceNumber(this.passiveVoiceNumber + 1);
          this.passiveVoiceUserTable.find.push("• " + compareString);
          this.passiveVoiceUserTable.suggestion.push("→ " + this.passiveVoiceTable[fix]);
          this.passivevoice.changePassiveVoiceUserTable(this.passiveVoiceUserTable);
        }
      }
    }
    this.passiveVoiceScore = (this.passiveVoiceNumber / this.totalSentences) * 100;
    try {
      if (this.passiveVoiceScore > 10) {
        this.passiveVoiceFeedback = "Generally, writing is clearer in active voice.";
        this.passiveVoiceAlertColor = "red";
      }
      else {
        this.passiveVoiceFeedback = "Your writing passed the criterion for passive sentences. Congrats!";
        this.passiveVoiceAlertColor = "green";
      }
    }
    catch (e) {
      this.passiveVoiceFeedback = "Make sure you enter at least one sentence.";
      this.passiveVoiceAlertColor = "orange";
      this.passiveVoiceScore = 0;
    }
    this.passivevoice.changePassiveVoiceFeedback(this.passiveVoiceFeedback);
    this.passivevoice.changePassiveVoiceScore(Math.round(this.passiveVoiceScore));
    this.passivevoice.changePassiveVoiceAlertColor(this.passiveVoiceAlertColor);
  }

  passiveVoiceService() {
    this.passivevoice.currentPassiveVoiceNumber.subscribe(passiveVoiceNumber => this.passiveVoiceNumber = passiveVoiceNumber);
    this.passivevoice.currentPassiveVoiceTable.subscribe(passiveVoiceTable => this.passiveVoiceTable = passiveVoiceTable);
    this.passivevoice.currentPassiveVoiceHelperTable.subscribe(passiveVoiceHelperTable => this.passiveVoiceHelperTable = passiveVoiceHelperTable);
    this.passivevoice.currentPassiveVoiceUserTable.subscribe(passiveVoiceUserTable => this.passiveVoiceUserTable = passiveVoiceUserTable);
    this.passivevoice.currentPassiveVoiceAlertColor.subscribe(passiveVoiceAlertColor => this.passiveVoiceAlertColor = passiveVoiceAlertColor);
    this.passivevoice.currentPassiveVoiceFeedback.subscribe(passiveVoiceFeedback => this.passiveVoiceFeedback = passiveVoiceFeedback);
    this.passivevoice.currentPassiveVoiceScore.subscribe(passiveVoiceScore => this.passiveVoiceScore = passiveVoiceScore);
  }

  // subscribe to transition variables
  transitionService() {
    // Feedback

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

    // Transition Table of Current User Errors in Text
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
  transitionFix(userText: string) {
    for (const fix in this.transitionsTable) {
      // changing user text to lower Case to match with transitionsTable
      if (userText.toLocaleLowerCase().includes(fix)) {
        this.transitions.changeTotalTransitions(this.totalTransitions + 1);

        // add transition in user text into an array
        // add transition in user text into an array
        this.transitionsUserTable.find.push(fix);
        this.transitionsUserTable.suggestion.push(this.transitionsTable[fix]);
        this.transitions.changeTransitionsUserTable(this.transitionsUserTable);
      }
    }
    // find total sentences in user text
    for (let i = 0; i < userText.length; i++) {
      if (userText.charAt(i) === "." || userText.charAt(i) === "!" || userText.charAt(i) === "?") {
        this.transitions.changeTotalSentences(this.totalSentences + 1);
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
    //calcutale score
    this.transitionsScore = (this.totalTransitions / this.totalSentences) * 100;
    if (isNaN(this.transitionsScore) || this.transitionsScore === Infinity) {
      this.transitionsScore = 0;
    }
    // round to whole number
    this.transitions.changeTransitionsScore(Math.round(this.transitionsScore));
    // this.transitions.changeTransitionsScore(this.transitionsScore);

    if (this.transitionsScore == 0) {
      this.transitionsAlertColor = "red";
      this.transitionsFeedback = "Your writing seems to have no transition word";
    } else if (this.transitionsScore <= 10) {
      this.transitionsFeedback = "The number of transition words in your writing seems low";
      this.transitionsAlertColor = "orange";
    } else if (this.transitionsScore <= 80) {
      this.transitionsFeedback = "Woot! Your writing seems to have a good proportion of transitions";
      this.transitionsAlertColor = "green";
    } else {
      this.transitionsFeedback = "Woot! Your writing seems to have a lot of transitions. Make sure you\'re not overusing transition words";
      this.transitionsAlertColor = "green";
    }
    this.transitions.changeTransitionsFeedback(this.transitionsFeedback);
    this.transitions.changeTransitionsAlertColor(this.transitionsAlertColor);


    //Eggcorns

    // *********************
    // *                   *
    // *    Eggcorns       *
    // *                   *
    // *********************
    //subscribe to eggcorn service
    this.eggcornService();
  }

  // subscribe to eggcorn variables
  eggcornService() {
    //result color
    this.eggcorns.currentEggcornsAlertColor.subscribe(eggcornsAlertColor => this.eggcornsAlertColor = eggcornsAlertColor);

    //Feedback
    this.eggcorns.currentEggcornsFeedback.subscribe(eggcornsFeedback => this.eggcornsFeedback = eggcornsFeedback);

    // eggcorn score
    this.eggcorns.currentEggcornsScore.subscribe(eggcornsScore => this.eggcornsScore = eggcornsScore);

    // Total number of sentences in the user input
    this.eggcorns.currentTotalSentences.subscribe(totalSentences => this.totalSentences = totalSentences);

    // Total number of eggcorns in the user input
    this.eggcorns.currentTotalEggcorns.subscribe(totalEggcorns => this.totalEggcorns = totalEggcorns);

    // Eggcorn Table of all eggcorns
    this.eggcorns.currentEggcornsTable.subscribe(eggcornsTable => this.eggcornsTable = eggcornsTable);

    // Eggcorn Table of Current User Errors in Text
    this.eggcorns.currentEggcornsUserTable.subscribe(eggcornsUserTable => this.eggcornsUserTable = eggcornsUserTable);
  }

  // this function will calculate the eggcorn score
  eggcornFix(userText: string) {
    for (const fix in this.eggcornsTable) {
      // changing user text to lower Case to match with eggcornsTable
      if (userText.toLocaleLowerCase().includes(fix)) {
        this.eggcorns.changeTotalEggcorns(this.totalEggcorns + 1);

        // add eggcorns in user text into an array
        this.eggcornsUserTable.find.push(fix);
        this.eggcornsUserTable.suggestion.push(this.eggcornsUserTable[fix]);
        this.eggcorns.changeEggcornsUserTable(this.eggcornsUserTable);
      }
    }
    //find total sentences in user text
    for (let i = 0; i < userText.length; i++) {
      if (userText.charAt(i) === "." || userText.charAt(i) === "!" || userText.charAt(i) === "?") {
        this.eggcorns.changeTotalSentences(this.totalSentences + 1);
      }
    }
    //calcutale score
    this.eggcornsScore = (this.totalEggcorns / this.totalSentences) * 100;
    if (isNaN(this.eggcornsScore)) {
      this.eggcornsScore = 0;
    }
    // round to whole number
    this.eggcorns.changeEggcornsScore(Math.round(this.eggcornsScore));


    if (this.eggcornsScore == 0) {
      this.eggcornsAlertColor = "green";
      this.eggcornsFeedback = "Great job Your writing seems to have no Eggcorns";
    } else if (this.eggcornsScore <= 5) {
      this.eggcornsFeedback = " Good job the number of Eggcorns words in your writing seems low";
      this.eggcornsAlertColor = "orange";
    } else if (this.eggcornsScore <= 10) {
      this.eggcornsFeedback = "Your writing seems to have alot of eggcorns";
      this.eggcornsAlertColor = "red";
    } else {
      this.eggcornsFeedback = "Your writing seems to have a many eggcorns. Make sure you\'re not using eggcorns";
      this.eggcornsAlertColor = "red";
    }
    this.eggcorns.changeEggcornsFeedback(this.eggcornsFeedback);
    this.eggcorns.changeEggcornsAlertColor(this.eggcornsAlertColor);
  }
  // this function will calculate the total grammar traps
  grammarFix(userText: string) {
    for (const fix in this.grammarTable) {
      // changing user text to lower Case to match with grammarTable
      if (userText.toLocaleLowerCase().includes(fix)) {
        this.totalGrammar++;
        this.grammar.changeTotalGrammar(this.totalGrammar);

        // add grammar traps in user text into an array
        this.grammarUserTable.find.push(fix);
        this.grammarUserTable.suggestion.push(this.grammarTable[fix]);
        this.grammar.changeGrammarUserTable(this.grammarUserTable);
      }
    }

    if (this.totalGrammar == 0) {
      this.grammarAlertColor = "green";
      this.grammarFeedback = "Woohoo! We didn't find any obvious grammark errors. However, " +
        "beware: Grammark does not check for fragments, comma splices, subject-verb errors, " +
        "number and pronoun problems. What's the best way to find grammar errors? Read your writing aloud.";
    } else if (this.totalGrammar > 0) {
      this.grammarAlertColor = "orange";
      this.grammarFeedback = "Your writing includes words or phrases usually considered to be grammar errors";
    }
    this.grammar.changeGrammarFeedback(this.grammarFeedback);
    this.grammar.changeGrammarAlertColor(this.grammarAlertColor);
  }

}


