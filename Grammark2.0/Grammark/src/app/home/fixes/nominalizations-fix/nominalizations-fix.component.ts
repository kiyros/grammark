import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { NominalizationsService } from '../../../services/nominalizations.service';

@Component({
  selector: 'app-nominalizations-fix',
  templateUrl: './nominalizations-fix.component.html',
  styleUrls: ['./nominalizations-fix.component.css']
})
export class NominalizationsFixComponent implements OnInit {

  title = 'Nominalizations-Fix';

  message: string;
  totalSentences: number;

  // Nominalizations
  nominalizationsNumber: number;
  nominalizationsTable: any;
  nominalizationsUserTable: any;
  nominalizationsAlertColor: string;
  nominalizationsFeedback: string;
  nominalizationsScore: number;

  constructor(private data: DataService,
              private nominalizations: NominalizationsService) { }

  startOverClick(): void {
    this.data.changeMessage('');
  }

  reHighlight(): void {
    // Reset
    this.data.changeTotalSentences(0);
    this.nominalizations.changeNominalizationsNumber(0);

    //
    this.nominalizationsUserTable = { find: [], suggestion: [] };

    // variables
    // tslint:disable-next-line: prefer-const
    let userText = (document.getElementById('userinput') as HTMLTextAreaElement).value;
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
    }
    else if (aLetter === false) {
      alert('Please enter at least one letter');
    }
    else {
      this.data.changeMessage(userText);

      // Find total sentences in text
      for (let i = 0; i < userText.length; i++) {
        if (userText.charAt(i) === '.' || userText.charAt(i) === '!' || userText.charAt(i) === '?') {
          this.data.changeTotalSentences(this.totalSentences + 1);
        }
      }

      // fixes
      this.nominalizationsFix(userText);
    }
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.data.currentTotalSentences.subscribe(totalSentences => this.totalSentences = totalSentences);

    this.nominalizationsService();
  }

  nominalizationsFix(userText: string) {
    let word;
    word="";
    let wordCounter = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < userText.length; i++) {

      if(/[a-zA-Z]/.test(userText[i]) || userText[i] === '\’' || userText[i] === '\'') {
        word += userText[i];
      }
      else {
        for (const fix in this.nominalizationsTable) {
          if (word.length > 7 && word.includes(fix)) {
            this.nominalizationsUserTable.find.push("• " + word);
            this.nominalizations.changeNominalizationsNumber(this.nominalizationsNumber + 1);
          }
        }
        word = "";
        wordCounter++;
      }
    }
    this.nominalizationsScore = (this.nominalizationsNumber / wordCounter) * 100;
    try {
      if (this.nominalizationsScore <= 6) {
        this.nominalizationsFeedback = "Rock on. Your writing has a reasonable number of \"nominalized\" word forms, highlighted below. You probably don't need to reduce these any further.";
        this.nominalizationsAlertColor = "green";
      }
      else {
        this.nominalizationsFeedback = "Most of the words below are perfectly acceptable. However, you use many of these \"nominalized\" (non root-form) words. They bog down writing and decrease readability.";
        this.nominalizationsAlertColor = "red";
      }
    }
    catch(e) {
      this.nominalizationsFeedback = "Make sure you enter at least one sentence.";
      this.nominalizationsAlertColor = "orange";
      this.nominalizationsScore = 0;
    }
    this.nominalizations.changeNominalizationsFeedback(this.nominalizationsFeedback);
    this.nominalizations.changeNominalizationsScore(Math.round(this.nominalizationsScore));
    this.nominalizations.changeNominalizationsAlertColor(this.nominalizationsAlertColor);
  }

  nominalizationsService() {
    this.nominalizations.currentNominalizationsAlertColor.subscribe(nominalizationsAlertColor => this.nominalizationsAlertColor = nominalizationsAlertColor);
    this.nominalizations.currentNominalizationsFeedback.subscribe(nominalizationsFeedback => this.nominalizationsFeedback = nominalizationsFeedback);
    this.nominalizations.currentNominalizationsScore.subscribe(nominalizationsScore => this.nominalizationsScore = nominalizationsScore);
    this.nominalizations.currentNominalizationsNumber.subscribe(nominalizationsNumber => this.nominalizationsNumber = nominalizationsNumber);
    this.nominalizations.currentNominalizationsUserTable.subscribe(nominalizationsUserTable => this.nominalizationsUserTable = nominalizationsUserTable);
    this.nominalizations.currentNominalizationsTable.subscribe(nominalizationsTable => this.nominalizationsTable = nominalizationsTable);
  }
}
