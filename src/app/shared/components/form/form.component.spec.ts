import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputField } from '../../models/input-field.model';
import { ButtonComponent } from '../button/button.component';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let button;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent,
        ButtonComponent
      ],
      providers: [ FormBuilder ],
      imports: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    button = fixture.debugElement.query(By.directive(ButtonComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default button color and button text', () => {
    expect(button.color).toBeTruthy();
    expect(button.text).toBeTruthy();
  });

  it('should display changed button color and text correctly', () => {
    component.submitBtn = {
      text: 'some-text',
      color: 'red'
    };
    fixture.detectChanges();

    expect(button.color).toBe('red');
    expect(button.text).toBe('some-text');
  });

  it('should create working input elements for valid inputs', () => {
    const inputs: InputField[] = [
      { id: 'a', type: 'text', placeholder: 'öäüqwertzuß'},
      { id: 'b', type: 'color', placeholder: ''},
      { id: 'c', type: 'checkbox', placeholder: ''},
      { id: 'd', type: 'hidden', placeholder: ''}
    ];
    component.inputs = inputs;
    fixture.detectChanges();
    component.ngOnChanges();

    const inputElements = fixture.debugElement.queryAll(By.css('input'));
    const inputLength = inputElements
      .map(e => e.nativeElement)
      .map((input, index: number) => {
        expect(input.type).toBe(inputs[index].type);
        expect(input.placeholder).toBe(inputs[index].placeholder);
        expect(component.form.get(inputs[index].id)).toBeDefined();
      })
      .length;

    expect(inputLength).toBe(inputs.length);
  });

  it('should create input elements for INvalid inputs', () => {
    const inputs: InputField[] = [
      { id: 'a', type: 'kolorpickar', placeholder: 'öäüqwertzuß'},
      { id: 'b', type: 'checkbox', placeholder: 'no " ></input>'},
      { id: '', type: '"</input>', placeholder: ''}
    ];
    component.inputs = inputs;
    fixture.detectChanges();
    component.ngOnChanges();

    const inputElements = fixture.debugElement.queryAll(By.css('input'));
    expect(inputElements.length).toBe(3);
    // when incorrect type, placeholder should still be correct
    expect(inputElements[0].nativeElement.placeholder).toBe(inputs[0].placeholder);
    // when placeholder for type that doesn't need one, type should be still correct
    expect(inputElements[1].nativeElement.type).toBe(inputs[1].type);
  });
});
