import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DeviceDetectorService } from 'ngx-device-detector';
import { from } from 'rxjs';
import { AppComponent } from './app.component';
import { PopupService } from './controllers/services/popup/popup.service';
import { PWAService } from './controllers/services/pwa-service/pwa.service';
import { RingingService } from './pages/communicate/video-service/ringing.service';

describe('AppComponent', () => {
  class DeviceDetectorServiceStub {
    isMobile = () => true;
  }
  class RouterStub {
    events = from([]);
  }
  class PWAServiceStub {
    init() {}
  }
  class RingingServiceStub {
    listenToIncomingCalls() {}
  }

  class PopupServiceStub {
    log = () => {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: DeviceDetectorService, useClass: DeviceDetectorServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: PWAService, useClass: PWAServiceStub },
        { provide: RingingService, useClass: RingingServiceStub },
        { provide: PopupService, useClass: PopupServiceStub },
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'hol-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('hol-app');
  });
});
