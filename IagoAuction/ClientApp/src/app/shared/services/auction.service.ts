import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Observable } from 'rxjs';
import { Auction } from '../models/auction';
import { map } from 'rxjs/operators';

@Injectable()
export class AuctionService {

  private auctionResource = 'assets/json/auctions.json';

  constructor(protected http: HttpClient) { }

  getAuctionById(id: number): Observable<Auction> {
    return this.http.get<Auction[]>(this.auctionResource).pipe(map(auctions => {
      return auctions.find(auction => auction.id === id);
    }));
  }

  getAuctionBatch(batchSize: number, batchIndex: number): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.auctionResource).pipe(map(auctions => {
      return auctions.slice(batchIndex * batchSize, batchIndex * batchSize + batchSize);
    }));
  }

  getAuctionContainingPainting(paintingId: number): Observable<Auction> {
    return this.http.get<Auction[]>(this.auctionResource).pipe(map(auctions => {
      let desiredAuction = null;
      auctions.forEach(auction => {
        auction.lots.forEach(lot => {
          if (lot.painting.id == paintingId) {
            desiredAuction = auction;
          }
        })
      })
      return desiredAuction;
    }));
  }
}
