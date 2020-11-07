import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { WordinessService } from '../../../services/wordiness.service';
import { PassivevoiceService } from '../../../services/passivevoice.service';


@Component({
  selector: 'app-wordiness-fix',
  templateUrl: './wordiness-fix.component.html',
  styleUrls: ['./wordiness-fix.component.css']
})
export class WordinessFixComponent implements OnInit {

  title = 'Wordiness-Fix';

  message: string;
  totalSentences: number;

  // Wordiness
  wordinessNumber: number;
  wordinessTable: any;
  wordinessUserTable: any;
  wordinessAlertColor: string;
  wordinessFeedback: string = " ";
  wordinessScore: number;

  // Passive Voice
  passiveVoiceNumber: number;
  passiveVoiceTable: any;
  passiveVoiceHelperTable: any;
  passiveVoiceUserTable: any;
  passiveVoiceFeedback: string;
  passiveVoiceAlertColor: string;
  passiveVoiceScore: number;

  constructor(private data: DataService,
              private wordiness: WordinessService,
              private passivevoice: PassivevoiceService) { }

  startOverClick() : void {
    this.data.changeMessage('');
  }

  reHighlight(): void {
    // Reset
    this.data.changeTotalSentences(0);
    this.wordiness.changeWordinessNumber(0);
    this.passivevoice.changePassiveVoiceNumber(0);

    // Reset tables
    this.wordinessUserTable = { find: [], suggestion: [] };
    this.passiveVoiceUserTable = { find: [], suggestion: [] };

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

      // Find total sentences in text
      for (let i = 0; i < userText.length; i++) {
        if (userText.charAt(i) === "." || userText.charAt(i) === "!" || userText.charAt(i) === "?") {
          this.data.changeTotalSentences(this.totalSentences + 1);
        }
      }

      // fixes
      this.wordinessFix(userText);
      this.passiveVoiceFix(userText);
    }
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.data.currentTotalSentences.subscribe(totalSentences => this.totalSentences = totalSentences);

    this.wordinessService();
    this.passiveVoiceService();
  }

  wordinessFix(userText: string) {
    // tslint:disable-next-line: forin
    for (const fix in this.wordinessTable) {
      if (userText.includes(fix)) {
        this.wordiness.changeWordinessNumber(this.wordinessNumber + 1);
        this.wordinessUserTable.find.push("• " + fix + " ⟶ " + this.wordinessTable[fix]);
        // this.wordinessUserTable.suggestion.push("→ " + this.wordinessTable[fix]);
        this.wordiness.changeWordinessUserTable(this.wordinessUserTable);
      }
    }
    this.wordinessScore = (this.wordinessNumber / this.totalSentences) * 100;
    if (isNaN(this.wordinessScore)|| this.wordinessScore === Infinity) {
      this.wordinessScore = 0;
    }
    try {
      if (this.wordinessScore > 2) {
        this.wordinessFeedback = "Your writing seems too wordy. Why use 3 words when you can say it with 1?";
        this.wordinessAlertColor = "red";
      }
      else {
        this.wordinessFeedback = "Woohoo! Your writing seems concise, precise, and snappy. George Orwell would be proud.";
        this.wordinessAlertColor = "green";
      }
      if (this.totalSentences === 0) {
        throw new Error("");
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
      if (this.totalSentences === 0) {
        throw new Error("");
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
}
