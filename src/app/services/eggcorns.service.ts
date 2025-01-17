import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class EggcornService {


  //variables for eggcorn score
  private eggcornsAlertColor = new BehaviorSubject<string>(" ");
  currentEggcornsAlertColor = this.eggcornsAlertColor.asObservable();

  private eggcornsFeedback = new BehaviorSubject<string>(" ");
  currentEggcornsFeedback = this.eggcornsFeedback.asObservable();

  private eggcornsScore = new BehaviorSubject<number>(0);
  currentEggcornsScore = this.eggcornsScore.asObservable();

  private totalEggcorns = new BehaviorSubject<number>(0);
  currentTotalEggcorns = this.totalEggcorns.asObservable();

  //this table contains all of the eggcorns
  public eggcornsTable = new BehaviorSubject<any>({
    'all intensive purposes': 'all intents and purposes',
    'per say': 'per se',
    'another thing coming': 'another think coming',
    'ascared': 'afraid',
    'as dust fell': 'as dusk fell',
    'biting my time': 'biding my time',
    'biting your time': 'biding your time',
    'best thing since life\'s bread': 'best thing since sliced bread',
    'bondfire': 'bonfire',
    'callapitter': 'caterpillar',
    'chesterdraws': 'chest of drawers',
    'civilware': 'silverware',
    'consinct': 'concise',
    'curly roads': 'curvy roads',
    'daring-do': 'derring-do',
    'doggy-dog-world': 'dog-eat-dog',
    'duck tape': 'duct tape',
    'escape goat': 'scape goat',
    'expresso': 'espresso',
    'eyebulbs': 'eyeballs',
    'facetube': 'youtube',
    'flush out': 'flesh out',
    'flustrated': 'frustrated',
    'flutterby': 'butterfly',
    'free examples': 'free samples',
    'genetic brands': 'generic brands',
    'growth sprout': 'growth spurt',
    'guilt trap': 'guilt trip',
    'handy-downs': 'hand-me-downs',
    'handy downs': 'hand-me-downs',
    'happy as a clown': 'happy as a clam',
    'hearbuds': 'earbuds',
    'hell in a handbag': 'hell in a handbasket',
    'ice tea': 'iced tea',
    'illicit a response': 'elicit a response',
    'in other worlds': 'in other words',
    'junk start': 'jump start',
    'just deserves': 'just deserts',
    'labtop': 'laptop',
    'lapkin': 'napkin',
    'last stitch effort': 'last ditch effort',
    'lesser of two equals': 'lesser of two evils',
    'magnaphone': 'megaphone',
    'mist of things': 'midst of things',
    'mute point': 'moot point',
    'nerve-wrecking': 'nerve-wracking',
    'nerve wrecking': 'nerve-wracking',
    'nip it in the butt': 'nip it in the bud',
    'nip in the butt': 'nip in the bud',
    'nip this in the butt': 'nip this in the bud',
    'old timers disease': 'Alzheimer\'s disease',
    'old-timers disease': 'Alzheimer\'s disease',
    'old wise tale': 'old wives tale',
    'on the lamb': 'on the lam',
    'optical delusion': 'optical illusion',
    'out of bounce': 'out of bounds',
    'overfloating': 'overflowing',
    'pass mustard': 'pass muster',
    'platemats': 'placemats',
    'rebel rouser': 'rabble rouser',
    'real goal-getter': 'real go-getter',
    'rot iron fences': 'wrought-iron fences',
    'scandally clad': 'scantily clad',
    'self of steam': 'self esteem',
    'skyscratcher': 'skyscraper',
    'stand at a tension': 'stand at attention',
    'take it for granite': 'take it for granted',
    'took it for granite': 'took it for granted',
    'takes two to tangle': 'takes two to tango',
    'towing the line': 'toeing the line',
    'tremblor': 'temblor',
    'very close veins': 'Varicose veins',
    'vim and vinegar': 'vim and vigor',
    'wet your appetite': 'whet your appetite',
    'wet my appetite': 'whet my appetite',
    'wet the appetite': 'whet the appetite',
    'wheelbarrel': 'wheelbarrow',
    'wild variety': 'wide variety',
    'wind charms': 'wind chimes',
    'windshield factor': 'windchill factor',
    'wonderlust': 'wanderlust',
    'world wind romance': 'whirlwind romance',
    'world wind tour': 'whirlwind tour',
    'worth ethic': 'work ethic',
  });
  currentEggcornsTable = this.eggcornsTable.asObservable();

  // this table will contain the user's eggcorn words
  private eggcornsUserTable = new BehaviorSubject<any>({});
  currentEggcornsUserTable = this.eggcornsUserTable.asObservable();

  constructor() { }

  changeEggcornsScore(eggcornsScore: number) {
    this.eggcornsScore.next(eggcornsScore);
  }

  changeTotalEggcorns(totalEggcorns: number) {
    this.totalEggcorns.next(totalEggcorns);
  }

  changeTable(table: any) {
    this.eggcornsTable.next(table);
  }

  changeEggcornsUserTable(eggcornsUserTable: any) {
    this.eggcornsUserTable.next(eggcornsUserTable);
  }

  changeEggcornsFeedback(eggcornsFeedback: string) {
    this.eggcornsFeedback.next(eggcornsFeedback);
  }


  changeEggcornsAlertColor(eggcornsAlertColor: string) {
    this.eggcornsAlertColor.next(eggcornsAlertColor);
  }
}
