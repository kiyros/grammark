import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WordinessFixComponent } from './wordiness-fix.component';

describe('WordinessFixComponent', () => {
  let component: WordinessFixComponent;
  let fixture: ComponentFixture<WordinessFixComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WordinessFixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordinessFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
