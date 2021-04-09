import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonInvertedComponent } from './button-inverted.component';

describe('ButtonInvertedComponent', () => {
  let component: ButtonInvertedComponent;
  let fixture: ComponentFixture<ButtonInvertedComponent>;
  let classList;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonInvertedComponent ],
      imports: [
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonInvertedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    classList = fixture.debugElement.query(By.css('button')).nativeElement.classList;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have CSS classes when no input values are set', () => {
    expect(classList).not.toContain('white');
    expect(classList).not.toContain('grey');
    expect(classList).toContain('small-font');
  });

  it('should have CSS classes when input values differ from default', () => {
    component.color = 'white';
    component.smallFont = false;
    fixture.detectChanges();

    expect(classList).toContain('white');
    expect(classList).not.toContain('grey');
    expect(classList).not.toContain('small-font');
  });
});
