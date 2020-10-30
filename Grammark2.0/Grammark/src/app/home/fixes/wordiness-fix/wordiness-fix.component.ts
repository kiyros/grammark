import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { WordinessService } from '../../../services/wordiness.service';

@Component({
  selector: 'app-wordiness-fix',
  templateUrl: './wordiness-fix.component.html',
  styleUrls: ['./wordiness-fix.component.css']
})
export class WordinessFixComponent implements OnInit {

  message: string;
  wordinessNumber: number;
  wordinessTable: any;
  wordinessUserTable: any;

  constructor(private data: DataService, private wordiness: WordinessService) { }

  reHighlight(): void {
    this.wordiness.changeWordinessNumber(0);

    this.wordinessUserTable = { find: [], suggestion: [] };

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

      for (const fix in this.wordinessTable) {

        if (userText.includes(fix)) {

          this.wordiness.changeWordinessNumber(this.wordinessNumber + 1);
          this.wordinessUserTable.find.push(fix);
          this.wordiness.changeWordinessUserTable(this.wordinessUserTable);
        }
      }
    }
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);

    this.wordiness.currentWordinessNumber.subscribe(wordinessNumber => this.wordinessNumber = wordinessNumber);
    this.wordiness.currentWordinessTable.subscribe(wordinessTable => this.wordinessTable = wordinessTable);
    this.wordiness.currentWordinessUserTable.subscribe(wordinessUserTable => this.wordinessUserTable = wordinessUserTable);
  }

}
