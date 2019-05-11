import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AddPaintingsComponent } from './components/add-paintings/add-paintings.component';
import { AddAuctionsComponent } from './components/add-auctions/add-auctions.component';
import { PaintingCreationResolver } from './components/add-paintings/painting-creation-resolver.service';
import { AuctionCreationResolver } from './components/add-auctions/auction-creation-resolver.service';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'paintings', pathMatch: 'full' },
      { path: 'paintings', component: AddPaintingsComponent, resolve: { painting: PaintingCreationResolver } },
      { path: 'paintings/:paintingId', component: AddPaintingsComponent, resolve: { painting: PaintingCreationResolver } },
      { path: 'auctions', component: AddAuctionsComponent, resolve: { auction: AuctionCreationResolver } },
      { path: 'auctions/:auctionId', component: AddAuctionsComponent, resolve: { auction: AuctionCreationResolver } },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      adminRoutes
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    PaintingCreationResolver,
    AuctionCreationResolver
  ]
})
export class AdminRoutingModule {
}
