import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrammarFixComponent } from './grammar-fix.component';

describe('GrammarFixComponent', () => {
  let component: GrammarFixComponent;
  let fixture: ComponentFixture<GrammarFixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrammarFixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrammarFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
