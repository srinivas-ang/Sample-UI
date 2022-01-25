import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NPSPitchCreationService } from 'src/app/services/npspitch-creation.service';

@Component({
  selector: 'app-editcollaboration',
  templateUrl: './editcollaboration.component.html',
  styleUrls: ['./editcollaboration.component.css']
})
export class EditcollaborationComponent implements OnInit {

  isSubmitted: boolean = false;
  _editCollaborationForm: FormGroup;
  teamInfoJson:any=[];
  folderSearchText:any='';
  lstFolders:any=[];
  protected _onDestroy = new Subject<void>();
  updateSpinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Update',
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
  public folderSearchCtrl:FormControl=new FormControl();
  constructor(private formBuilder: FormBuilder,private createPitchService : NPSPitchCreationService,) { 
    this.initForm();
    this.folderSearchCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(()=>{
      this.folderSearchText = this.folderSearchCtrl.value;
    });
   
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
    this._editCollaborationForm = new FormGroup({
      FolderName: new FormControl('', Validators.required),
      TeamInfo: new FormControl('', Validators.required),
    });
  }
  get f() {
    return this._editCollaborationForm.controls;
  }
 
  UpdateCollaboration(){
    if (this._editCollaborationForm.invalid) {
      this.isSubmitted = true;
      
      this._editCollaborationForm.markAllAsTouched();
      return;
    }
  }
 
  
  cancelCollaboration(){
   
    this._editCollaborationForm.reset();
       this.initForm();
     
  }

}
