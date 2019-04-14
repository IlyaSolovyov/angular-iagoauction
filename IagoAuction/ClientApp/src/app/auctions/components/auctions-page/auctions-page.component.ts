import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Auction } from 'src/app/shared/models/auction';
import { AuctionService } from 'src/app/shared/services/auction.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'auctions-auctions-page',
  templateUrl: './auctions-page.component.html',
  styleUrls: ['./auctions-page.component.scss']
})

export class AuctionsPageComponent {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  dataSource: MatTableDataSource<Auction>;
  displayedColumns: string[] = ["id", "title", "description", "lotsAmount", "startDate", "endDate"];
  auctionCollection: Auction[];
  isLoadingResults = false;

  requestedYear: number;
  requestedMonth: number;

  constructor(private auctionService: AuctionService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.requestedYear = +params.get('year');
      this.requestedMonth = +params.get('month');

      this.isLoadingResults = true;
      this.auctionService.getAuctionsByMonth(this.requestedYear, this.requestedMonth).pipe(delay(1000)).subscribe(auctions => {
        this.auctionCollection = auctions;

        this.dataSource = new MatTableDataSource(this.auctionCollection);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.isLoadingResults = false;
      });
    });
  }

  navigateToAuction(auction:Auction) {
    this.router.navigate(['/auctions/' + auction.id]);
  }
}
