import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-inverted',
  templateUrl: './button-inverted.component.html',
  styleUrls: ['./button-inverted.component.scss']
})
export class ButtonInvertedComponent implements OnInit {
  @Input() text: string;
  @Input() color: 'white' | 'green' | 'grey' = 'green';
  @Input() routeTo: string;
  @Input() smallFont: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
