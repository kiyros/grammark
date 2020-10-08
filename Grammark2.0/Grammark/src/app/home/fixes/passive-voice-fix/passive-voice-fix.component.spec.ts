import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiveVoiceFixComponent } from './passive-voice-fix.component';

describe('PassiveVoiceFixComponent', () => {
  let component: PassiveVoiceFixComponent;
  let fixture: ComponentFixture<PassiveVoiceFixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassiveVoiceFixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassiveVoiceFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
