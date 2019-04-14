import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionsComponent } from './components/auctions/auctions.component';
import { AuctionDetailsResolver } from './components/auction-details/auction-details-resolver.service';
import { AuctionsPageComponent } from './components/auctions-page/auctions-page.component';
import { AuctionDetailsComponent } from './components/auction-details/auction-details.component';

const auctionsRoutes: Routes = [
  {
    path: 'auctions', component: AuctionsComponent,
    children:
      [
        { path: ':year/:month', component: AuctionsPageComponent, pathMatch: 'full' },
        {
          path: ':auctionId',
          component: AuctionDetailsComponent,
          resolve: {
            auction: AuctionDetailsResolver
          }
        }
      ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      auctionsRoutes
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuctionDetailsResolver
  ]
})
export class AuctionsRoutingModule {
}
