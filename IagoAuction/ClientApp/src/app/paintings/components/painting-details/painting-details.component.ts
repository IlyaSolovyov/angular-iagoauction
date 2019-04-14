import { Component, Input } from '@angular/core';
import { Painting } from 'src/app/shared/models/painting';
import { ActivatedRoute } from '@angular/router';
import { Auction } from 'src/app/shared/models/auction';

@Component({
    selector: 'paintings-painting-details',
    templateUrl: './painting-details.component.html',
    styleUrls: ['./painting-details.component.scss']
})

export class PaintingDetailsComponent {

  painting: Painting;

  auction: Auction;

  constructor(private route: ActivatedRoute) {
    this.auction = null;
  }

  ngOnInit(): void {

    this.route.data
      .subscribe((data: { auction: Auction, painting: Painting }) => {
        this.painting = new Painting(data.painting.id,
          data.painting.title,
          data.painting.description,
          data.painting.author,
          data.painting.suggestedStartPrice,
          data.painting.imageUrl
        );
        
        this.auction = data.auction!=null
          ? new Auction(data.auction.id,
          data.auction.title,
          data.auction.description,
          data.auction.lots,
          data.auction.startDate,
          data.auction.endDate
          )
          : null;
      });
  }

}
