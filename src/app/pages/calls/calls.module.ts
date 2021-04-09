import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallsRoutingModule } from './calls-routing.module';
import { VideoComponent } from './video/video.component';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { PractitionerComponent } from './practitioner/practitioner.component';
import { PreviewComponent } from './preview/preview.component';


@NgModule({
  declarations: [VideoComponent, ButtonBarComponent, PractitionerComponent, PreviewComponent],
  imports: [
    SharedModule,
    CommonModule,
    CallsRoutingModule
  ]
})
export class CallsModule { }
