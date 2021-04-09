import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PractitionerComponent } from './practitioner/practitioner.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  {
    path: 'calls', children: [
      { path: 'video', component: VideoComponent, data: {video: true} },
      { path: 'audio', component: VideoComponent, data: {video: false} },
      { path: 'practitioner', component: PractitionerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallsRoutingModule { }
