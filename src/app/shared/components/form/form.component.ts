/**
 * Most components reuse same layout of forms. 
 */
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

import { InputField } from 'src/app/shared/models/input-field.model';
import { SubmitButton } from 'src/app/shared/models/submit-button.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges {
  @Input() inputs: InputField[] = [];
  @Input() submitBtn: SubmitButton = { text: 'Submit' };

  @Output() submitted = new EventEmitter<any>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm()
  }

  ngOnChanges(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group(this.translateInputArrayToGroup());
    this.inputs.forEach(i => {
      if (!i.value) return;
      this.form.get(i.id).setValue(i.value);
    })
  }

  /**
   * Translate the given array of inputs into a parsable object for the formbuilder
   */
  private translateInputArrayToGroup(): {} {
    const result = {};
    this.inputs.forEach(item => { 
      result[item.id] = this.addValidation(item);
    });
    return result;
  }

  /**
   * Handle submit of form
   */
  onSubmit(formValue: any) {
    this.ensureValid();
    this.submitted.emit(formValue);
    this.form.reset();
  }

  /**
   * Validate the input depending on the given item.type
   * @param item 
   */
  addValidation(item: InputField): FormControl {
    switch (item.type) {
      case 'email': 
        return new FormControl('', [Validators.required, Validators.email]);
      default:
        return new FormControl('', [Validators.required]);
    }
  }

  /**
   * Ensure the current form is valid 
   */
  ensureValid() {
    Object.entries(this.form.controls).forEach(entry => {
      const formName = entry[0];
      const controller: FormControl = entry[1] as FormControl;

      if (controller.errors?.required && !controller.value) {
        throw new Error(`Please recheck your ${formName}. Make sure you specify some input`);
      }

      if (controller.invalid) {
        throw new Error(`Please recheck your ${formName}. Invalid input`);
      }


    })
  }

}
