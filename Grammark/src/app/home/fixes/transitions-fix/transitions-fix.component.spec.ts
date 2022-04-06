import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TransitionsFixComponent } from './transitions-fix.component';

describe('TransitionsFixComponent', () => {
  let component: TransitionsFixComponent;
  let fixture: ComponentFixture<TransitionsFixComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitionsFixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitionsFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
