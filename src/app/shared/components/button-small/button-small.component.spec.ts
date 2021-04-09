import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonSmallComponent } from './button-small.component';

describe('ButtonSmallComponent', () => {
  let component: ButtonSmallComponent;
  let fixture: ComponentFixture<ButtonSmallComponent>;
  let classList;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    classList = fixture.debugElement.query(By.css('button')).nativeElement.classList;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have NO additional CSS classes when no input values are set', () => {
    expect(classList).not.toContain('grey');
  });

  it('should have CSS class when input values differ from default', () => {
    component.color = 'grey';
    fixture.detectChanges();

    expect(classList).toContain('grey');
  });

  it('should emit event when clicked', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    const spy = spyOn(component.onClick, 'emit').and.callThrough();

    button.click();

    expect(spy).toHaveBeenCalled();
  });
});
