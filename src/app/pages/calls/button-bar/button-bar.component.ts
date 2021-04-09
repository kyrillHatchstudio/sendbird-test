import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonType } from './button-type.model';

@Component({
  selector: 'app-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: ['./button-bar.component.scss']
})
export class ButtonBarComponent implements OnInit {

  @Output() buttonClicked = new EventEmitter<ButtonType>();

  constructor() { }

  ngOnInit(): void {
  }

  handleClick(type: ButtonType) {
    this.buttonClicked.emit(type);
  }

}
