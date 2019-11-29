import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder, FormControl, Validators, FormArray, NgForm } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {PitchcreationService} from '../../services/pitchcreation.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-relationshipcreation',
  templateUrl: './relationshipcreation.component.html',
  styleUrls: ['./relationshipcreation.component.css']
})
export class RelationshipcreationComponent implements OnInit {

  relationshipForm: FormGroup;
  public coverageteamSearchCtrl:FormControl=new FormControl();
  public cgbVerticalSearchCtrl:FormControl=new FormControl();
  
  coverageTeamSearchText:any='';
  cgbverticalSearchText:any='';
  protected _onDestroy = new Subject<void>();
  coverageTeamInfoJSON:any;
  cgbVerticalJSON:any;
  isSubmitted:boolean=false;
  relationSpinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Submit',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
  }
  constructor(private formBuilder:FormBuilder,private relationshipService:PitchcreationService,private snackbarService:SnackbarService) { }

  ngOnInit() {
    this.initializeForm()
   
    this.coverageteamSearchCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(()=>{
      this.coverageTeamSearchText = this.coverageteamSearchCtrl.value;
    });
    this.cgbVerticalSearchCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(()=>{
      this.cgbverticalSearchText = this.cgbVerticalSearchCtrl.value;
    });
    this.getCoverageTeamInfo();
    this.getCGBVerticalInfo()
  }

  get f(){
    return this.relationshipForm.controls;
  }
initializeForm(){
  this.relationshipForm = this.formBuilder.group({
    RelationshipName: new FormControl('', Validators.required),
    CoverageTeam: new FormControl('', Validators.required),
    RelationshipType: new FormControl('', Validators.required),
    CBGVerical: new FormControl('', Validators.required),
  });
}
  getCoverageTeamInfo(){
this.relationshipService.getCoverageTeamInfo().subscribe(result=>{
this.coverageTeamInfoJSON=result;
});
  }
  getCGBVerticalInfo(){
    this.relationshipService.getIndustryDetails().subscribe(result=>{
      this.cgbVerticalJSON=result;
    })
  }
  createRelationship(form: NgForm){
    
    if (this.relationshipForm.invalid) {
      this.isSubmitted=true;
      this.relationshipForm.markAllAsTouched();
      return;
    }
    this.relationSpinnerButtonOptions.active=true;
    this.relationshipService.createRelationship(this.relationshipForm.value).subscribe(result=>{
      this.isSubmitted=false;
      this.relationSpinnerButtonOptions.active=false;
      this.snackbarService.message="Pitch creation successfully created."
      this.snackbarService.showSnackbar();
      form.resetForm();
    
    })
  }

}
