import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { SentencesService } from '../../../services/sentences.service';

@Component({
  selector: 'app-sentences-fix',
  templateUrl: './sentences-fix.component.html',
  styleUrls: ['./sentences-fix.component.css']
})
export class SentencesFixComponent implements OnInit {

  title = 'Sentences-Fix';

  message: string;
  totalSentences: number;

  // Sentences
  sentencesNumber: number;
  sentencesTable: any;
  sentencesUserTable: any;
  sentencesAlertColor: string;
  sentencesFeedback = ' ';
  sentencesScore: number;

  constructor(private data: DataService,
    private sentences: SentencesService) { }

  startOverClick(): void {
    this.data.changeMessage('');
  }

  reHighlight(): void {
    // Reset
    this.data.changeTotalSentences(0);
    this.sentences.changeSentencesNumber(0);

    // Clear
    this.sentencesUserTable = { find: [], suggestion: [] };

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
      this.sentencesFix(userText);
    }
  }
  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.data.currentTotalSentences.subscribe(totalSentences => this.totalSentences = totalSentences);

    this.sentencesService();
  }

  sentencesFix(userText: string) {
    let word;
    word = '';
    let sentence;
    sentence = '';
    let sentence2;
    sentence2 = '';
    let errorFound = false;
    let wordCounter = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < userText.length; i++) {
      if (/[a-zA-Z]/.test(userText[i]) || userText[i] === '\’' || userText[i] === '\'') {
        word += userText[i];
      }
      else {
        for (const fix in this.sentencesTable) {
          if (word.includes(fix)) {
            sentence += word;
            errorFound = true;
          }
        }
        word = '';
        wordCounter++;
      }
      // Sentence Fragment
      if (errorFound === true) {
        if (/[a-zA-Z]/.test(userText[i]) || userText[i] === '\’' || userText[i] === '\'' || userText[i] === ' ') {
          sentence += userText[i];
        }
        else {
          this.sentences.changeSentencesNumber(this.sentencesNumber + 1);
          this.sentencesUserTable.find.push("• Potential Fragment → \"" + sentence + "...\"");
          errorFound = false;
          sentence = '';
        }
      }
      // Sentence length
      if (userText[i] === '!' || userText[i] === '?' || userText[i] === '.') {
        if (wordCounter > 50) {
          this.sentences.changeSentencesNumber(this.sentencesNumber + 1);
          this.sentencesUserTable.find.push("• Long Sentence → \"" + sentence2 + "...\"");
        }
        sentence2 = '';
        wordCounter = 0;
      }
      else {
        sentence2 += userText[i];
      }
    }
    this.sentencesScore = (this.sentencesNumber / this.totalSentences) * 100;
    try {
      if (this.sentencesScore > 2) {
        this.sentencesFeedback = "Hmmm. Your writing may have some sentence-level issues. Check the list below for potential fragments or run-ons.";
        this.sentencesAlertColor = "red";
      }
      else {
        this.sentencesFeedback = "Bueno! Your sentences don't show any glaring errors.";
        this.sentencesAlertColor = "green";
      }
    }
    catch(e) {
      this.sentencesFeedback = "Make sure you enter at least one sentence.";
      this.sentencesAlertColor = "orange";
      this.sentencesScore = 0;
    }
    this.sentences.changeSentencesFeedback(this.sentencesFeedback);
    this.sentences.changeSentencesScore(Math.round(this.sentencesScore));
    this.sentences.changeSentencesAlertColor(this.sentencesAlertColor);
  }

  sentencesService() {
    this.sentences.currentSentencesNumber.subscribe(sentencesNumber => this.sentencesNumber = sentencesNumber);
    this.sentences.currentSentencesTable.subscribe(sentencesTable => this.sentencesTable = sentencesTable);
    this.sentences.currentSentencesUserTable.subscribe(sentencesUserTable => this.sentencesUserTable = sentencesUserTable);
    this.sentences.currentSentencesAlertColor.subscribe(sentencesAlertColor => this.sentencesAlertColor = sentencesAlertColor);
    this.sentences.currentSentencesFeedback.subscribe(sentencesFeedback => this.sentencesFeedback = sentencesFeedback);
    this.sentences.currentSentencesScore.subscribe(sentencesScore => this.sentencesScore = sentencesScore);
  }
}

