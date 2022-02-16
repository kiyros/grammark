import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TransitionsComponent } from './transitions.component';

describe('TransitionsComponent', () => {
  let component: TransitionsComponent;
  let fixture: ComponentFixture<TransitionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
