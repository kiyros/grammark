import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordinessComponent } from './wordiness.component';

describe('WordinessComponent', () => {
  let component: WordinessComponent;
  let fixture: ComponentFixture<WordinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
