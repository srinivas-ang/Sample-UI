import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import {AppComponent} from '../../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import {Roles} from '../../common/roles.enum';
import {SnackbarService} from '../../services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isShowContent: boolean = false;
  userRoles:any;
  menuptions = MenuOptions;
  menuSelectedOption:any='';
  constructor(public app:AppComponent, private formBuilder:FormBuilder, private snackBarService:SnackbarService, private router :Router) {
    this.userRoles=Roles;
  }

  

  ngOnInit() {
    this.app.userDetails=JSON.parse(localStorage.getItem('loginUserDetails'));
    if(this.app.userDetails){

    }
    else{
this.router.navigateByUrl("/login")
    }
  }

 

  


 


}

export enum MenuOptions {
  PITCH_CREATION = "Pitch Creation",
  STANDARD_FOLDER = "Standard Folder",
  CREDIT_TRANSACTION_FOLDER = "Credit Trasaction Folder",
  RESTRICTED_FOLDER="Restricted Folder",
  RLATIONSHIP_FOLDER="Relationship Creation Folder",
  ADD_CLIENT="Add Client"
}