import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { AuctionsRoutingModule } from './auctions-routing.module';
import { AuctionsComponent } from './components/auctions/auctions.component';

@NgModule({
  declarations: [
    AuctionsComponent
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
