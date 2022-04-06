import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SentencesFixComponent } from './sentences-fix.component';

describe('SentencesFixComponent', () => {
  let component: SentencesFixComponent;
  let fixture: ComponentFixture<SentencesFixComponent>;

  beforeEach(waitForAsync(() => {
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
