import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { NPSPitchCreationService } from 'src/app/services/npspitch-creation.service';

@Component({
  selector: 'app-collaborationmanagement',
  templateUrl: './collaborationmanagement.component.html',
  styleUrls: ['./collaborationmanagement.component.css']
})
export class CollaborationmanagementComponent implements OnInit {
  isSubmitted: boolean = false;
  _collaborationForm: FormGroup;
  teamInfoJson:any=[];
  createSpinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Create',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    // buttonIcon: {
    //   fontIcon: 'add'
    // }
  }
  cancelSpinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Cancel',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    // buttonIcon: {
    //   fontIcon: 'add'
    // }
  }
  teamInfoDropdownSettings: any = {};
  constructor(private formBuilder: FormBuilder,private createPitchService : NPSPitchCreationService,) { 
    this.initForm();
   
  }

  ngOnInit(): void {
    this.teamInfoDropdownSettings = {
      text: "Select Team Info",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableCheckAll: false,
      labelKey: 'userName',
      primaryKey: 'userLoginName',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    this.createPitchService.getUsersList().subscribe(result=>{
      console.log('res = ' + result);
      // this.userListJson=result;
      this.teamInfoJson=result['users'];
  });
  
  }
  initForm(){
    this._collaborationForm = new FormGroup({
      FolderName: new FormControl('', Validators.required),
      TeamInfo: new FormControl('', Validators.required),
    });
  }
  get f() {
    return this._collaborationForm.controls;
  }
 
  createCollaboration(){
    if (this._collaborationForm.invalid) {
      this.isSubmitted = true;
      
      this._collaborationForm.markAllAsTouched();
      return;
    }
  }
 
  
  cancelCollaboration(){
   
    this._collaborationForm.reset();
       this.initForm();
     
  }
  // COLLABORATION_MNGT="Collaboration Management"
  // <div  *ngIf="menuSelectedOption == menuptions.COLLABORATION_MNGT">
  //                   <app-collaborationmanagement></app-collaborationmanagement>
  //              </div>
  //              <a (click)="menuSelectedOption=menuptions.COLLABORATION_MNGT" class="cursor-pointer">
  //              <mat-list-item role="listitem"  class="border_bottom"
  //                   [ngClass]="{'bg_primary': menuSelectedOption == menuptions.COLLABORATION_MNGT}">
  //                   {{menuptions.COLLABORATION_MNGT}}</mat-list-item>
  //         </a>
}
