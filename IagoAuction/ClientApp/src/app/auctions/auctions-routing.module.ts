import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionsComponent } from './components/auctions/auctions.component';

const auctionsRoutes: Routes = [
  { path: 'auctions', component: AuctionsComponent, pathMatch: 'full' },
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
  ]
})
export class AuctionsRoutingModule {
}
