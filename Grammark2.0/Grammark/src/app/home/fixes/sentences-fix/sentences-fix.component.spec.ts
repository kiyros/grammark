import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentencesFixComponent } from './sentences-fix.component';

describe('SentencesFixComponent', () => {
  let component: SentencesFixComponent;
  let fixture: ComponentFixture<SentencesFixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentencesFixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentencesFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
