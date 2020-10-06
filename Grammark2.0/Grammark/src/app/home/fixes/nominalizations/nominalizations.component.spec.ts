import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalizationsComponent } from './nominalizations.component';

describe('NominalizationsComponent', () => {
  let component: NominalizationsComponent;
  let fixture: ComponentFixture<NominalizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominalizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
