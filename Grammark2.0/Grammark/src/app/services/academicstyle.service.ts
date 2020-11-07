import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AcademicStyleService {

  //variables for non academic style scoring
  private academicStyleAlertColor = new BehaviorSubject<string>(" ");
  currentAcademicStyleAlertColor = this.academicStyleAlertColor.asObservable();

  private academicStyleFeedback = new BehaviorSubject<string>(" ");
  currentAcademicStyleFeedback = this.academicStyleFeedback.asObservable();

  private academicStyleScore = new BehaviorSubject<number>(0);
  currentAcademicStyleScore = this.academicStyleScore.asObservable();

  private totalNonAcademic = new BehaviorSubject<number>(0);
  currentTotalNonAcademic = this.totalNonAcademic.asObservable();

  // Non Academic Style Error List
  private academicStyleTableSource = new BehaviorSubject<any>({
    // casual language & feedback
    'plenty of': 'a great deal of /numerous/ several',
    'loads of': 'a great deal of /numerous/ several',
    'a bit': 'somewhat (before adj. or adv.)/ slightly',
    'I\'ve': 'First-person language is typically discouraged in persuasive academic writing. Consider removing, or consult your instructor for guidance.',
    'we\'ve': 'First-person language is typically discouraged in persuasive academic writing. Consider removing, or consult your instructor for guidance.',
    'We\'ve': 'First-person language is typically discouraged in persuasive academic writing. Consider removing, or consult your instructor for guidance.',
    'You\'ve': 'Second-person language is typically discouraged in persuasive academic writing. Consider replacing with “one” or another third-person noun.',
    'you\'ve': 'Second-person language is typically discouraged in persuasive academic writing. Consider replacing with “one” or another third-person noun.',
    'they\'re': 'Avoid contractions to create formal tone. Change to “they are.” And make sure you don’t mean “there” (as in “there are no more donuts in there”) or “their” (as in “their reason for eating the donuts is that they were hungry).',
    'They\'re': 'Avoid contractions to create formal tone. Change to “They are” And make sure you don’t mean “there” (as in “there are no more donuts in there”) or “their” (as in “their reason for eating the donuts is that they were hungry).',
    'can not': 'Change to one word “cannot”',
    'can\'t': 'Change to one word “cannot”',
    'Don\'t': 'Avoid contractions to create formal tone; change to “Do not.”',
    'don\'t': 'Avoid contractions to create formal tone; change to “do not.”',
    'Doesn\'t': 'Avoid contractions to create formal tone; change to “Does it not.”',
    'doesn\'t': 'Avoid contractions to create formal tone; change to “does not.”',
    'won\'t': 'Avoid contractions to create formal tone; change to “will not.”',
    'shouldn\'t': 'Avoid contractions to create formal tone; change to “should not.”',
    'Shouldn\'t': 'Avoid contractions to create formal tone; change to “Should it not.”',
    'should\'ve': 'Avoid contractions to create formal tone; change to “should have.”',
    'couldn\'t': 'Avoid contractions to create formal tone; change to “could not.”',
    'Couldn\'t': 'Avoid contractions to create formal tone; change to “Could it not.”',
    'could\'ve': 'Avoid contractions to create formal tone; change to “could have.”',
    'wouldn\'t': 'Avoid contractions to create formal tone; change to “would not.”',
    'Wouldn\'t': 'Avoid contractions to create formal tone; change to “Would it not.”',
    'would\'ve': 'Avoid contractions to create formal tone; change to “would have.”',
    'they\'ve': 'Avoid contractions to create formal tone; change to “they have.”',
    'Let\'s': 'Avoid contractions to create a more formal tone; change to “Let us.”',
    'let\'s': 'Avoid contractions to create a more formal tone; change to “let us.”',
    'i': 'First-person languag is typically discouraged in persuasive academic writing. Consider removing, or consult your instructor for guidance.',
    'I': 'First-person language is typically discouraged in persuasive academic writing. Consider removing, or consult your instructor for guidance.',
    'me': 'First-person language is typically discouraged in persuasive academic writing. Consider removing, or consult your instructor for guidance.',
    'Me': 'First-person language is typically discouraged in persuasive academic writing. Consider removing, or consult your instructor for guidance.',
    'My': 'First-person language is typically discouraged in persuasive academic writing. Consider removing, or consult your instructor for guidance.',
    'my': 'First-person language is typically discouraged in persuasive academic writing. Consider removing, or consult your instructor for guidance.',
    'We': 'First-person language is typically discouraged in persuasive academic writing. Consider removing, or consult your instructor for guidance.',
    'we': 'First-person language is typically discouraged in persuasive academic writing. Consider removing, or consult your instructor for guidance.',
    'our': 'First-person language is typically discouraged in persuasive academic writing. Consider removing, or consult your instructor for guidance.',
    'Our': 'First-person language is typically discouraged in persuasive academic writing. Consider removing, or consult your instructor for guidance.',
    'us': 'First-person language is typically discouraged in persuasive academic writing. Consider removing, or consult your instructor for guidance.',
    'You': 'Second-person language is typically discouraged in persuasive academic writing. Consider replacing with “one” or another third-person noun.',
    'you': 'Second-person language is typically discouraged in persuasive academic writing. Consider replacing with “one” or another third-person noun.',
    'your': 'Second-person language is typically discouraged in persuasive academic writing. Consider replacing with “one” or another third-person noun.',
    'Your': 'Second-person language is typically discouraged in persuasive academic writing. Consider replacing with “one” or another third-person noun.',
    'lets': 'Do you mean “Let us”?',
    'Lets': 'Do you mean “Let us”?',
    'nowadays': 'today or now',
    'Nowadays': 'Today or Now (And don’t forget a comma if this begins the sentence.)',
    'in this day and age': 'today, now, currently, presently (Pick one)',
    'In this day and age': 'Today, Now, Currently, Presently (Pick one. And don’t forget a comma if this begins the sentence.)',
    'less': 'Make sure you don’t mean “fewer.” If it can be counted, you probably mean fewer. (less furniture / fewer chairs)',
    'Less': 'Make sure you don’t mean “fewer.” If it can be counted, you probably mean fewer. (less furniture / fewer chairs)',
    'could care less': 'You probably mean “could not care less.”',
    'comfortability': 'comfort',
    'society': 'Be more specific. “Society” is too general and rarely applies well to a claim. Maybe you mean something like, “in modern American culture” or “throughout many industrialized countries.”',
    'Society': 'Be more specific. “Society” is too general and rarely applies well to a claim. Maybe you mean something like, “in modern American culture” or “throughout many industrialized countries.”',
    'stuff': 'Unless you are using this word as a verb (like to “stuff” donuts into your food hole), than it is informal and could be replaced with a better word—“items” perhaps.',
    'Stuff': 'Unless you are using this word as a verb (like to “stuff” donuts into your food hole), than it is informal and could be replaced with a better word—“items” perhaps.',
    'things': 'Weak word—be more specific.',
    'Things': 'Weak word—be more specific.',
    'good': 'This is acceptable as a noun (a battle of good versus evil), but it is usually weak as an adjective (The dog was good on his walk; he didn’t bite anyone.)',
    'very': 'This is a weak word and does not add significant meaning. Delete or try a better adverb.',
    'Very': 'This is a weak word and does not add significant meaning. Delete or try a better adverb.',
    'most': 'If you are using this word as part of a claim, you MUST provide evidence to prove >50%. Without that evidence, use a safer word like “many.”',
    'Most': 'If you are using this word as part of a claim, you MUST provide evidence to prove >50%. Without that evidence, use a safer word like “many.”',
    'majority': 'If you are using this word as part of a claim, you MUST provide evidence to prove >50%. Without that evidence, use a safer word like “many.”',
    'Majority': 'To start a sentence, this must be “A majority…” or “The majority…” If you are using this word as part of a claim, you MUST provide evidence to prove >50%. Without that evidence, use a safer word like “many.”',
    'mostly': 'If you are using this word as part of a claim, you MUST provide evidence to prove >50%. Without that evidence, remove this word or use a safer word.',
    'Mostly': 'If you are using this word as part of a claim, you MUST provide evidence to prove >50%. Without that evidence, remove this word or use a safer word.',
    'minority': 'If you are using this word as part of a claim, you MUST provide evidence to prove <50%. Without that evidence, remove or choose a safer alternative.',
    'Minority': 'To start a sentence, this must be “A minority…” or “The minority…” If you are using this word as part of a claim, you MUST provide evidence to prove <50%. Without that evidence, use a safer word or remove.',
    'never': 'Caution: extreme language—if this is part of a claim, qualify this or remove if the claim is unprovable.',
    'Never': 'Caution: extreme language—if this is part of a claim, qualify this or remove if the claim is unprovable.',
    'always': 'Caution: extreme language—if this is part of a claim, qualify this or remove if the claim is unprovable.',
    'Always': 'Caution: extreme language—if this is part of a claim, qualify this or remove if the claim is unprovable.',
    'Everyone': 'Caution: extreme language—if this is part of a claim, qualify this or remove if the claim is unprovable.',
    'everyone': 'Caution: extreme language—if this is part of a claim, qualify this or remove if the claim is unprovable.',
    'everybody': 'Caution: extreme language—if this is part of a claim, qualify this or remove if the claim is unprovable.',
    'Everybody': 'Caution: extreme language—if this is part of a claim, qualify this or remove if the claim is unprovable.',
    'No one': 'Caution: extreme language—if this is part of a claim, qualify this or remove if the claim is unprovable.',
    'no one': 'Caution: extreme language—if this is part of a claim, qualify this or remove if the claim is unprovable.',
    'Nobody': 'Caution: extreme language—if this is part of a claim, qualify this or remove if the claim is unprovable.',
    'nobody': 'Caution: extreme language—if this is part of a claim, qualify this or remove if the claim is unprovable.',
    'every': 'Caution: extreme language—if this is part of a claim, qualify this or remove if the claim is unprovable.',
    'Every': 'Caution: extreme language—if this is part of a claim, qualify this or remove if the claim is unprovable.',
    'this essay will': 'If this refers to your own essay, then eliminate. Explicitly stating something about your paper is often appropriate in the science fields, but it is not usually a good approach for English essays.',
    'This essay will': 'If this refers to your own essay, then eliminate. Explicitly stating something about your paper is often appropriate in the science fields, but it is not usually a good approach for English essays.',
    'This paper will': 'If this refers to your own essay, then eliminate. Explicitly stating something about your paper is often appropriate in the science fields, but it is not usually a good approach for English essays.',
    'this paper will': 'If this refers to your own essay, then eliminate. Explicitly stating something about your paper is often appropriate in the science fields, but it is not usually a good approach for English essays.',
    'thesis of this paper': 'If this refers to your own essay, then eliminate. Explicitly stating something about your paper is often appropriate in the science fields, but it is not usually a good approach for English essays.',
    'thesis of this essay': 'If this refers to your own essay, then eliminate. Explicitly stating something about your paper is often appropriate in the science fields, but it is not usually a good approach for English essays.',
    'get together': 'collaborate with',
    'big': 'large (number/percentage) / considerable',
    'thing': 'device/object',
    //'stuff':'material',
    'find out': 'ascertain/discover',
    'do again': 'repeat',
    'set up': 'establish',
    'cut down on': 'reduce',
    'go up': 'increase',
    'come up with': 'create',
    'look into': 'investigate',
    'go up and down': 'fluctuate',
    'brings up the question': 'raises the question',
    'get rid of': 'eliminate',
    'turn down': 'refuse',
    'take back': 'retract',
    'put off': 'postpone/delay',
    'put up with': 'tolerate',
    'put away': 'save',
    'put down': 'attribute / insult',
    'give up': 'relinquish / surrender',
    'go back': 'return to',
    'give back': 'return',
    'give off': 'produce',
    'give away': 'betray / donate',
    'carry out': 'conduct',
    'help': 'assist/ aid',
    'in the end': 'finally/ultimately',
    'at once': 'immediately',
    'at the same time': 'simultaneously/ concurrently',
    'at first': 'initially',
    'on and off': 'intermittently',
    'mainly': 'principally/primarily',
    'next': 'subsequently/subsequent/following',
    'again and again': 'repeatedly',
    'understanding': 'comprehension / comprehending',
    'in charge of': 'responsible for',
    'enough': 'sufficient',
    'better': 'superior to',
    'more and more': 'Increasingly/ unceasingly/non-stop',
    'bad': 'disappointing / negative',
    'get worse': 'deteriorate',
    'horrible': 'unacceptable',
    'come in': 'to enter',
    'talk about': 'discuss',
    'look at': 'examine',
    'pin down': 'determine',
    'let’s consider': 'it is important to consider',
    'I like': 'avoid first person',
    'I don\'t like': 'avoid first person / or if necessary "personally I dislike"',
    'on top of that': 'another point is / furthermore / similarly',
    'in a nutshell': 'briefly / in short / basically',
    'by chance': 'incidentally / accidentally',
    'by accident': 'accidentally',
    'kids': 'infants / offspring / children / teens',
    'O.K': 'acceptable/ satisfactory',
    'okay': 'acceptable / satisfactory',
    'make up for': 'compensate for',
    'get in touch with': 'contact',
    'let somebody know': 'inform someone',
    'call off': 'cancel',
    'sort out': 'resolve',
    'deal with': 'handle / address',
    'to think of': 'to conceive of/ to imagine',
    'keep up': 'maintain',
    'a lot': 'a substantial amount',
    'stand for': 'denote',
    'the same as': 'equivalent to',
    'man': 'male',
    'guy': 'male',
    'old people': 'senior citizens / retirees',
    'old person': 'senior citizens / retirees',
    'crooks': 'offenders / lawbreakers',
    'awesome': 'preferable / desirable',
    'sick of': 'dissatisfied with',
    'fed up with': 'dissatisfied with',
    'I think that': 'It seems that / It could be argued that',
    'to go over': 'exceed / review',
    'make sure': 'ensure',
    'take away': 'withdraw / remove',
    'whenever we want': 'without prior notice / anytime',
    'whenever we like': 'without prior notice / anytime',
    'one after the other': 'regularly',
    'big differences': 'significant differences',
    'this shows that': 'this seems to demonstrate that',
    'etc.': 'Delete / among other examples',
    'and so forth': 'Delete / among other examples',
    'and so on': 'Delete / among other examples',
    'i.e.': 'namely',
    'e.g.': 'for example',
    'vs.': 'versus/as opposed to',
    'nice': 'Avoid / friendly',
    'cute': 'Avoid / attractive',
    'smart': 'intelligent',
    'tired': 'exhausted',
    'drunk': 'intoxicated',
    'really': 'Avoid, or make more formal by using "extremely"',
    'to go up to': 'to reach',
    'come across': 'find',
    'do away with': 'abolish',
    'build up': 'accumulate',
    'finish off': 'conclude',
    'poor country': 'developing country',
    'that’s why': 'for this reason / the reason for',
    'how much': 'to what extent',
    'every year': 'annually',
    'each year': 'annualy',
    'fridge': 'refrigerator',
    'TV': 'television',
    'boss': 'employer',
    'obviously': 'Extreme language. Avoid, and use a tenative qualifier like "seems"',
    'totally': 'Extreme language. Avoid, and use a tenative qualifier like "seems"',
    'extremely': 'Extreme language. Avoid, and use a tenative qualifier like "seems"',
    'stupid': 'Avoid unless analyzing the word stupid',
    'clearly': 'Extreme language. Avoid, and use a tenative qualifier like "seems"',
    //'never':'Extreme language. Avoid, and use a tenative qualifier like "seems"',
    'different': 'Vague. Different in what way?',
    'amazing': 'Too informal.',
    'kind of': 'Vague. Generally try to avoid.',
    'sort of': 'Vague. Generally try to avoid.',
  });
  currentAcademicStyleTable = this.academicStyleTableSource.asObservable();

  // nonAcademic Style Current User Errors
  private academicStyleUserTableSource = new BehaviorSubject<any>({});
  currentAcademicStyleUserTable = this.academicStyleUserTableSource.asObservable();

  constructor() { }

  changeAcademicStyleScore(academicStyleScore: number) {
    this.academicStyleScore.next(academicStyleScore);
  }

  changeTotalNonAcademic(totalNonAcademic: number) {
    this.totalNonAcademic.next(totalNonAcademic);
  }

  changeAcademicStyleTable(academicStyleTable: any) {
    this.academicStyleTableSource.next(academicStyleTable);
  }

  changeAcademicStyleUserTable(academicStyleUserTable: any) {
    this.academicStyleUserTableSource.next(academicStyleUserTable);
  }

  changeAcademicStyleFeedback(academicStyleFeedback: string) {
    this.academicStyleFeedback.next(academicStyleFeedback);
  }

  changeAcademicStyleAlertColor(academicStyleAlertColor: string) {
    this.academicStyleAlertColor.next(academicStyleAlertColor);
  }
}
