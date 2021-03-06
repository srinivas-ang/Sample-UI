import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCheckboxModule,MatPaginatorModule,MatSortModule,
  MatFormFieldModule, MatInputModule,MatAutocompleteModule,MatTooltipModule,
  MatTableModule, MatToolbarModule, MatIconModule, MatTabsModule, MatExpansionModule, MatGridListModule, MatCardModule, MatRadioModule
  , MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatSnackBarModule, MatDialogModule, MatMenuModule,
  MatDividerModule, MatSlideToggleModule, MatListModule
} from '@angular/material';
import  {MatProgressButtonsModule} from 'mat-progress-buttons';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
const modules = [
  MatButtonModule, MatCheckboxModule,MatAutocompleteModule,NgxMatSelectSearchModule,
  MatFormFieldModule, MatInputModule,MatPaginatorModule,MatSortModule,MatTooltipModule,
  MatTableModule, MatToolbarModule, MatIconModule, MatTabsModule, MatExpansionModule, MatGridListModule, MatCardModule, MatRadioModule
  , MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatSnackBarModule, MatDialogModule, MatMenuModule,
  MatDividerModule, MatSlideToggleModule, MatListModule,MatProgressButtonsModule
];

@NgModule({
  declarations: [],
  imports: [
    modules
  ],
  exports:[
    modules
  ]
})
export class MaterialModule { }
