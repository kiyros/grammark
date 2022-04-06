import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EggcornsComponent } from './eggcorns.component';

describe('EggcornsComponent', () => {
  let component: EggcornsComponent;
  let fixture: ComponentFixture<EggcornsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EggcornsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EggcornsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
