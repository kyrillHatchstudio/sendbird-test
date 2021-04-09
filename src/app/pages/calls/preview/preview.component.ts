import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @Input() videoNeeded: boolean = false;
  localStream: MediaStream;

  @ViewChild('localVideoPreview', { static: false }) localVideoPreview: ElementRef<HTMLMediaElement>;

  constructor() { }

  ngOnInit(): void {
      navigator.mediaDevices.getUserMedia({ video: {facingMode:'user'}, audio: true })
        .then(stream => {
          this.localStream = stream;
        })
        .catch(err => {
        });
  }

  togglePreview() {
    if (this.localVideoPreview.nativeElement.srcObject) {
      this.localVideoPreview.nativeElement.srcObject = null;
    } else {
      this.localVideoPreview.nativeElement.srcObject = this.localStream;
      this.localVideoPreview.nativeElement.muted = true;
    }
  }

}
