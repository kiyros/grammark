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

  //variables
  message: string;
  academicStyleFeedback: string = " ";
  academicStyleScore: number;
  sentences: number;
  totalNonAcademic: number;
  academicStyleTable: any;
  academicStyleUserTable: any;
  academicStyleAlertColor: any;

  constructor(private data: DataService, private academic: AcademicStyleService) { }
  
  reHighlight(): void {
    
    // Reset every time you hit re-highlight
    this.academic.resetAcademicStyleFix();

    // Clear -- Reset
    this.academicStyleUserTable = { find: [], suggestion: [] };

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

    //find non academic word in user text
    for (const fix in this.academicStyleTable) {
      if (userText.includes(fix)) {
        this.academic.changeTotalNonAcademic(this.totalNonAcademic + 1);

        // add non academic word in user text into an array 
        this.academicStyleUserTable.find.push(fix);
        //this.academic.changeAcademicStyleUserTable(this.academicStyleUserTable);
        this.academicStyleUserTable.suggestion.push(this.academicStyleTable[fix]);
      }
    }
    //find total sentences in user text 
    for (let i = 0; i < userText.length; i++) { 
      if(userText.charAt(i)=== "." || userText.charAt(i)=== "!"|| userText.charAt(i)=== "?"){
        this.academic.changeTotalSentences(this.sentences + 1);
      } 
    }
    //calculate academic style score
    this.academicStyleScore = (this.totalNonAcademic/this.sentences)*100;
    if(this.academicStyleScore === NaN || this.academicStyleScore === Infinity){
      this.academicStyleScore = 0;
    }
    // round to whole number
    this.academic.changeAcademicStyleScore(Math.round(this.academicStyleScore));

    if(this.academicStyleScore >= 0 ){
      this.academicStyleAlertColor = "red";
      this.academicStyleFeedback = "Your writing may contain language that is either too casual or too extreme for academic discourse.";
    }
    else{
      this.academicStyleAlertColor = "green";
      this.academicStyleFeedback = "Your writing has a low percentage of casual and/or extreme language. This makes it more acceptable for academic style.";
    }
      this.academic.changeAcademicStyleFeedback(this.academicStyleFeedback);
      this.academic.changeAcademicStyleAlertColor(this.academicStyleAlertColor);
    }
}

ngOnInit(): void {
  
  this.data.currentMessage.subscribe(message => this.message = message);
  //result color 
  this.academic.currentAcademicStyleAlertColor.subscribe(academicStyleAlertColor => this.academicStyleAlertColor = academicStyleAlertColor);

  //Feedback
  this.academic.currentAcademicStyleFeedback.subscribe(academicStyleFeedback => this.academicStyleFeedback = academicStyleFeedback);

  // Total number of sentences in the user input
  this.academic.currentTotalSentences.subscribe(totalSentences => this.sentences = totalSentences);

  // Total number of non academic style instances in the user input
  this.academic.currentTotalNonAcademic.subscribe(totalNonAcademic=> this.totalNonAcademic = totalNonAcademic);

  // academic style table
  this.academic.currentAcademicStyleTable.subscribe(academicStyleTable => this.academicStyleTable = academicStyleTable);
  
  // non academic style table of Current User Errors in Text 
  this.academic.currentAcademicStyleUserTable.subscribe(academicStyleUserTable => this.academicStyleUserTable = academicStyleUserTable);

  // non academic style score
  this.academic.currentAcademicStyleScore.subscribe(academicStyleScore => this.academicStyleScore = academicStyleScore);
}

}
