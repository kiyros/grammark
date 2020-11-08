import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { PassivevoiceService } from '../../services/passivevoice.service';
import { WordinessService } from '../../services/wordiness.service';
import { TransitionsService} from '../../services/transitions.service';
import { GrammarService} from '../../services/grammar.service';
import { AcademicStyleService} from '../../services/academicstyle.service';
import {EggcornService} from '../../services/eggcorns.service';
import {NominalizationsService} from '../../services/nominalizations.service';
import {SentencesService} from '../../services/sentences.service';
import { transition } from '@angular/animations';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  // Vars
  message: string;
  grade: number;
  gradeAlertColor: string;
  gradeFeedback: string;
  totalSentences: number;
  totalErrors: string;
  // Passive Voice
  passiveVoiceNumber: number;
  passiveVoiceScore: number;
  passiveVoiceAlertColor: string;
  // Wordiness
  wordinessNumber: number;
  wordinessScore: number;
  wordinessAlertColor: string;
  //academic style
  academicStyleScore: number;
  totalNonAcademic: number;
  academicStyleAlertColor: string;
  //transition
  totalTransitions: number;
  transitionsScore: number;
  transitionsAlertColor: string;
  // Eggcorns
  totalEggcorns: number;
  eggcornsScore: number;
  eggcornsAlertColor: string;
  //grammar
  totalGrammar: number;
  grammarScore: number;
  grammarAlertColor: string;
  // Nominalizations
  nominalizationsNumber: number;
  nominalizationsScore: number;
  nominalizationsAlertColor: string;
  // Sentences
  sentencesScore: number;
  sentencesNumber: number;
  sentencesAlertColor: string;

  constructor(private router: Router, private data: DataService,
              private passivevoice: PassivevoiceService,
              private wordiness: WordinessService,
              private transitions: TransitionsService,
              private grammar: GrammarService,
              private academic: AcademicStyleService,
              private eggcorns: EggcornService,
              private nominalizations: NominalizationsService,
              private sentences: SentencesService) {}


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
    this.data.currentGrade.subscribe(grade => this.grade = grade);
    this.data.currentTotalSentences.subscribe(totalSentences => this.totalSentences = totalSentences);
    this.data.currentTotalErrors.subscribe(totalErrors => this.totalErrors = totalErrors);
    this.data.currentGradeAlertColor.subscribe(gradeAlertColor => this.gradeAlertColor = gradeAlertColor);
    this.data.currentGradeFeedback.subscribe(gradeFeedback => this.gradeFeedback = gradeFeedback);

    // ************************
    // *                      *
    // *     Passive Voice    *
    // *                      *
    // ************************
    this.passivevoice.currentPassiveVoiceNumber.subscribe(passiveVoiceNumber => this.passiveVoiceNumber = passiveVoiceNumber);
    this.passivevoice.currentPassiveVoiceScore.subscribe(passiveVoiceScore => this.passiveVoiceScore = passiveVoiceScore);
    this.passivevoice.currentPassiveVoiceAlertColor.subscribe(passiveVoiceAlertColor => this.passiveVoiceAlertColor = passiveVoiceAlertColor);

    // *********************
    // *                   *
    // *     Wordiness     *
    // *                   *
    // *********************
    this.wordiness.currentWordinessNumber.subscribe(wordinessNumber => this.wordinessNumber = wordinessNumber);
    this.wordiness.currentWordinessScore.subscribe(wordinessScore => this.wordinessScore = wordinessScore);
    this.wordiness.currentWordinessAlertColor.subscribe(wordinessAlertColor => this.wordinessAlertColor = wordinessAlertColor);

    // *********************
    // *                   *
    // *    AcademicStyle  *
    // *                   *
    // *********************
    this.academic.currentTotalNonAcademic.subscribe(totalNonAcademic => this.totalNonAcademic = totalNonAcademic);
    this.academic.currentAcademicStyleScore.subscribe(academicStyleScore => this.academicStyleScore = academicStyleScore);
    this.academic.currentAcademicStyleAlertColor.subscribe(academicStyleAlertColor => this.academicStyleAlertColor = academicStyleAlertColor);

    // *********************
    // *                   *
    // *    Transitions    *
    // *                   *
    // *********************
    this.transitions.currentTransitionsScore.subscribe(transitionsScore => this.transitionsScore = transitionsScore);
    this.transitions.currentTotalTransitions.subscribe(totalTransitions => this.totalTransitions = totalTransitions);
    this.transitions.currentTransitionsAlertColor.subscribe(transitionsAlertColor => this.transitionsAlertColor = transitionsAlertColor);

    // *********************
    // *                   *
    // *    Grammar        *
    // *                   *
    // *********************
    this.grammar.currentTotalGrammar.subscribe(totalGrammar => this.totalGrammar = totalGrammar);
    this.grammar.currentGrammarScore.subscribe(grammarScore => this.grammarScore = grammarScore);
    this.grammar.currentGrammarAlertColor.subscribe(grammarAlertColor => this.grammarAlertColor = grammarAlertColor);

    // *********************
    // *                   *
    // *     Eggcorns      *
    // *                   *
    // *********************
    this.eggcorns.currentEggcornsScore.subscribe(eggcornsScore => this.eggcornsScore = eggcornsScore);
    this.eggcorns.currentTotalEggcorns.subscribe(totalEggcorns => this.totalEggcorns = totalEggcorns);
    this.eggcorns.currentEggcornsAlertColor.subscribe(eggscornsAlertColor => this.eggcornsAlertColor = eggscornsAlertColor);

    // ****************************
    // *                          *
    // *     Nominalizations      *
    // *                          *
    // ****************************
    this.nominalizations.currentNominalizationsScore.subscribe(nominalizationsScore => this.nominalizationsScore = nominalizationsScore);
    this.nominalizations.currentNominalizationsNumber.subscribe(nomalizationsNumber => this.nominalizationsNumber = nomalizationsNumber);
    this.nominalizations.currentNominalizationsAlertColor.subscribe(nominalizationsAlertColor => this.nominalizationsAlertColor = nominalizationsAlertColor);

    // **********************
    // *                    *
    // *     Sentences      *
    // *                    *
    // **********************
    this.sentences.currentSentencesScore.subscribe(sentencesScore => this.sentencesScore = sentencesScore);
    this.sentences.currentSentencesNumber.subscribe(sentencesNumber => this.sentencesNumber = sentencesNumber);
    this.sentences.currentSentencesAlertColor.subscribe(sentencesAlertColor => this.sentencesAlertColor = sentencesAlertColor);
  }
}
