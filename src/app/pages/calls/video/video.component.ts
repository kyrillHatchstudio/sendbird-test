import { ReturnStatement } from '@angular/compiler';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ButtonType } from '../button-bar/button-type.model';
import { SendbirdService } from '../sendbird/sendbird.service';

export const REDIRECT_ON_MISSING_SESSION = ['communicate'];
export const REDIRECT_ON_ENDED = ['communicate', 'finished'];

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  waiting = true;
  sendbirdReady = false;
  video: boolean;

  @ViewChild('localVideo', { static: true }) localVideo: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo', { static: true }) remoteVideo: ElementRef<HTMLVideoElement>;

  callSubscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute, 
    private ss: SendbirdService) { }

  ngOnInit(): void {
    this.ss.callonEnd$.subscribe(ready => {
      if (!ready) return;
      this.redirectAfterEnd();
    })
    this.ss.callonGoing$.subscribe(ready => {
      if (!ready) return;
      this.waiting = false;
    });

    this.video = this.route.snapshot.data.video;
    this.ss.init(environment.userB, '');
    this.ss.connectToSB(this.localVideo, this.remoteVideo)
    .then(() => {
      this.sendbirdReady = true;
    })
    .catch((err) => {
      console.error('SB ERROR: ', err);
    })
  }

  handleButtonClicked(type: ButtonType) {
    const ACTIONS = {
      end: () => {
        this.ss.endCall();
      }
    };
    ACTIONS[type]();
  }

  redirectAfterEnd() {
    this.callSubscriptions.forEach(s => s.unsubscribe());
    window.location.reload();
  }

}
