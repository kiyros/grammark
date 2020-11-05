import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { GrammarService} from '../../../services/grammar.service';

@Component({
  selector: 'app-grammar-fix',
  templateUrl: './grammar-fix.component.html',
  styleUrls: ['./grammar-fix.component.css']
})
export class GrammarFixComponent implements OnInit {

  title = 'Grammar-Fix';

  // var
  message: string;
  grammarFeedback: string = " ";
  totalGrammar: number;
  grammarTable: any;
  grammarUserTable: any;
  grammarAlertColor: any;

  constructor(private data: DataService, private grammar: GrammarService) { }

  reHighlight(): void {

    // Reset every time you hit re-highlight
    this.grammar.resetGrammarFix();

    // Clear -- Reset
    this.grammarUserTable = { find: [], suggestion: [] };

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

          //find grammar traps in user text
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

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
    //result color 
    this.grammar.currentGrammarAlertColor.subscribe(grammarAlertColor => this.grammarAlertColor = grammarAlertColor);

    //Feedback
    this.grammar.currentGrammarFeedback.subscribe(grammarFeedback => this.grammarFeedback = grammarFeedback);

    // Total grammar traps in user's writting 
    this.grammar.currentTotalGrammar.subscribe(totalGrammar => this.totalGrammar = totalGrammar);

    // Grammar Table of all grammar
    this.grammar.currentGrammarTable.subscribe(grammarTable => this.grammarTable = grammarTable);

    // Grammar Table of Current User Errors in Text 
    this.grammar.currentGrammarUserTable.subscribe(grammarUserTable => this.grammarUserTable = grammarUserTable);
  }

}
