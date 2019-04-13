import { NgModule } from '@angular/core';
import { PaintingsComponent } from './components/paintings/paintings.component';
import { PaintingsRoutingModule } from './paintings-routing.module';
import { MaterialModule } from '../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { PaintingsPageComponent } from './components/paintings-page/paintings-page.component';
import { PaintingDetailsComponent } from './components/painting-details/painting-details.component';
import { PaintingCardComponent } from './components/painting-card/painting-card.component';

@NgModule({
  declarations: [
    PaintingsComponent,
    PaintingsPageComponent,
    PaintingDetailsComponent,
    PaintingCardComponent
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
