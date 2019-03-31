import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintingsComponent } from './components/paintings/paintings.component';

const paintingsRoutes: Routes = [
  { path: 'paintings', component: PaintingsComponent, pathMatch: 'full' },
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
