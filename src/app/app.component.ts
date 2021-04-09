import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router, NavigationEnd } from '@angular/router';
import { scrollToTop } from './utils/scroll';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sendbird-test';

  constructor() {
  }
}