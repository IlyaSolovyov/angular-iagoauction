import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auction } from 'src/app/shared/models/auction';
import { AuctionService } from 'src/app/shared/services/auction.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class PaintingDetailsAuctionResolver implements Resolve<Auction>  {
  constructor(private auctionService: AuctionService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Auction> {
    const paintingId = +route.paramMap.get('paintingId');

    return this.auctionService.getAuctionContainingPainting(paintingId).pipe(
      take(1),
      map(auction => {
        if (auction) {
          return auction;
        } else {
          return null;
        }
      })
    );
  }
}
