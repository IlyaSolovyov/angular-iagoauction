import { NgModule } from '@angular/core';
import { PaintingsComponent } from './components/paintings/paintings.component';
import { PaintingsRoutingModule } from './paintings-routing.module';
import { MaterialModule } from '../shared/modules/material.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PaintingsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PaintingsRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class PaintingsModule {
}
