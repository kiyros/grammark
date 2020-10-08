import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EggcornsFixComponent } from './eggcorns-fix.component';

describe('EggcornsFixComponent', () => {
  let component: EggcornsFixComponent;
  let fixture: ComponentFixture<EggcornsFixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EggcornsFixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EggcornsFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
