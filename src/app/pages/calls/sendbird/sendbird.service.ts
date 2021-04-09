import { ElementRef, Injectable } from '@angular/core';
import { DirectCall } from 'sendbird-calls';
import { environment } from 'src/environments/environment';
import * as SendBirdCall from 'sendbird-calls';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SendbirdService {
    callonGoing$ = new Subject<boolean>();
    callonEnd$ = new Subject<boolean>();

    /**
       * My video element
       */
    localVideo: ElementRef<HTMLMediaElement>;

    /**
     * Remove video element
     */
    remoteVideo: ElementRef<HTMLMediaElement>;

    /**
     * My Sendbird information
     */
    APP_ID = environment.sendbirdAppId;
    USER_ID: string;
    ACCESS_TOKEN: string;

    /**
     * Object to store an active call
     */
    currentCall: DirectCall;

    isVideoCall: boolean;

    constructor() {
    }

    init(user: string, accessToken: string, isVideoCall: boolean = true) {
        this.USER_ID = user;
        this.ACCESS_TOKEN = accessToken;
        this.isVideoCall = isVideoCall;
    }

    /**
     * Start the process of connecting to Sendbird calls
     */
    async connectToSB(localVideo: ElementRef<HTMLMediaElement>, remoteVideo: ElementRef<HTMLMediaElement>) {
        this.localVideo = localVideo;
        this.remoteVideo = remoteVideo;
        await this.connectCalls();
        await this.connectToSocket();
        this.waitForCalls();
    }

    private async connectCalls() {
        /**
         * Init Sendbird Calls
         */
        SendBirdCall.init(this.APP_ID);
        SendBirdCall.setLoggerLevel(SendBirdCall.LoggerLevel.INFO);
        /**
         * Ask for video and audio permission
         */
        SendBirdCall.useMedia({ audio: true, video: this.isVideoCall });
        /**
         * Authorize this user
         */
        const authOption = {
            userId: this.USER_ID,
            accessToken: this.ACCESS_TOKEN
        };
        return new Promise((resolve, reject) => {
            SendBirdCall.authenticate(authOption, (result: any, err: any) => {
                console.log('Auth result: ', result);
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    /**
     * Sendbird calls has its own socket to Sendbird
     */
    private async connectToSocket() {
        await SendBirdCall.connectWebSocket();
    }

    waitForCalls() {
        SendBirdCall.addListener('UNIQUE_HANDLER_ID-123', {
            onRinging: (call: DirectCall) => {
                console.log('Ringing...');
                this.currentCall = call;
                this.acceptCall();

                call.onEstablished = (call: DirectCall) => {
                    console.log('onEstablished');
                }
                call.onConnected = (call: DirectCall) => {
                    console.log('onConnected');
                    this.callonGoing$.next(true);
                }
                call.onEnded = (call: DirectCall) => {
                    console.log('onEnded');
                    this.currentCall = null;
                    this.callonEnd$.next(true);
                }
                call.onReconnecting = (call) => {
                    this.currentCall.end();
                };
                call.onRemoteAudioSettingsChanged = (call: DirectCall) => {
                    console.log('Remote audio settings changed');
                }
                call.onRemoteVideoSettingsChanged = (call: DirectCall) => {
                    console.log('Remote video settings changed');
                }
            },
            onAudioInputDeviceChanged: (currentAudioInputDevice: InputDeviceInfo, availableAudioInputDevices: InputDeviceInfo[]) => {
                console.log('Local audio input device changed');
            },
            onAudioOutputDeviceChanged: (currentAudioOutputDevice: MediaDeviceInfo, availableAudioOutputDevices: MediaDeviceInfo[]) => {
                console.log('Local audio output device changed');
            },
            onVideoInputDeviceChanged: (currentVideoInputDevice: InputDeviceInfo, availableVideoInputDevices: InputDeviceInfo[]) => {
                console.log('Local video input device changed');
            }
        });
    }

    private acceptCall() {
        if (!this.currentCall) {
            return;
        }
        const acceptParams: SendBirdCall.AcceptParams = {
            callOption: {
                localMediaView: this.localVideo.nativeElement,
                remoteMediaView: this.remoteVideo.nativeElement,
                videoEnabled: this.isVideoCall,
                audioEnabled: true
            }
        };
        this.currentCall.accept(acceptParams);
    }

    /**
     * Let's make a call
     */
    makeCall(callToUserId: string) {
        const dialParams = {
            userId: callToUserId,
            isVideoCall: this.isVideoCall,
            callOption: {
                localMediaView: this.localVideo.nativeElement,
                remoteMediaView: this.remoteVideo.nativeElement,
                videoEnabled: this.isVideoCall,
                audioEnabled: true
            }
        };
        const call = SendBirdCall.dial(dialParams, (call: DirectCall, error) => {
            if (error) {
                console.dir(error);
                alert('Dial failed. Check logs')
            }
        });

        call.onEstablished = (call: DirectCall) => {
            console.log('onEstablished');
        };
        call.onConnected = (call: DirectCall) => {
            console.log('onConnected');
            this.currentCall = call;
            this.callonGoing$.next(true);
        };
        call.onEnded = (call: DirectCall) => {
            console.log('onEnded');
            this.currentCall = null;
            this.callonEnd$.next(true);
        };
        call.onReconnecting = (call) => {
            this.currentCall.end();
        };
        call.onRemoteAudioSettingsChanged = (call) => {
            console.log('Remote user changed audio settings');
        };
        call.onRemoteVideoSettingsChanged = (call) => {
            console.log('Remote user changed video settings');
        };
    }

    /**
     * Let's end this call
     */
    endCall() {
        if (!this.currentCall) {
            return;
        }
        this.currentCall.end();
    }
}
