import { Component, OnInit, Input } from '@angular/core';
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
  public idustrySearchCtrl:FormControl=new FormControl();
  public subIndustrySearchCtrl:FormControl=new FormControl()
  isFromOther:boolean=false;
  coverageTeamSearchText:any='';
  idustrySearchText:any='';
  subIndustrySearchText:any='';
  protected _onDestroy = new Subject<void>();
  coverageTeamInfoJSON:any;
  idustryJSON:any;
  isSubmitted:boolean=false;
  subIndustryInfoJSON:any;
  // =[
  //   {
  //     Name:"Energy",Value:"Energy"
  //   },
  //   {
  //     Name:"Consumer Products",Value:"Consumer Products"
  //   }
  // ]
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

  @Input('childToMaster') masterName: any;
  constructor(private formBuilder:FormBuilder,private relationshipService:PitchcreationService,private snackbarService:SnackbarService) { }

  ngOnInit() {
    console.log("masterName :"+ this.masterName)
    this.initializeForm()
   
    this.coverageteamSearchCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(()=>{
      this.coverageTeamSearchText = this.coverageteamSearchCtrl.value;
    });
    this.idustrySearchCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(()=>{
      this.idustrySearchText = this.idustrySearchCtrl.value;
    });
    this.subIndustrySearchCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(()=>{
      this.subIndustrySearchText = this.subIndustrySearchCtrl.value;
    });
    
    this.getCoverageTeamInfo();
    this.getIdustryInfo();
    this.getSubIndustryInfo();

    if(this.masterName != null && this.masterName !=undefined && this.masterName !='undefined' && this.masterName !='')
    {
      this.isFromOther=true;
      this.f['ClientName'].setValue(this.masterName.clientName);
      this.f['Industry'].setValue(this.masterName.industry);
      this.f['SubIndustry'].setValue(this.masterName.subIndustry);
    }
  }

  get f(){
    return this.relationshipForm.controls;
  }
initializeForm(){
  this.relationshipForm = this.formBuilder.group({
    ClientName: new FormControl('', Validators.required),
    // CoverageTeam: new FormControl('', Validators.required),
    // RelationshipType: new FormControl('', Validators.required),
    Industry: new FormControl('', Validators.required),
    SubIndustry:new FormControl('',Validators.required)
  });
}
  getCoverageTeamInfo(){
this.relationshipService.getCoverageTeamInfo().subscribe(result=>{
this.coverageTeamInfoJSON=result;
});
  }
  getIdustryInfo(){
    this.relationshipService.getIndustryDetails().subscribe(result=>{
      this.idustryJSON=result;
    })
  }
  getSubIndustryInfo(){
    this.relationshipService.getSubIndustryDetails().subscribe(result=>{
      this.subIndustryInfoJSON=result;
    })
  }
  createRelationship(form: NgForm){
    
    if (this.relationshipForm.invalid) {
      this.isSubmitted=true;
      this.relationshipForm.markAllAsTouched();
      return;
    }
    var obj={
      clientId:"0",
      clientName:this.f['ClientName'].value,
      creationUserName:"u364882",
      dctmClientId:null,
      ibParent:"Targa Energy Power",
      ibParentId:"5572",
      icisClientId:"233536503",
      industry:this.f['Industry'].value,
      industryKey:"E&P",
      subIndustry:this.f['SubIndustry'].value,
      subIndustryKey:"ENGY",
      region:"",
      sector:"Midstream",
      parentRelationship:null,
      relationshipManager:null,
      portfolioManager:null,
      relationshipAssociate:null,
      subSector:"Liquids Gathering, Logistics, Terminaling & Storage",
      loadSupervisor:null,
      callingApplication:"ICATCH",
      targetApplication:"IBCM",
      isDeleted:"N",
      CreatedDate:"11/4/2019 10:50:12 AM",
      LastModifiedDate:null,
      LastModifiedById:null,
      subSectorKey:"",
      sectorKey:"",
      isSponsor:"N"
    }
    this.relationSpinnerButtonOptions.active=true;
    this.relationshipService.createRelationship(obj).subscribe(result=>{
      this.isSubmitted=false;
      this.relationSpinnerButtonOptions.active=false;
      this.snackbarService.message=result.IBCM.responseMessage;
      this.snackbarService.showSnackbar();
      form.resetForm();
    
    })
  }

}
