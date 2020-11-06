import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
import { OverviewComponent } from './overview/overview.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
               { path: 'overview', component: OverviewComponent }
        ]),
     ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should take in the same input the user entered", async (() => {
    let input = fixture.debugElement.query(By.css('#userinput'));
      let el = input.nativeElement;

      // expect(el.value).toBe('peeskillet');

      el.value = 'someValue';
      el.dispatchEvent(new Event('#userinput'));
      
      component.submitClick();

      expect(fixture.componentInstance.message).toBe('someValue');
  }));
});
