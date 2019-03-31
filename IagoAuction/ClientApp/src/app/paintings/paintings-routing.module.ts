import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintingsComponent } from './components/paintings/paintings.component';
import { PaintingsListComponent } from './components/paintings-list/paintings-list.component';
import { PaintingDetailsComponent } from './components/painting-details/painting-details.component';

const paintingsRoutes: Routes = [
  {
    path: 'paintings', component: PaintingsComponent,
    children:
      [
        { path: '', redirectTo: '1', pathMatch: 'full' },
        { path: ':pageId', component: PaintingsListComponent, pathMatch: 'full' },
        {
          path: 'details/:paintingId',
          component: PaintingDetailsComponent
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
  ]
})
export class PaintingsRoutingModule {
}
