import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { AcademicStyleService} from '../../../services/academicstyle.service';

@Component({
  selector: 'app-academic-style-fix',
  templateUrl: './academic-style-fix.component.html',
  styleUrls: ['./academic-style-fix.component.css']
})
export class AcademicStyleFixComponent implements OnInit {

  title = 'Academic-Style-Fix';

  // var
  message: string;
  nonAcademicStyleFeedback: string = " ";
  nonAcademicStyleScore: number;
  totalSentences: number;
  totalNonAcademic: number;
  nonAcademicStyleTable: any;
  nonAcademicStyleUserTable: any;
  nonAcademicStyleAlertColor: any;
  
  

  constructor(private data: DataService, private nonAcademicStyle: AcademicStyleService) { }

  reHighlight(): void {

    // Reset every time you hit re-highlight
    this.nonAcademicStyle.resetAcademicStyleFix();

    // Clear -- Reset
    this.nonAcademicStyleUserTable = { find: [], suggestion: [] };

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
          for (const fix in this.nonAcademicStyleTable) {
              // changing user text to lower Case to match with transitionsTable
              if (userText.includes(fix)) {
                this.nonAcademicStyle.changeTotalNonAcademic(this.totalNonAcademic + 1);

                // add transition in user text into an array 
                this.nonAcademicStyleUserTable.find.push(fix);
                this.nonAcademicStyle.changeNonAcademicStyleUserTable(this.nonAcademicStyleUserTable);
              }
          }
          //find total sentences in user text 
            for (let i = 0; i < userText.length; i++) { 
              if(userText.charAt(i)=== "." || userText.charAt(i)=== "!"|| userText.charAt(i)=== "?"){
                this.nonAcademicStyle.changeTotalSentences(this.totalSentences + 1);
              } 
            }
          //calcutale score
          this.nonAcademicStyleScore = (this.totalNonAcademic/this.totalSentences)*100;
          if(this.nonAcademicStyleScore === NaN || this.nonAcademicStyleScore === Infinity){
            this.nonAcademicStyleScore = 0;
          }
          // round to whole number
          this.nonAcademicStyle.changeNonAcademicStyleScore(Math.round(this.nonAcademicStyleScore));

          if(this.nonAcademicStyleScore != 0 ){
            this.nonAcademicStyleAlertColor = "green";
            this.nonAcademicStyleFeedback = "Your writing has a low percentage of casual and/or extreme language. This makes it more acceptable for academic style.";
          }else{
            this.nonAcademicStyleFeedback ="Your writing may contain language that is either too casual or too extreme for academic discourse.";
            this.nonAcademicStyleAlertColor = "red";
          }
          this.nonAcademicStyle.changeNonAcademicStyleFeedback(this.nonAcademicStyleFeedback);
          this.nonAcademicStyle.changeNonAcademicStyleAlertColor(this.nonAcademicStyleAlertColor);
    }
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
    //result color 
    this.nonAcademicStyle.currentNonAcademicStyleAlertColor.subscribe(nonAcademicStyleAlertColor => this.nonAcademicStyleAlertColor = nonAcademicStyleAlertColor);

    //Feedback
    this.nonAcademicStyle.currentNonAcademicStyleFeedback.subscribe(nonAcademicStyleFeedback => this.nonAcademicStyleFeedback = nonAcademicStyleFeedback);

    // Total number of sentences in the user input
    this.nonAcademicStyle.currentTotalSentences.subscribe(totalSentences => this.totalSentences = totalSentences);

    // Total number of non academic style instances in the user input
    this.nonAcademicStyle.currentTotalNonAcademic.subscribe(totalNonAcademic=> this.totalNonAcademic = totalNonAcademic);

    // academic style table
    this.nonAcademicStyle.currentNonAcademicStyleTable.subscribe(nonAcademicStyleTable => this.nonAcademicStyleTable = nonAcademicStyleTable);

    // non academic style table of Current User Errors in Text 
    this.nonAcademicStyle.currentNonAcademicStyleUserTable.subscribe(nonAcademicStyleUserTable => this.nonAcademicStyleUserTable = nonAcademicStyleUserTable);

    // non academic style score
    this.nonAcademicStyle.currentNonAcademicStyleScore.subscribe(nonAcademicStyleScore => this.nonAcademicStyleScore = nonAcademicStyleScore);
  } 
}
