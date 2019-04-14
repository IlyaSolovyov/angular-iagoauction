import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintingsComponent } from './components/paintings/paintings.component';
import { PaintingDetailsComponent } from './components/painting-details/painting-details.component';
import { PaintingsPageComponent } from './components/paintings-page/paintings-page.component';
import { PaintingDetailsPaintingResolver } from './components/painting-details/painting-details-painting-resolver.service';
import { PaintingDetailsAuctionResolver } from './components/painting-details/painting-details-auction-resolver.service';

const paintingsRoutes: Routes = [
  {
    path: 'paintings', component: PaintingsComponent,
    children:
      [
        { path: '', redirectTo: '1', pathMatch: 'full' },
        { path: ':pageId', component: PaintingsPageComponent, pathMatch: 'full' },
        {
          path: 'details/:paintingId',
          component: PaintingDetailsComponent,
          resolve: {
            painting: PaintingDetailsPaintingResolver,
            auction: PaintingDetailsAuctionResolver
          }
        }
      ]
  },
  { path: '', redirectTo: 'paintings', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      paintingsRoutes
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    PaintingDetailsPaintingResolver,
    PaintingDetailsAuctionResolver
  ]
})
export class PaintingsRoutingModule {
}
