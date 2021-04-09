import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-button-small',
  templateUrl: './button-small.component.html',
  styleUrls: ['./button-small.component.scss']
})
export class ButtonSmallComponent implements OnInit {
  @Input() text: string;
  @Input() color: 'green' | 'grey' = 'green';

  @Output() onClick= new EventEmitter<any>();

  @ViewChild('button') nativeElement: ElementRef<HTMLButtonElement>;

  constructor() { }

  ngOnInit(): void {
  }

  onClickButton(event) {
    this.onClick.emit(event);
  }

}
