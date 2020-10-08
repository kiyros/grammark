import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicStyleFixComponent } from './academic-style-fix.component';

describe('AcademicStyleFixComponent', () => {
  let component: AcademicStyleFixComponent;
  let fixture: ComponentFixture<AcademicStyleFixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicStyleFixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicStyleFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
