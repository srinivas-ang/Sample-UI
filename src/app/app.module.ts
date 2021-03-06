import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './components/home/home.component';
import { TeaminformatonComponent } from './components/home/teaminformaton/teaminformaton.component';
import { PitchcreationComponent } from './components/pitchcreation/pitchcreation.component';
import { ListfilterPipe } from './pipes/listfilter.pipe';
import { RelationshipcreationComponent } from './components/relationshipcreation/relationshipcreation.component';
import { CredittransactionComponent } from './components/credittransaction/credittransaction.component';
import { AddclientComponent } from './components/addclient/addclient.component';
import { ViewclientComponent } from './components/addclient/viewclient/viewclient.component';
import { NonProductspecifcpitchcreationComponent } from './components/non-productspecifcpitchcreation/non-productspecifcpitchcreation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TeaminformatonComponent,
    PitchcreationComponent,
    ListfilterPipe,
    RelationshipcreationComponent,
    CredittransactionComponent,
    AddclientComponent,
    ViewclientComponent,
    NonProductspecifcpitchcreationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularMultiSelectModule
  ],
  entryComponents:[TeaminformatonComponent,ViewclientComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
