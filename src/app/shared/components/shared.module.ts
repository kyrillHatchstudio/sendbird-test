import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonInvertedComponent } from './button-inverted/button-inverted.component';
import { ButtonComponent } from './button/button.component';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { RouterModule } from '@angular/router';
import { CardHeaderComponent } from './card-header/card-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalModule } from 'ngx-bootstrap/modal';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ButtonSmallComponent } from './button-small/button-small.component';


@NgModule({
  declarations: [
    ButtonComponent,
    ButtonInvertedComponent,
    FormComponent,
    CardHeaderComponent,
    ButtonSmallComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ModalModule.forChild()
  ],
  exports: [
    ButtonComponent,
    ButtonInvertedComponent,
    FormComponent,
    CardHeaderComponent,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ButtonSmallComponent,
    ModalModule
  ]
})
export class SharedModule { }
