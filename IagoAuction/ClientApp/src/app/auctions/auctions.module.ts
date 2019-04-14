import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { AuctionsRoutingModule } from './auctions-routing.module';
import { AuctionsComponent } from './components/auctions/auctions.component';
import { AuctionsPageComponent } from './components/auctions-page/auctions-page.component';
import { AuctionDetailsComponent } from './components/auction-details/auction-details.component';

@NgModule({
  declarations: [
    AuctionsComponent,
    AuctionsPageComponent,
    AuctionDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuctionsRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class AuctionsModule {
}
