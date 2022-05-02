import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

// firebase
import { FirebaseService } from 'src/firefireStore.service';



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
  private academicStyleTableSource = new BehaviorSubject<any>(this.testFireBase.getAcademicStyles()
    // casual language & feedback
  );
  currentAcademicStyleTable = this.academicStyleTableSource.asObservable();

  // nonAcademic Style Current User Errors
  private academicStyleUserTableSource = new BehaviorSubject<any>({});
  currentAcademicStyleUserTable = this.academicStyleUserTableSource.asObservable();
  
  constructor(
    private testFireBase : FirebaseService
  ) { }

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
