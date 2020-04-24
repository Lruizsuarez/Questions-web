import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shadow-card',
  templateUrl: './shadow-card.component.html',
  styleUrls: ['./shadow-card.component.css']
})
export class ShadowCardComponent implements OnInit {

  @Input() image: string;
  @Input() title: string;
  @Input() footerInfo: string;
  @Input() count: number;
  @Input() countToolTip: string;
  @Input() animated: boolean;
  @Output() cardClick = new EventEmitter<void>();

  showTitle = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }


  navigate() {
    if (this.animated) {
      this.cardClick.emit();
    } else {
      console.log('not animated card');
    }
  }

}
