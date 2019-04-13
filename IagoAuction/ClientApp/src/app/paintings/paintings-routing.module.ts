import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintingsComponent } from './components/paintings/paintings.component';
import { PaintingDetailsComponent } from './components/painting-details/painting-details.component';
import { PaintingsPageComponent } from './components/paintings-page/paintings-page.component';

const paintingsRoutes: Routes = [
  {
    path: 'paintings', component: PaintingsComponent,
    children:
      [
        { path: '', redirectTo: '1', pathMatch: 'full' },
        { path: ':pageId', component: PaintingsPageComponent, pathMatch: 'full' },
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
