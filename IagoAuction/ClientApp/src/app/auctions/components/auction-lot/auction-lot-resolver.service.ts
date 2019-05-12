import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auction } from 'src/app/shared/models/auction';
import { AuctionService } from 'src/app/shared/services/auction.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Lot } from '../../../shared/models/lot';

@Injectable()
export class AuctionLotResolver implements Resolve<Lot>  {
  constructor(private auctionService: AuctionService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Lot> {
    const auctionId = +route.parent.paramMap.get('auctionId');
    const lotId = +route.paramMap.get('lotId');

    return this.auctionService.getAuctionById(auctionId).pipe(
      take(1),
      map((auction: Auction) => {
        console.log("Opened following auction lot:");
        console.log(auctionId);
        console.log(lotId);
        console.log(auction);
        if (auction && auction.lots.find(lot => lot.id == lotId) != undefined) {
          return auction.lots.find(lot => lot.id == lotId);
        } else {
          return null;
        }
      })
    );
  }
}

