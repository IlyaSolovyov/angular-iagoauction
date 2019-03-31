import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class AdminModule {
}
