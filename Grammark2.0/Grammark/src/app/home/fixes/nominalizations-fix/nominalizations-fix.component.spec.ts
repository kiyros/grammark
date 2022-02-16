import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NominalizationsFixComponent } from './nominalizations-fix.component';

describe('NominalizationsFixComponent', () => {
  let component: NominalizationsFixComponent;
  let fixture: ComponentFixture<NominalizationsFixComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalizationsFixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalizationsFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
