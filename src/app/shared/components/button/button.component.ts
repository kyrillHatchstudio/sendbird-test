import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() text: string; // text can be given either as attribute or as child. But don't do both!
  @Input() color: 'green' | 'red' | 'transparent' | 'greenBorder' | 'greenTextOnly' | 'white' = 'green';
  // width in percent. Current supported values are 50 and 100
  @Input() width: 50 | 100 = 50; // width in percent
  @Input() removePadding: boolean = false;
  @Input() removeAllUppercase: boolean = false;
  @Input() fontSize: 'medium' | 'small' = 'medium';
  @Input() submit: boolean = false;
  @Input() textAlign: 'center' | 'left' = 'center';
  @Input() showArrow: boolean = false;
  @Input() disabled: boolean = false;

  @Output() onClick= new EventEmitter<any>();

  arrow = faArrowRight;

  constructor() { }

  ngOnInit(): void {
  }

  onClickButton(event) {
    this.onClick.emit(event);
  }

}
