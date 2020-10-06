import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiveVoiceComponent } from './passive-voice.component';

describe('PassiveVoiceComponent', () => {
  let component: PassiveVoiceComponent;
  let fixture: ComponentFixture<PassiveVoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassiveVoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassiveVoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
