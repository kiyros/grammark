import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { EggcornService} from '../../../services/eggcorns.service';
@Component({
  selector: 'app-eggcorns-fix',
  templateUrl: './eggcorns-fix.component.html',
  styleUrls: ['./eggcorns-fix.component.css']
})
export class EggcornsFixComponent implements OnInit {

    title = 'Eggcorns-Fix';
  
    // var
    message: string;
    eggcornsFeedback: string = " ";
    eggcornsScore: number;
    totalSentences: number;
    totalEggcorns: number;
    eggcornsTable: any;
    eggcornsUserTable: any;
    eggcornsAlertColor: any;
    
    
  
    constructor(private data: DataService, private eggcorns: EggcornService) { }
  
    reHighlight(): void {
  
      // Reset every time you hit re-highlight
      this.eggcorns.resetEggcornFix();
  
      // Clear -- Reset
      this.eggcornsUserTable = { find: [], suggestion: [] };
  
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
  
            //find eggcorn in user text
            for (const fix in this.eggcornsTable) {
                // changing user text to lower Case to match with eggcornsTable
                if (userText.toLocaleLowerCase().includes(fix)) {
                  this.totalEggcorns ++;
                  this.eggcorns.changeTotalEggcorns(this.totalEggcorns);
  
                  // add eggcorn in user text into an array 
                  this.eggcornsUserTable.find.push(fix);
                  this.eggcornsUserTable.suggestion.push(this.eggcornsUserTable[fix]);
                  this.eggcorns.changeEggcornsUserTable(this.eggcornsUserTable);
                }
            }
            //find total sentences in user text 
              for (let i = 0; i < userText.length; i++) { 
                if(userText.charAt(i)=== "." || userText.charAt(i)=== "!"|| userText.charAt(i)=== "?"){
                  this.totalSentences ++;
                  this.eggcorns.changeTotalSentences(this.totalSentences);
                } 
              }
            //calcutale score
            this.eggcornsScore = (this.totalEggcorns/this.totalSentences)*100;
            if (isNaN(this.eggcornsScore) || this.eggcornsScore === Infinity) {
              this.eggcornsScore= 0;
            }
            // round to whole number
            this.eggcorns.changeEggcornsScore(Math.round(this.eggcornsScore));
            // this.eggcorns.changeeggcornsScore(this.eggcornsScore);
            if(this.eggcornsScore == 0 ){
              this.eggcornsAlertColor = "green";
              this.eggcornsFeedback = "Great job Your writing seems to have no Eggcorns";
            }else if (this.eggcornsScore <= 5){
              this.eggcornsFeedback = " Good job the number of Eggcorns words in your writing seems low";
              this.eggcornsAlertColor = "orange";
            }else if(this.eggcornsScore <= 10){
              this.eggcornsFeedback = "Your writing seems to have alot of eggcorns";
              this.eggcornsAlertColor = "red";
            }else{
              this.eggcornsFeedback ="Your writing seems to have a many eggcorns. Make sure you\'re not using eggcorns";
              this.eggcornsAlertColor = "red";
            }
            this.eggcorns.changeEggcornsFeedback(this.eggcornsFeedback);
            this.eggcorns.changeEggcornsAlertColor(this.eggcornsAlertColor);
            }
    }
  
    ngOnInit(): void {
      this.data.currentMessage.subscribe(message => this.message = message);
      //result color 
      this.eggcorns.currentEggcornsAlertColor.subscribe(eggcornsAlertColor => this.eggcornsAlertColor = eggcornsAlertColor);
  
      //Feedback
      this.eggcorns.currentEggcornsFeedback.subscribe(eggcornsFeedback => this.eggcornsFeedback = eggcornsFeedback);
  
      // eggcorns score
      this.eggcorns.currentEggcornsScore.subscribe(eggcornsScore => this.eggcornsScore = eggcornsScore);
  
      // Total number of sentences in the user input
      this.eggcorns.currentTotalSentences.subscribe(totalSentences => this.totalSentences = totalSentences);
  
      // Total number of eggcorns in the user input
      this.eggcorns.currentTotalEggcorns.subscribe(totalEggcorns => this.totalEggcorns = totalEggcorns);
  
      // eggcorn Table of all eggcorns
      this.eggcorns.currentEggcornsTable.subscribe(eggcornsTable => this.eggcornsTable = eggcornsTable);
  
      // eggcorn Table of Current User Errors in Text 
      this.eggcorns.currentEggcornsUserTable.subscribe(EggcornsUserTable => this.eggcornsUserTable = EggcornsUserTable);
    } 
  }
  
