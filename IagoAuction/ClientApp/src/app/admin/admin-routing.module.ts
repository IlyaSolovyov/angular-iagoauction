import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';

const adminRoutes: Routes = [
  { path: 'admin', component: AdminComponent, pathMatch: 'full' },
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
