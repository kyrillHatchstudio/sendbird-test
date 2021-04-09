import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let classList;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    classList = fixture.debugElement.query(By.css('button')).nativeElement.classList;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have CSS classes when no input values are set', () => {
    expect(classList).toContain('width-50');
    expect(classList).toContain('addPadding');
    expect(classList).toContain('addUpperCase');
    expect(classList).not.toContain('smallFont');
  });

  it('should have CSS classes when input values differ from default', () => {
    component.color = 'greenBorder';
    component.width = 100;
    component.removePadding = true;
    component.removeAllUppercase = true;
    component.fontSize = 'small';
    fixture.detectChanges();

    expect(classList).toContain('greenBorder');
    expect(classList).toContain('width-100');
    expect(classList).not.toContain('addPadding');
    expect(classList).not.toContain('addUpperCase');
    expect(classList).toContain('smallFont');
  });

  it('should emit event when clicked', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    const spy = spyOn(component.onClick, 'emit').and.callThrough();

    button.click();

    expect(spy).toHaveBeenCalled();
  });
});
