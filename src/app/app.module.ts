import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomErrorHandler } from './controllers/ErrorHandler';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


/**
 * Bootstrap
 */
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from './shared/components/shared.module';

import { DeviceDetectorModule } from 'ngx-device-detector';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { CallsModule } from './pages/calls/calls.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ModalModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added
    ButtonsModule.forRoot(),
    SharedModule,
    DeviceDetectorModule.forRoot(),
    CallsModule,
    // keep this at the bottom, so 404 is only shown when no other submodule can route
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    RouterModule
  ],
  providers: [{ provide: ErrorHandler, useClass: CustomErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
