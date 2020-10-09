import { stringify } from '@angular/compiler/src/util';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message: string;

  constructor(private router : Router, private data: DataService) { }

  submitClick() : void {
    // variables
    var str = ( < HTMLTextAreaElement > document.getElementById("userinput")).value;
    var letters = /^[A-Za-z]+$/;
    let aLetter = false;

    // This function checks if there is at least one letter inputed
    var validateChar = function() {
      if (/[a-zA-Z]/.test(str)) {
        aLetter = true;
      }
    }

    // calling function - checker
    validateChar();

    // alters! or proceed to overview
    if (str === '') {
      alert('Please fill out the text area');
    }
    else if (aLetter === false) {
      alert('Please enter at least one letter');
    }
    else {
      this.data.changeMessage(str);
      this.router.navigate(['home/overview']);
    }
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message)
  }

}
