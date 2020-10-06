import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicStyleComponent } from './academic-style.component';

describe('AcademicStyleComponent', () => {
  let component: AcademicStyleComponent;
  let fixture: ComponentFixture<AcademicStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
