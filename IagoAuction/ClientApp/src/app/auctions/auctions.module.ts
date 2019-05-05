import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { AuctionsRoutingModule } from './auctions-routing.module';
import { AuctionsComponent } from './components/auctions/auctions.component';
import { AuctionsPageComponent } from './components/auctions-page/auctions-page.component';
import { AuctionDetailsComponent } from './components/auction-details/auction-details.component';
import { AuctionLotComponent } from './components/auction-lot/auction-lot.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuctionsComponent,
    AuctionsPageComponent,
    AuctionDetailsComponent,
    AuctionLotComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuctionsRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: []
})
export class AuctionsModule {
}
