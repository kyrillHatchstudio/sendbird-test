import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss']
})
export class CardHeaderComponent implements OnInit {
  @Input() heading: string;
  @Input() showBack: boolean = true;
  @Input() arrowDirection: 'left' | 'right' = 'left';
  @Input() routeTo: string | undefined | null;
  @Input() subHeading: string;

  @Output() onClicked = new EventEmitter<boolean>();

  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
  }

  handleBackClick(event) {
    this.onClicked.emit(true);

    if (this.routeTo) {
      return this.router.navigate([this.routeTo]);
    } 
    if (this.routeTo === undefined) {
      return this.location.back();
    }
    // if null, don't do anything
  }

}
