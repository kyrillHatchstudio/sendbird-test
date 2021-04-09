import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InputField } from 'src/app/shared/models/input-field.model';
import { SubmitButton } from 'src/app/shared/models/submit-button.model';
import { environment } from 'src/environments/environment';
import { ButtonType } from '../button-bar/button-type.model';
import { SendbirdService } from '../sendbird/sendbird.service';

const REDIRECT_ON_END = ['calls', 'practitioner'];

@Component({
  selector: 'app-practitioner',
  templateUrl: './practitioner.component.html',
  styleUrls: ['./practitioner.component.scss']
})
export class PractitionerComponent implements OnInit {
  waiting = true;
  sendbirdReady = false;
  userId: string;
  withVideo: boolean;

  formFields: InputField[] = [
    {
      id: 'user-id',
      type: 'text',
      placeholder: `User Id`
    }
  ]
  submitBtn: SubmitButton = {
    text: `Call`
  }

  @ViewChild('localVideo', { static: true }) localVideo: ElementRef<HTMLMediaElement>;
  @ViewChild('remoteVideo', { static: true }) remoteVideo: ElementRef<HTMLMediaElement>;

  callSubscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ss: SendbirdService) { }

  ngOnInit(): void {
    this.ss.callonEnd$.subscribe(ready => {
      if (!ready) return;
      this.redirectAfterEnd();
    });
    this.populateUserId();
    this.ss.init(environment.userA, environment.userA_AccessToken);
    this.ss.connectToSB(this.localVideo, this.remoteVideo)
    .then(() => {
      this.sendbirdReady = true;
    })
    .catch(err => {
      console.error('ERROR WHEN CONNECTING TO SB: ', err);
    })
  }


  populateUserId() {
    this.userId = this.route.snapshot.queryParamMap.get('userid') || environment.userB;
    this.withVideo = (this.route.snapshot.queryParamMap.get('video') !== null);
    this.formFields[0].value = this.userId;
  }

  onSubmit(data) {
    const userId = data['user-id'];
    this.ss.makeCall(userId);
    this.waiting = false;
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
    this.callSubscriptions = [];
    this.router.navigate(REDIRECT_ON_END, { queryParams: { userid: this.userId, video: this.withVideo } });
    window.location.reload();
  }
}
