import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { GrammarService } from '../../../services/grammar.service';
import { NominalizationsService } from '../../../services/nominalizations.service';
import { PassivevoiceService } from '../../../services/passivevoice.service';
import { WordinessService } from '../../../services/wordiness.service';
import { SentencesService } from '../../../services/sentences.service';
import { TransitionsService } from '../../../services/transitions.service';
import { AcademicStyleService } from '../../../services/academicstyle.service';
import { EggcornService } from '../../../services/eggcorns.service';

@Component({
  selector: 'app-grammar-fix',
  templateUrl: './grammar-fix.component.html',
  styleUrls: ['./grammar-fix.component.css']
})
export class GrammarFixComponent implements OnInit {

  title = 'Grammar-Fix';

  // Global global
  message: string;
  grade: number;
  gradeAlertColor: string;
  gradeFeedback: string;
  totalSentences: number;

  // Grammar
  grammarFeedback: string = " ";
  totalGrammar: number;
  grammarTable: any;
  grammarUserTable: any;
  grammarAlertColor: any;
  grammarScore: number;

  // Academic Style
  academicStyleFeedback: string = " ";
  academicStyleScore: number;
  totalNonAcademic: number;
  academicStyleTable: any;
  academicStyleUserTable: any;
  academicStyleAlertColor: any;

  // Eggcorns
  eggcornsFeedback: string = " ";
  eggcornsScore: number;
  totalEggcorns: number;
  eggcornsTable: any;
  eggcornsUserTable: any;
  eggcornsAlertColor: any;

  // Nominalizations
  nominalizationsNumber: number;
  nominalizationsTable: any;
  nominalizationsUserTable: any;
  nominalizationsAlertColor: string;
  nominalizationsFeedback: string;
  nominalizationsScore: number;

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

  // Sentences
  sentencesNumber: number;
  sentencesTable: any;
  sentencesUserTable: any;
  sentencesAlertColor: string;
  sentencesFeedback = ' ';
  sentencesScore: number;

  // Transitions
  transitionsFeedback: string = " ";
  transitionsScore: number;
  totalTransitions: number;
  transitionsTable: any;
  transitionsUserTable: any;
  transitionsAlertColor: any;

  constructor(private data: DataService,
              private grammar: GrammarService,
              private academic: AcademicStyleService,
              private eggcorns: EggcornService,
              private nominalizations: NominalizationsService,
              private passivevoice: PassivevoiceService,
              private wordiness: WordinessService,
              private sentences: SentencesService,
              private transitions: TransitionsService) { }

  startOverClick(): void {
    this.data.changeMessage('');
  }

  reHighlight(): void {

    // Reset every time you hit re-highlight
    this.data.changeTotalSentences(0);
    this.data.changeGrade(0);
    this.grammar.changeTotalGrammar(0);
    this.passivevoice.changePassiveVoiceNumber(0);
    this.wordiness.changeWordinessNumber(0);
    this.transitions.changeTotalTransitions(0);
    this.academic.changeTotalNonAcademic(0);
    this.eggcorns.changeTotalEggcorns(0);
    this.nominalizations.changeNominalizationsNumber(0);
    this.sentences.changeSentencesNumber(0);

    // Clear -- Reset
    this.grammarUserTable = { find: [], suggestion: [] };
    this.passiveVoiceUserTable = { find: [], suggestion: [] };
    this.wordinessUserTable = { find: [], suggestion: [] };
    this.transitionsUserTable = { find: [], suggestion: [] };
    this.eggcornsUserTable = { find: [], suggestion: [] };
    this.academicStyleUserTable = { find: [], suggestion: [] };
    this.nominalizationsUserTable = { find: [], suggestion: [] };
    this.sentencesUserTable = { find: [], suggestion: [] };

    // variables
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
      this.grammarFix(userText);
      this.passiveVoiceFix(userText);
      this.wordinessFix(userText);
      this.transitionsFix(userText);
      this.eggcornsFix(userText);
      this.academicStyleFix(userText);
      this.nominalizationsFix(userText);
      this.sentencesFix(userText);
      // calculate grade
      this.calculateGrade();
    }
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.data.currentTotalSentences.subscribe(totalSentences => this.totalSentences = totalSentences);
    this.data.currentTotalSentences.subscribe(totalSentences => this.totalSentences = totalSentences);
    this.data.currentGradeAlertColor.subscribe(gradeAlertColor => this.gradeAlertColor = gradeAlertColor);
    this.data.currentGradeFeedback.subscribe(gradeFeedback => this.gradeFeedback = gradeFeedback);

    // Services
    this.grammarService();
    this.academicStyleService();
    this.eggcornnsService();
    this.nominalizationsService();
    this.wordinessService();
    this.passiveVoiceService();
    this.sentencesService();
    this.transitionsService();
  }

  calculateGrade() {
    // Because transitions Score is 10% or more, this uses a different formula
    let tScore = 0;
    if (this.transitionsScore >= 10) {
      tScore = 0;
    }
    else {
      tScore = 10 - this.transitionsScore;
    }

    this.grade = 100 - (
                 Math.round((this.passiveVoiceScore    / 10) * 10 ) / 10 +
                 Math.round((this.wordinessScore       /  2) * 10 ) / 10 +
                 Math.round((this.academicStyleScore   /  1) * 10 ) / 10 +
                 Math.round((this.grammarScore         /  1) * 10 ) / 10 +
                 Math.round((this.nominalizationsScore /  6) * 10 ) / 10 +
                 Math.round((this.sentencesScore       /  2) * 10 ) / 10 +
                 Math.round((this.eggcornsScore        /  1) * 10 ) / 10 +
                 Math.round((tScore                        ) * 10 ) / 10);

    if (this.totalSentences <= 4) {
      this.grade = 0;
      this.gradeFeedback = 'You must enter at least 5 sentences to get a grade';
      this.gradeAlertColor = 'red';
    }
    else {
      if (this.grade < 70) {
        this.gradeFeedback = 'Your writing seems to have many grammar errors';
        this.gradeAlertColor = 'red';
      }
      else if (this.grade < 80) {
        this.gradeFeedback = 'Your writing seems to have a lot of grammar errors';
        this.gradeAlertColor = 'orange';
      }
      else if (this.grade < 90) {
        this.gradeFeedback = 'Good Job! The number of grammar errors seems low';
        this.gradeAlertColor = 'orange';
      }
      else {
        this.gradeFeedback = 'Great Job!';
        this.gradeAlertColor = 'green';
      }
    }

    this.data.changeGrade(this.grade);
    this.data.changeGradeAlertColor(this.gradeAlertColor);
    this.data.changeGradeFeedback(this.gradeFeedback);
  }

  academicStyleFix(userText: string) {
    //find non academic word in user text
    for (const fix in this.academicStyleTable) {
      if (userText.includes(fix)) {
        this.academic.changeTotalNonAcademic(this.totalNonAcademic + 1);
        this.academicStyleUserTable.find.push("• " + fix + " ⟶ " + this.academicStyleTable[fix]);
        this.academic.changeAcademicStyleUserTable(this.academicStyleUserTable);
        // this.academicStyleUserTable.suggestion.push("→ " + this.academicStyleTable[fix]);
      }
    }
    let word;
    word = "";
    let wordCounter = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < userText.length; i++) {
      if(/[a-zA-Z]/.test(userText[i]) || userText[i] === '\’' || userText[i] === '\'') {
        word += userText[i];
      }
      else {
        word = "";
        wordCounter++;
      }
    }
    //calculate academic style score
    this.academicStyleScore = (this.totalNonAcademic / wordCounter) * 100;
    if (isNaN(this.academicStyleScore) || this.academicStyleScore === Infinity) {
      this.academicStyleScore= 0;
    }
    try {
      if (this.academicStyleScore > 1) {
        this.academicStyleAlertColor = "red";
        this.academicStyleFeedback = "Your writing may contain language that is either too casual or too extreme for academic discourse.";
      }
      else {
        this.academicStyleAlertColor = "green";
        this.academicStyleFeedback = "Your writing has a low percentage of casual and/or extreme language. This makes it more acceptable for academic style.";
      }
      if (this.totalSentences === 0) {
        throw new Error("");
      }
    }
    catch(e) {
      this.academicStyleFeedback = "Make sure you enter at least one sentence.";
      this.academicStyleAlertColor = "orange";
      this.academicStyleScore = 0;
    }
    if (isNaN(this.academicStyleScore) || this.academicStyleScore === Infinity) {
      this.academicStyleScore= 0;
    }
    this.academic.changeAcademicStyleScore(Math.round(this.academicStyleScore * 10) / 10);
    this.academic.changeAcademicStyleFeedback(this.academicStyleFeedback);
    this.academic.changeAcademicStyleAlertColor(this.academicStyleAlertColor);
  }

  academicStyleService() {
    //result color
    this.academic.currentAcademicStyleAlertColor.subscribe(academicStyleAlertColor => this.academicStyleAlertColor = academicStyleAlertColor);
    //Feedback
    this.academic.currentAcademicStyleFeedback.subscribe(academicStyleFeedback => this.academicStyleFeedback = academicStyleFeedback);
    // Total number of sentences in the user input
    // this.academic.currentTotalSentences.subscribe(totalSentences => this.sentences = totalSentences);
    // Total number of non academic style instances in the user input
    this.academic.currentTotalNonAcademic.subscribe(totalNonAcademic => this.totalNonAcademic = totalNonAcademic);
    // academic style table
    this.academic.currentAcademicStyleTable.subscribe(academicStyleTable => this.academicStyleTable = academicStyleTable);
    // non academic style table of Current User Errors in Text
    this.academic.currentAcademicStyleUserTable.subscribe(academicStyleUserTable => this.academicStyleUserTable = academicStyleUserTable);
    // non academic style score
    this.academic.currentAcademicStyleScore.subscribe(academicStyleScore => this.academicStyleScore = academicStyleScore);
  }

  eggcornsFix(userText: string) {
    for (const fix in this.eggcornsTable) {
      if (userText.toLocaleLowerCase().includes(fix)) {
        this.eggcorns.changeTotalEggcorns(this.totalEggcorns + 1);
        this.eggcornsUserTable.find.push("• " + fix + " ⟶ " + this.eggcornsTable[fix]);
        // this.eggcornsUserTable.suggestion.push(" ⟶ " + this.eggcornsTable[fix]);
        this.eggcorns.changeEggcornsUserTable(this.eggcornsUserTable);
      }
    }
    this.eggcornsScore = (this.totalEggcorns / this.totalSentences) * 100;
    if (isNaN(this.eggcornsScore) || this.eggcornsScore === Infinity) {
      this.eggcornsScore= 0;
    }
    try {
      if (this.eggcornsScore == 0) {
        this.eggcornsAlertColor = "green";
        this.eggcornsFeedback = "Great job! Your writing seems to have no Eggcorns.";
      }
      else if (this.eggcornsScore <= 5) {
        this.eggcornsFeedback = " Good job, the number of Eggcorns words in your writing seems low";
        this.eggcornsAlertColor = "orange";
      }
      else if (this.eggcornsScore <= 10) {
        this.eggcornsFeedback = "Your writing seems to have a lot of eggcorns";
        this.eggcornsAlertColor = "red";
      }
      else {
        this.eggcornsFeedback = "Your writing seems to have a many eggcorns. Make sure you\'re not using eggcorns";
        this.eggcornsAlertColor = "red";
      }
      if (this.totalSentences === 0) {
        throw new Error("");
      }
    }
    catch(e) {
      this.eggcornsFeedback = "Make sure you enter at least one sentence.";
      this.eggcornsAlertColor = "orange";
      this.eggcornsScore = 0;
    }
    this.eggcorns.changeEggcornsScore(Math.round(this.eggcornsScore * 10) / 10);
    this.eggcorns.changeEggcornsFeedback(this.eggcornsFeedback);
    this.eggcorns.changeEggcornsAlertColor(this.eggcornsAlertColor);
  }

  eggcornnsService() {
    this.eggcorns.currentEggcornsAlertColor.subscribe(eggcornsAlertColor => this.eggcornsAlertColor = eggcornsAlertColor);
    this.eggcorns.currentEggcornsFeedback.subscribe(eggcornsFeedback => this.eggcornsFeedback = eggcornsFeedback);
    this.eggcorns.currentEggcornsScore.subscribe(eggcornsScore => this.eggcornsScore = eggcornsScore);
    this.eggcorns.currentTotalEggcorns.subscribe(totalEggcorns => this.totalEggcorns = totalEggcorns);
    this.eggcorns.currentEggcornsTable.subscribe(eggcornsTable => this.eggcornsTable = eggcornsTable);
    this.eggcorns.currentEggcornsUserTable.subscribe(eggcornsUserTable => this.eggcornsUserTable = eggcornsUserTable);
  }

  grammarFix(userText: string) {
    // find grammar traps in user text
    for (const fix in this.grammarTable) {
      // changing user text to lower Case to match with grammarTable
      if (userText.toLocaleLowerCase().includes(fix)) {
        this.grammar.changeTotalGrammar(this.totalGrammar + 1);
        this.grammarUserTable.find.push("• " + fix + " ⟶ " + this.grammarTable[fix]);
        // this.grammarUserTable.suggestion.push(" ⟶ " + this.grammarTable[fix]);
        this.grammar.changeGrammarUserTable(this.grammarUserTable);
      }
    }
    this.grammarScore = (this.totalGrammar / this.totalSentences) * 100;
    if (isNaN(this.grammarScore)|| this.grammarScore === Infinity) {
      this.grammarScore = 0;
    }
    try {
      if (this.totalGrammar == 0) {
        this.grammarAlertColor = "green";
        this.grammarFeedback = "Woohoo! We didn't find any obvious grammark errors. However, " +
          "beware: Grammark does not check for fragments, comma splices, subject-verb errors, " +
          "number and pronoun problems. What's the best way to find grammar errors? Read your writing aloud.";
      }
      else if (this.totalGrammar > 0) {
        this.grammarAlertColor = "red";
        this.grammarFeedback = "Your writing includes words or phrases usually considered to be grammar errors.";
      }
      if (this.totalSentences === 0) {
        throw new Error("");
      }
    }
    catch(e) {
      this.grammarFeedback = "Make sure you enter at least one sentence.";
      this.grammarAlertColor = "orange";
      this.grammarScore = 0;
    }
    this.grammar.changeGrammarScore(Math.round(this.grammarScore * 10) / 10);
    this.grammar.changeGrammarFeedback(this.grammarFeedback);
    this.grammar.changeGrammarAlertColor(this.grammarAlertColor);
  }

  grammarService() {
    this.grammar.currentGrammarAlertColor.subscribe(grammarAlertColor => this.grammarAlertColor = grammarAlertColor);
    this.grammar.currentGrammarFeedback.subscribe(grammarFeedback => this.grammarFeedback = grammarFeedback);
    this.grammar.currentTotalGrammar.subscribe(totalGrammar => this.totalGrammar = totalGrammar);
    this.grammar.currentGrammarTable.subscribe(grammarTable => this.grammarTable = grammarTable);
    this.grammar.currentGrammarUserTable.subscribe(grammarUserTable => this.grammarUserTable = grammarUserTable);
    this.grammar.currentGrammarScore.subscribe(grammarScore => this.grammarScore = grammarScore);
  }

  // tslint:disable-next-line: typedef
  nominalizationsFix(userText: string) {
    let word;
    word = '';
    let wordCounter = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < userText.length; i++) {

      if(/[a-zA-Z]/.test(userText[i]) || userText[i] === '\’' || userText[i] === '\'') {
        word += userText[i];
      }
      else {
        for (const fix in this.nominalizationsTable) {
          if (word.length > 7 && word.includes(fix)) {
            this.nominalizationsUserTable.find.push('• ' + word + ' ⟶ ' + this.nominalizationsTable[fix]);
            this.nominalizations.changeNominalizationsNumber(this.nominalizationsNumber + 1);
            this.nominalizations.changeNominalizationsUserTable(this.nominalizationsUserTable);
          }
        }
        word = "";
        wordCounter++;
      }
    }
    this.nominalizationsScore = (this.nominalizationsNumber / wordCounter) * 100;
    if (isNaN(this.nominalizationsScore) || this.nominalizationsScore === Infinity) {
      this.nominalizationsScore = 0;
    }
    try {
      if (this.nominalizationsScore <= 6) {
        this.nominalizationsFeedback = 'Rock on. Your writing has a reasonable number of "nominalized" word forms, highlighted below. You probably don\'t need to reduce these any further.';
        this.nominalizationsAlertColor = 'green';
      }
      else {
        this.nominalizationsFeedback = 'Most of the words below are perfectly acceptable. However, you use many of these "nominalized" (non root-form) words. They bog down writing and decrease readability.';
        this.nominalizationsAlertColor = 'red';
      }
      if (this.totalSentences === 0) {
        throw new Error('');
      }
    }
    catch(e) {
      this.nominalizationsFeedback = 'Make sure you enter at least one sentence.';
      this.nominalizationsAlertColor = 'orange';
      this.nominalizationsScore = 0;
    }
    this.nominalizations.changeNominalizationsFeedback(this.nominalizationsFeedback);
    this.nominalizations.changeNominalizationsScore(Math.round(this.nominalizationsScore * 10) / 10);
    this.nominalizations.changeNominalizationsAlertColor(this.nominalizationsAlertColor);
  }

  // tslint:disable-next-line: typedef
  nominalizationsService() {
    // tslint:disable-next-line: max-line-length
    this.nominalizations.currentNominalizationsAlertColor.subscribe(nominalizationsAlertColor => this.nominalizationsAlertColor = nominalizationsAlertColor);
    // tslint:disable-next-line: max-line-length
    this.nominalizations.currentNominalizationsFeedback.subscribe(nominalizationsFeedback => this.nominalizationsFeedback = nominalizationsFeedback);
    this.nominalizations.currentNominalizationsScore.subscribe(nominalizationsScore => this.nominalizationsScore = nominalizationsScore);
    // tslint:disable-next-line: max-line-length
    this.nominalizations.currentNominalizationsNumber.subscribe(nominalizationsNumber => this.nominalizationsNumber = nominalizationsNumber);
    // tslint:disable-next-line: max-line-length
    this.nominalizations.currentNominalizationsUserTable.subscribe(nominalizationsUserTable => this.nominalizationsUserTable = nominalizationsUserTable);
    this.nominalizations.currentNominalizationsTable.subscribe(nominalizationsTable => this.nominalizationsTable = nominalizationsTable);
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
          this.passiveVoiceUserTable.find.push("• " + compareString + " ⟶ " + this.passiveVoiceTable[fix]);
          // this.passiveVoiceUserTable.suggestion.push(" ⟶ " + this.passiveVoiceTable[fix]);
          this.passivevoice.changePassiveVoiceUserTable(this.passiveVoiceUserTable);
        }
      }
    }
    this.passiveVoiceScore = (this.passiveVoiceNumber / this.totalSentences) * 100;
    if (isNaN(this.passiveVoiceScore) || this.passiveVoiceScore === Infinity) {
      this.passiveVoiceScore = 0;
    }
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
    this.passivevoice.changePassiveVoiceScore(Math.round(this.passiveVoiceScore * 10) / 10);
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
    this.wordiness.changeWordinessScore(Math.round(this.wordinessScore * 10) / 10);
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

  // tslint:disable-next-line: typedef
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
          this.sentencesUserTable.find.push('• Potential Fragment ⟶ "' + sentence + '..."');
          this.sentences.changeSentencesUserTable(this.sentencesUserTable);
          errorFound = false;
          sentence = '';
        }
      }
      // Sentence length
      if (userText[i] === '!' || userText[i] === '?' || userText[i] === '.') {
        if (wordCounter > 50) {
          this.sentences.changeSentencesNumber(this.sentencesNumber + 1);
          this.sentencesUserTable.find.push('• Long Sentence ⟶ "' + sentence2 + '..."');
          this.sentences.changeSentencesUserTable(this.sentencesUserTable);
        }
        sentence2 = '';
        wordCounter = 0;
      }
      else {
        sentence2 += userText[i];
      }
    }
    this.sentencesScore = (this.sentencesNumber / this.totalSentences) * 100;
    if (this.sentencesScore === NaN || this.sentencesScore === Infinity) {
      this.sentencesScore = 0;
    }
    try {
      if (this.sentencesScore > 2) {
        this.sentencesFeedback = 'Hmmm. Your writing may have some sentence-level issues. Check the list below for potential fragments or run-ons.';
        this.sentencesAlertColor = 'red';
      }
      else {
        this.sentencesFeedback = 'Bueno! Your sentences don\'t show any glaring errors.';
        this.sentencesAlertColor = 'green';
      }
      if (this.totalSentences === 0) {
        throw new Error('');
      }
    }
    catch(e) {
      this.sentencesFeedback = 'Make sure you enter at least one sentence.';
      this.sentencesAlertColor = 'orange';
      this.sentencesScore = 0;
    }
    this.sentences.changeSentencesFeedback(this.sentencesFeedback);
    this.sentences.changeSentencesScore(Math.round(this.sentencesScore * 10) / 10);
    this.sentences.changeSentencesAlertColor(this.sentencesAlertColor);
  }

  // tslint:disable-next-line: typedef
  sentencesService() {
    this.sentences.currentSentencesNumber.subscribe(sentencesNumber => this.sentencesNumber = sentencesNumber);
    this.sentences.currentSentencesTable.subscribe(sentencesTable => this.sentencesTable = sentencesTable);
    this.sentences.currentSentencesUserTable.subscribe(sentencesUserTable => this.sentencesUserTable = sentencesUserTable);
    this.sentences.currentSentencesAlertColor.subscribe(sentencesAlertColor => this.sentencesAlertColor = sentencesAlertColor);
    this.sentences.currentSentencesFeedback.subscribe(sentencesFeedback => this.sentencesFeedback = sentencesFeedback);
    this.sentences.currentSentencesScore.subscribe(sentencesScore => this.sentencesScore = sentencesScore);
  }

  transitionsFix(userText: string) {
    //find transition in user text
    for (const fix in this.transitionsTable) {
      // changing user text to lower Case to match with transitionsTable
      if (userText.toLocaleLowerCase().includes(fix)) {
        this.transitions.changeTotalTransitions(this.totalTransitions + 1);
        // add transition in user text into an array
        this.transitionsUserTable.find.push("• " + fix + " ⟶ " + this.transitionsTable[fix]);
        this.transitions.changeTransitionsUserTable(this.transitionsUserTable);
        // this.transitionsUserTable.suggestion.push(" ⟶ " + this.transitionsTable[fix]);
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
        this.transitionsAlertColor = "red";
        this.transitionsFeedback = "Your writing seems to have no transition word";
      }
      else if (this.transitionsScore <= 10) {
        this.transitionsFeedback = "The number of transition words in your writing seems low";
        this.transitionsAlertColor = "orange";
      }
      else if (this.transitionsScore <= 80) {
        this.transitionsFeedback = "Woot! Your writing seems to have a good proportion of transitions";
        this.transitionsAlertColor = "green";
      }
      else {
        this.transitionsFeedback = "Woot! Your writing seems to have a lot of transitions. Make sure you\'re not overusing transition words";
        this.transitionsAlertColor = "green";
      }
      if (this.totalSentences === 0) {
        throw new Error("");
      }
    }
    catch(e) {
      this.transitionsFeedback = "Make sure you enter at least one sentence.";
      this.transitionsAlertColor = "orange";
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
    this.transitions.changeTransitionsScore(Math.round(this.transitionsScore * 10) / 10);
    this.transitions.changeTransitionsFeedback(this.transitionsFeedback);
    this.transitions.changeTransitionsAlertColor(this.transitionsAlertColor);
  }

  transitionsService() {
    //result color
    this.transitions.currentTransitionsAlertColor.subscribe(transitionsAlertColor => this.transitionsAlertColor = transitionsAlertColor);
    //Feedback
    this.transitions.currentTransitionsFeedback.subscribe(transitionsFeedback => this.transitionsFeedback = transitionsFeedback);
    // Total number of sentences in the user input
    // this.transitions.currentTotalSentences.subscribe(totalSentences => this.totalSentences = totalSentences);
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
