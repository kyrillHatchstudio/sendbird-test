import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardHeaderComponent } from './card-header.component';

describe('CardHeaderComponent', () => {
  let component: CardHeaderComponent;
  let fixture: ComponentFixture<CardHeaderComponent>;

  class RouterStub {
    navigate() {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardHeaderComponent ],
      providers: [
        { provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have back arrow, heading and description', () => {
    component.heading = 'some title';
    component.subHeading = 'some subti';
    fixture.detectChanges();

    const arrow = fixture.debugElement.query(By.css('img')).nativeElement;
    const text = fixture.debugElement.nativeElement.innerText;

    expect(arrow.alt).toBe('back-arrow');
    expect(text).toContain('some title');
    expect(text).toContain('some subti');
  });

  it('should have forward arrow when set', () => {
    component.arrowDirection = 'right';
    fixture.detectChanges();

    const arrow = fixture.debugElement.query(By.css('img')).nativeElement;

    expect(arrow.alt).toBe('next-arrow');
  });

  it('should navigate when clicked', () => {
    component.routeTo = 'some-route';
    fixture.detectChanges();

    const arrow = fixture.debugElement.query(By.css('img')).nativeElement;
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    arrow.click();

    expect(spy).toHaveBeenCalledWith(['some-route']);
  });
});
