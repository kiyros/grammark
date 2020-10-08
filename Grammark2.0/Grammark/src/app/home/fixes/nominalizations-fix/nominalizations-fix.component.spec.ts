import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalizationsFixComponent } from './nominalizations-fix.component';

describe('NominalizationsFixComponent', () => {
  let component: NominalizationsFixComponent;
  let fixture: ComponentFixture<NominalizationsFixComponent>;

  beforeEach(async(() => {
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
