import { Router, ActivatedRoute } from '@angular/router';
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
  @Input() context: string;
  @Output() cardClick = new EventEmitter<void>();

  private id: string;

  showTitle = false;

  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    this.id = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit() {
  }


  navigate() {
    if (this.animated) {
      this.cardClick.emit();
    } else {
      this.navigateContext();
    }
  }

  navigateContext() {
    this.router.navigate([this.context], { queryParams: { cid: this.id } });
  }

}
