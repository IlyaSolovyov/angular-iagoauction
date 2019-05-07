import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AddPaintingsComponent } from './components/add-paintings/add-paintings.component';
import { AddAuctionsComponent } from './components/add-auctions/add-auctions.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'paintings', pathMatch: 'full' },
      {
        path: 'paintings',
        component: AddPaintingsComponent
      },
      {
        path: 'auctions',
        component: AddAuctionsComponent
      }
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
  ]
})
export class AdminRoutingModule {
}
