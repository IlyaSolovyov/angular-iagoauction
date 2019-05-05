import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionsComponent } from './components/auctions/auctions.component';
import { AuctionDetailsResolver } from './components/auction-details/auction-details-resolver.service';
import { AuctionsPageComponent } from './components/auctions-page/auctions-page.component';
import { AuctionDetailsComponent } from './components/auction-details/auction-details.component';
import { AuctionLotResolver } from './components/auction-lot/auction-lot-resolver.service';
import { AuctionLotComponent } from './components/auction-lot/auction-lot.component';

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
          },
          children: [
            { path: 'lots', component: AuctionLotComponent, pathMatch: 'full', resolve: { lot: AuctionLotResolver } },
            { path: 'lots/:lotId', component: AuctionLotComponent, pathMatch: 'full', resolve: { lot: AuctionLotResolver }  },
          ]
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
    AuctionDetailsResolver,
    AuctionLotResolver
  ]
})
export class AuctionsRoutingModule {
}
