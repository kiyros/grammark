import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { PassivevoiceService } from '../../services/passivevoice.service';
import { WordinessService } from '../../services/wordiness.service';
import { TransitionsService} from '../../services/transitions.service';
import { GrammarService} from '../../services/grammar.service';
import { AcademicStyleService} from '../../services/academicstyle.service';

import {EggcornService} from '../../services/eggcorns.service';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  // Vars
  message: string;
  grade: number;
  // Passive Voice
  passiveVoiceNumber: number;
  passiveVoiceScore: number;
  // Wordiness
  wordinessNumber: number;
  wordinessScore: number;
  //academic style
  nonAcademicStyleScore: number;
  totalNonAcademic: number;
  // Eggcorns
  eggcornNumber: number;
  //transition
  totalTransitions: number;
  transitionsScore: number;
  //grammar
  totalGrammar: number;

  constructor(private router: Router, private data: DataService, private passivevoice: PassivevoiceService,
              private wordiness: WordinessService, private transitions: TransitionsService,
              private grammar: GrammarService, private nonAcademicStyle: AcademicStyleService, private eggcorns: EggcornService) {}

  totalEggcorns: number;
  eggcornsScore: number;

  startOverClick() : void {
    this.data.changeMessage('');
  }

  startOverClickButton() : void {
    this.data.changeMessage('');
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    // Input text
    this.data.currentMessage.subscribe(message => this.message = message);
    // Grade
    this.data.currentGrade.subscribe(grade => this.grade = grade);
    // ************************
    // *                      *
    // *     Passive Voice    *
    // *                      *
    // ************************
    this.passivevoice.currentPassiveVoiceNumber.subscribe(passiveVoiceNumber => this.passiveVoiceNumber = passiveVoiceNumber);
    this.passivevoice.currentPassiveVoiceScore.subscribe(passiveVoiceScore => passiveVoiceScore = passiveVoiceScore);

    // *********************
    // *                   *
    // *     Wordiness     *
    // *                   *
    // *********************
    this.wordiness.currentWordinessNumber.subscribe(wordinessNumber => this.wordinessNumber = wordinessNumber);
    this.wordiness.currentWordinessScore.subscribe(wordinessScore => this.wordinessScore = wordinessScore);

    // *********************
    // *                   *
    // *    AcademicStyle  *
    // *                   *
    // *********************
    this.nonAcademicStyle.currentTotalNonAcademic.subscribe(totalNonAcademic=> this.totalNonAcademic = totalNonAcademic);
    this.nonAcademicStyle.currentNonAcademicStyleScore.subscribe(nonAcademicStyleScore => this.nonAcademicStyleScore = nonAcademicStyleScore);

    // *********************
    // *                   *
    // *    Transitions    *
    // *                   *
    // *********************
    this.transitions.currentTransitionsScore.subscribe(transitionsScore => this.transitionsScore = transitionsScore);
    this.transitions.currentTotalTransitions.subscribe(totalTransitions => this.totalTransitions = totalTransitions);

    // *********************
    // *                   *
    // *    Grammar        *
    // *                   *
    // *********************
    this.grammar.currentTotalGrammar.subscribe(totalGrammar => this.totalGrammar = totalGrammar);
    // *********************
    // *                   *
    // *     Eggcorns      *
    // *                   *
    // *********************
    this.eggcorns.currentEggcornsScore.subscribe(eggcornsScore => this.eggcornsScore = this.eggcornsScore);
    this.eggcorns.currentTotalEggcorns.subscribe(totalEggcorns => this.totalEggcorns = this.totalEggcorns);
  }
}
