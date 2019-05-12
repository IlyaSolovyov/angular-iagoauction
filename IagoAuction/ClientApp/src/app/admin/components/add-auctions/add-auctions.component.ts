import { Component } from '@angular/core';
import { Auction } from '../../../shared/models/auction';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AuctionService } from '../../../shared/services/auction.service';
import { PaintingsService } from '../../../shared/services/paintings.service';
import { ActivatedRoute } from '@angular/router';
import { Painting } from '../../../shared/models/painting';
import { AuctionDto } from '../../../shared/dto/auction-dto';
import * as moment from 'moment';

@Component({
    selector: 'admin-add-auctions',
    templateUrl: './add-auctions.component.html',
    styleUrls: ['./add-auctions.component.scss']
})

export class AddAuctionsComponent {

  auction: Auction;

  availablePaintings: Painting[];

  mode: string;
  title: string;

  auctionCreationForm: FormGroup;
  auctionPaintings:FormArray;

  selectedPaintingIds: number[]
  constructor(
    private paintingsService: PaintingsService,
    private auctionService: AuctionService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
  
    this.auction = new Auction(0, '', '', [], new Date(), new Date());
    this.selectedPaintingIds = [];
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { auction: Auction }) => {
        if (data.auction) {
          this.auction = new Auction(data.auction.id,
            data.auction.title,
            data.auction.description,
            data.auction.lots,
            data.auction.startDate,
            data.auction.endDate
          );
          this.mode = AuctionCreationType.Edit;
          this.title = `Edit auction #${this.auction.id}`;
        } else {
          this.mode = AuctionCreationType.Create;
          this.title = 'Create new auction';
        }

        this.auctionCreationForm = this.formBuilder.group({
          titleControl: [this.auction.title],
          descriptionControl: [this.auction.description],
          startDateControl: [this.auction.startDate],
          endDateControl: [this.auction.endDate],
          paintingsControl: this.formBuilder.array([])
        });

        let paintingsControlArray = this.auctionCreationForm.get('paintingsControl') as FormArray;

        this.auction.lots.forEach(lot => {
          paintingsControlArray.push(this.formBuilder.control(lot.painting));
        });

        for (let i = 0; i < paintingsControlArray.length; i++) {
          paintingsControlArray.at(i).setValue(this.auction.lots[i].painting);
        }

        this.paintingsService.getAvailablePaintings().subscribe(paintings => {
          console.log(paintings);
          this.availablePaintings = paintings;
        })
      });
  }

  addPainting() {
    this.selectedPaintingIds.push(-1);
    let paintingsControlArray = this.auctionCreationForm.get('paintingsControl') as FormArray;
    paintingsControlArray.push(this.formBuilder.control(''));
  }

  removePainting() {
    let paintingsControlArray = this.auctionCreationForm.get('paintingsControl') as FormArray;
    paintingsControlArray.removeAt(paintingsControlArray.length-1);
  }

  onSubmit() {
    let title = this.auctionCreationForm.get('titleControl').value;
    let description = this.auctionCreationForm.get('descriptionControl').value;
    let startDate = moment(this.auctionCreationForm.get('startDateControl').value).toDate();
    let endDate = moment(this.auctionCreationForm.get('endDateControl').value).toDate();
    let auctionDto: AuctionDto = new AuctionDto(0, title, description, this.selectedPaintingIds, startDate, endDate);

    if (this.mode == AuctionCreationType.Edit) {
      console.log('Updating auction:');
      console.log(auctionDto);
      this.auctionService.updateAuction(auctionDto, this.auction.id).subscribe();
    } else {
      console.log('Adding auction:');
      console.log(auctionDto);
      this.auctionService.addAuction(auctionDto).subscribe();
    }
    
  }

}

export const AuctionCreationType = Object.freeze({
  Create: 'Create',
  Edit: 'Edit'
})
