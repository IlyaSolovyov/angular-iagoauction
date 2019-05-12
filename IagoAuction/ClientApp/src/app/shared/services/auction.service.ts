import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { Observable } from 'rxjs';
import { Auction } from '../models/auction';
import { map } from 'rxjs/operators';
import { AuctionDto } from '../dto/auction-dto';

@Injectable()
export class AuctionService {

  private auctionResource = '/api/auctions';

  constructor(protected http: HttpClient) { }

  getAuctionById(id: number): Observable<Auction> {
    return this.http.get<Auction>('/api/auctions/' + id);
  }

  getAuctionsByMonth(year: number, month: number): Observable<Auction[]> {
    return this.http.get<Auction[]>('/api/auctions/' + year + '/' + month);
  }

  getAuctionContainingPainting(paintingId: number): Observable<Auction> {
    return this.http.get<Auction>('/api/auctions/painting/' + paintingId);
  }

  addAuction(auction: AuctionDto) {
    const formData = new FormData();
    formData.append('Title', auction.title);
    formData.append('Description', auction.description);
    formData.append('StartDate', auction.startDate.toDateString());
    formData.append('EndDate', auction.endDate.toDateString());
    for (let i = 0; i <auction.paintingIds.length; i++) {
      formData.append('PaintingIds[' + i + "]", auction.paintingIds[i].toString());
    }

    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });

    return this.http.post('/api/auctions', formData, { headers: headers });
  }

  updateAuction(auction: AuctionDto, auctionId: number) {
    const formData = new FormData();
    formData.append('Title', auction.title);
    formData.append('Description', auction.description);
    formData.append('StartDate', auction.startDate.toDateString());
    formData.append('EndDate', auction.endDate.toDateString());
    formData.append('PaintingIds', JSON.stringify(auction.paintingIds)) ;
    for (let i = 0; i < auction.paintingIds.length; i++) {
      formData.append('PaintingIds[' + i + "]", auction.paintingIds[i].toString());
    }

    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });

    return this.http.put('/api/auctions' + auctionId, formData, { headers: headers });
  }

  makeBid(newBid: number, lotId: number) {
    const formData = new FormData();
    formData.append('Value', newBid.toString());
    formData.append('Date', new Date().toDateString());
    formData.append('BidderId', "1");
    formData.append('LotId', lotId.toString());

    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });

    return this.http.post('/api/bids', formData, { headers: headers });
  }
}
