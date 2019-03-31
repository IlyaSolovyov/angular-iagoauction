import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatTabsModule,
  MatDatepickerModule,
  MatInputModule,
  MatExpansionModule,
  MatIconModule,
  MatSlideToggleModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatMenuModule
  } from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule, MatCheckboxModule, MatRadioModule, MatSelectModule, MatTabsModule, MatDatepickerModule,
    MatInputModule, MatExpansionModule, MatIconModule, MatSlideToggleModule, MatTableModule, MatPaginatorModule,
    MatSortModule, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonToggleModule, MatAutocompleteModule,
    MatSnackBarModule, MatDialogModule, MatTooltipModule, MatProgressBarModule, MatProgressSpinnerModule, MatMenuModule
  ],
  exports: [
    MatButtonModule, MatCheckboxModule, MatRadioModule, MatSelectModule, MatTabsModule, MatDatepickerModule,
    MatInputModule, MatExpansionModule, MatIconModule, MatSlideToggleModule, MatTableModule, MatPaginatorModule,
    MatSortModule, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonToggleModule, MatAutocompleteModule,
    MatSnackBarModule, MatDialogModule, MatTooltipModule, MatProgressBarModule, MatProgressSpinnerModule, MatMenuModule
  ]
})
export class MaterialModule {
}
