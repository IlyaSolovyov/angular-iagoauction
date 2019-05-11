import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Painting } from '../../../shared/models/painting';
import { PaintingsService } from '../../../shared/services/paintings.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Auction } from '../../../shared/models/auction';
import { AuctionService } from '../../../shared/services/auction.service';

@Injectable()
export class AuctionCreationResolver implements Resolve<Auction> {
  constructor(private auctionService: AuctionService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Auction> {

    if (route.paramMap.get('auctionId') == null) {
      console.log('No ID specified. Navigating to auction creation page.');
      return null;
    }

    const id = +route.paramMap.get('auctionId');

    return this.auctionService.getAuctionById(id).pipe(
      take(1),
      map(auction => {
        if (auction) {
          return auction;
        } else {
          console.log('Auction with specified ID not found!');
          this.router.navigate(['/admin/auctions']);
          return null;
        }
      })
    );
  }
}
