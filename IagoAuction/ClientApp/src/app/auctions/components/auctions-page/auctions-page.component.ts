import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'auctions-auctions-page',
  templateUrl: './auctions-page.component.html',
  styleUrls: ['./auctions-page.component.scss']
})

export class AuctionsPageComponent {

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let year = +params.get('year');
      let month = +params.get('month');
    });
  }
}
