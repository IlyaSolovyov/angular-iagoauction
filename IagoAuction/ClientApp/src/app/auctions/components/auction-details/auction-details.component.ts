import { Component } from '@angular/core';
import { Auction } from '../../../shared/models/auction';
import { ActivatedRoute } from '@angular/router';
import { Lot } from '../../../shared/models/lot';

@Component({
    selector: 'auctions-auction-details',
    templateUrl: './auction-details.component.html',
    styleUrls: ['./auction-details.component.scss']
})

export class AuctionDetailsComponent {

  auction: Auction;

  links = [
  ];

  activeLink;

  constructor(private route: ActivatedRoute) {
    this.auction = null;
  }

  ngOnInit(): void {

    this.route.data
      .subscribe((data: { auction: Auction}) => {

        this.auction = data.auction != null
          ? new Auction(data.auction.id,
            data.auction.title,
            data.auction.description,
            data.auction.lots,
            data.auction.startDate,
            data.auction.endDate
          )
          : null;

        this.auction.lots.forEach(lot => {
          this.links.push({ path: "lots/" + lot.id, label: lot.painting.title });
        });

        this.activeLink = "lots/" + this.links[0];
      });
  }
}
