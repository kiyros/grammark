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
  styleUrls: ['./grammar-fix.component.css'],
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
  grammarFeedback: string = ' ';
  totalGrammar: number;
  grammarTable: any;
  grammarUserTable: any;
  grammarAlertColor: any;
  grammarScore: number;

  constructor(
    private data: DataService,
    private grammar: GrammarService,
    private academic: AcademicStyleService,
    private eggcorns: EggcornService,
    private nominalizations: NominalizationsService,
    private passivevoice: PassivevoiceService,
    private wordiness: WordinessService,
    private sentences: SentencesService,
    private transitions: TransitionsService
  ) {}

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

    // variables
    // user text = paragraph from the html file
    let userText = this.getContent();
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

      // fixes
      this.grammarFix(userText);
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

    // Services
    this.grammarService();
  }
  grammarFix(userText: string) {
    // find grammar traps in user text
    for (const fix in this.grammarTable) {
      // changing user text to lower Case to match with grammarTable
      if (userText.toLocaleLowerCase().includes(fix)) {
        this.grammar.changeTotalGrammar(this.totalGrammar + 1);
        this.grammarUserTable.find.push(
          '• ' + fix + ' ⟶ ' + this.grammarTable[fix]
        );

        //highlight fix
        this.highlight(fix);
        // this.grammarUserTable.suggestion.push(" ⟶ " + this.grammarTable[fix]);
        this.grammar.changeGrammarUserTable(this.grammarUserTable);
      }
    }
    this.grammarScore = (this.totalGrammar / this.totalSentences) * 100;
    if (isNaN(this.grammarScore) || this.grammarScore === Infinity) {
      this.grammarScore = 0;
    }
    try {
      if (this.totalGrammar == 0) {
        this.grammarAlertColor = 'green';
        this.grammarFeedback =
          "Woohoo! We didn't find any obvious grammark errors. However, " +
          'beware: Grammark does not check for fragments, comma splices, subject-verb errors, ' +
          "number and pronoun problems. What's the best way to find grammar errors? Read your writing aloud.";
      } else if (this.totalGrammar > 0) {
        this.grammarAlertColor = 'red';
        this.grammarFeedback =
          'Your writing includes words or phrases usually considered to be grammar errors.';
      }
      if (this.totalSentences === 0) {
        throw new Error('');
      }
    } catch (e) {
      this.grammarFeedback = 'Make sure you enter at least one sentence.';
      this.grammarAlertColor = 'orange';
      this.grammarScore = 0;
    }
    this.grammar.changeGrammarScore(Math.round(this.grammarScore * 10) / 10);
    this.grammar.changeGrammarFeedback(this.grammarFeedback);
    this.grammar.changeGrammarAlertColor(this.grammarAlertColor);
  }

  grammarService() {
    this.grammar.currentGrammarAlertColor.subscribe(
      (grammarAlertColor) => (this.grammarAlertColor = grammarAlertColor)
    );
    this.grammar.currentGrammarFeedback.subscribe(
      (grammarFeedback) => (this.grammarFeedback = grammarFeedback)
    );
    this.grammar.currentTotalGrammar.subscribe(
      (totalGrammar) => (this.totalGrammar = totalGrammar)
    );
    this.grammar.currentGrammarTable.subscribe(
      (grammarTable) => (this.grammarTable = grammarTable)
    );
    this.grammar.currentGrammarUserTable.subscribe(
      (grammarUserTable) => (this.grammarUserTable = grammarUserTable)
    );
    this.grammar.currentGrammarScore.subscribe(
      (grammarScore) => (this.grammarScore = grammarScore)
    );
  }

  highlight(text) {
    //hold the message from the html textbox with id= userinput
    var paragraph = document.getElementById('userinput');

    //dynamic/custom regex expression -> only way to use variable inside regex
    let re = new RegExp(`\\b${text}\\b`, 'gi');

    //replace with -> span and highlight
    paragraph.innerHTML = paragraph.innerHTML.replace(
      re,
      '<span style="background-color: #FF6363; font-family: Georgia;" >' +
        text +
        ' </span>'
    );
  }
}
