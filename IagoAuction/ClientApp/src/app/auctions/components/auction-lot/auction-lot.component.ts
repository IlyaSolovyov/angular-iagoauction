import { Component, ViewChild } from '@angular/core';
import { Lot } from '../../../shared/models/lot';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Bid } from '../../../shared/models/bid';
import { FormGroupDirective, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuctionService } from '../../../shared/services/auction.service';

@Component({
  selector: 'auctions-auction-lot',
  templateUrl: './auction-lot.component.html',
  styleUrls: ['./auction-lot.component.scss']
})

export class AuctionLotComponent {
  @ViewChild(FormGroupDirective)
  form;


  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;


  dataSource: MatTableDataSource<Bid>;
  displayedColumns: string[] = ["bidder", "value", "dateTime"];

  lot: Lot;

  constructor(private route: ActivatedRoute, private auctionService: AuctionService, public snackBar: MatSnackBar) {
  }

  betGroup = new FormGroup({
    betControl: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {

    this.route.data
      .subscribe((data: { lot: Lot }) => {

        this.lot = data.lot != null
          ? new Lot(data.lot.id,
            data.lot.painting,
            data.lot.bids
          )
          : null;


        this.dataSource = new MatTableDataSource(this.lot.bids);
      });
  }

  onSubmit() {
    const newBet: number = this.betGroup.get('betControl').value;

    this.auctionService.makeBet(newBet).subscribe(result => {

        this.snackBar.open(result, 'Successfully placed bet.', { duration: 3000, });
        this.betGroup.reset();
        if (this.form) {
          this.form.resetForm();
        }

      },
      error => {
        this.snackBar.open(error, 'Error placing bet. Please try again.', { duration: 3000, });
        //error handling
      });
  }
}
