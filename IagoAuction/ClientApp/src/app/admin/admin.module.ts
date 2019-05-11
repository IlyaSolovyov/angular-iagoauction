import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { AddPaintingsComponent } from './components/add-paintings/add-paintings.component';
import { AddAuctionsComponent } from './components/add-auctions/add-auctions.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    AddPaintingsComponent,
    AddAuctionsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: []
})
export class AdminModule {
}
