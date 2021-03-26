import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CredittransactionService } from 'src/app/services/credittransaction.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-creditactioncreation',
  templateUrl: './creditactioncreation.component.html',
  styleUrls: ['./creditactioncreation.component.css']
})
export class CreditactioncreationComponent implements OnInit {

  isSubmitted: boolean = false;
  _creditActionCreationForm: FormGroup;
  minDate: Date = new Date();
  public industrySearchCtrl: FormControl = new FormControl();
  industrySearchText: any = '';
  public clientNameSearchCtrl: FormControl = new FormControl();
  clientNameSearchText: any = '';
  public reportTypeSearchCtrl: FormControl = new FormControl();
  reportTypeSearchText: any = '';


  teamInfoDropdownSettings = {
    text: "Select Team Info",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableCheckAll: false,
    labelKey: 'Name',
    primaryKey: 'Value',
    enableSearchFilter: true,
    classes: "myclass custom-class"
  };
  pitchSpinnerButtonOptions: MatProgressButtonOptions = {
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
    // buttonIcon: {
    //   fontIcon: 'add'
    // }
  }
  protected _onDestroy = new Subject<void>();

  teamInfoJson: any = [];
  filteredCPL2: any = [];
  filteredCPL3: any = [];
  cpl2Json: any = [];
  cpl1Json: any = [];
  cpl3Json: any = [];
  reportTypesJson: any = [];
  clientNamesJson: any = [];
  industryJson: any = [];
  selectedCRTeamInfo:any=''
  constructor(private snackBarService:SnackbarService,private formBuilder: FormBuilder, private creditTransactionservice: CredittransactionService) {
    // this.creditTransactionservice.getIndustryDetails().subscribe(result => {
    //   this.industryJson = result;
    // });
    // this.creditTransactionservice.getClientName().subscribe(result => {
    //   this.clientNamesJson = result;
    // });
    this.reportTypesJson=[{Name:"User Report", Value:"User Report"},{Name:"Group Report", Value:"Group Report"}]
    this.creditTransactionservice.getReportTypes().subscribe(result => {
      // this.reportTypesJson = result;
      
    });
    this.creditTransactionservice.getCreditCPL1().subscribe(result => {
      this.cpl1Json = result;
    });
    this.creditTransactionservice.getCreditCPL2().subscribe(result => {
      this.cpl2Json = result;
    });
    this.creditTransactionservice.getCreditCPL2().subscribe(result => {
      this.cpl3Json = result;
    });
    this.creditTransactionservice.getCreditTransactionTeams().subscribe(result => {
      this.teamInfoJson = result;
    });
    this.cpl1Json=[{Name:'cpl1',Value:'cpl1'},{Name:'cpl12',Value:'cpl12'},{Name:'cpl13',Value:'cpl13'}]
    this.cpl2Json=[{Name:'cpl2',Value:'cpl2',Base:'cpl1'},{Name:'cpl22',Value:'cpl22',Base:'cpl1'},{Name:'cpl23',Value:'cpl23',Base:'cpl1'}]
    this.cpl3Json=[{Name:'cpl3',Value:'cpl3',Base:'cpl3'},{Name:'cpl32',Value:'cpl32',Base:'cpl2'},{Name:'cpl33',Value:'cpl33',Base:'cpl2'}]
  }

  ngOnInit(): void {

    this.initform();
    // this.industrySearchCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
    //   this.industrySearchText = this.industrySearchCtrl.value;
    // });
    // this.clientNameSearchCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
    //   this.clientNameSearchText = this.clientNameSearchCtrl.value;
    // });
    this.reportTypeSearchCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.reportTypeSearchText = this.reportTypeSearchCtrl.value;
    });
  }

  initform() {
    this._creditActionCreationForm = this.formBuilder.group({
      CreditActionName: new FormControl('', Validators.required),
      CreditActionDate: new FormControl('', Validators.required),
      Industry: new FormControl('test', Validators.required),
      ClientName: new FormControl('test', Validators.required),
      ReportType: new FormControl('', Validators.required),
      ProductInfo: new FormArray([]),
      TeamInfo: new FormControl('', Validators.required),
      AdditionalTeamInfo: new FormControl(''),
      IsLegalExeDocs: new FormControl('false'),
      //FolderName: new FormControl('', Validators.required)
      FolderInfo: new FormArray([]),

    });
    // this._creditActionCreationForm.controls['FolderName'].disable();
    this._creditActionCreationForm.controls['Industry'].disable();
    this._creditActionCreationForm.controls['ClientName'].disable();
    this.addProductInfoForm();
    this.addFolderInfoForm();
    debugger
    setTimeout(() => {
      var that=this;
      for (var i = this.folderInfoForm.length - 1; i >= 0; i--) {
        debugger
        that.folderInfoForm.controls[i].disable();//.FolderName.disable.disble();
      }
      // this._creditActionCreationForm.get('FolderInfo.FolderName').disable();
    }, 100);
    
  }
  get f() {
    return this._creditActionCreationForm.controls;
  }
  get productInfoForm() {
    return this.f.ProductInfo as FormArray;
  }
  get folderInfoForm() {
    return this.f.FolderInfo as FormArray;
  }
addFolderInfoForm(){
  debugger
  if(!this.f.FolderInfo.invalid){
    this.folderInfoForm.push(this.formBuilder.group({
      FolderName: ['', Validators.required],
    }));
  }
}
removeFolderInfoForm(index) {
  this.folderInfoForm.removeAt(index);
}
removeAllFolderInfoForm() {
  for (var i = this.folderInfoForm.length - 1; i >= 0; i--) {
    this.folderInfoForm.removeAt(i);
  }
  this.addFolderInfoForm();

}
  addProductInfoForm() {
    debugger
    if (!this.f.ProductInfo.invalid) {
      this.productInfoForm.push(this.formBuilder.group({
        CPL1: ['', Validators.required],
        CPL2: ['', Validators.required],
        CPL3: ['', Validators.required],
        CPL1data:[[]],
        CPL2data:[[]],
        CPL3data:[[]]
      }));
    }
  }
  cplKeyPress(event, index, name) {
    debugger
    if (name == 'CPL1'){
      this.cpl2Json=[];
      this.cpl3Json=[];
      this.productInfoForm.controls[index]['value'].CPL2 = '';
      this.productInfoForm.controls[index]['value'].CPL3 = '';
    }
    else if(name == 'CPL2'){
      this.cpl3Json=[];
      this.productInfoForm.controls[index]['value'].CPL3 = '';
    }
    //  this.productInfoForm.controls[index]['controls'][name].status = 'INVALID';
    // this.productInfoForm.controls[index]['controls'][name].value = '';
    // event.target.value = '';
    event.preventDefault();
  }
  onChangeCPL(event,index,name){
debugger
if (name == 'CPL1'){
  this.productInfoForm.controls[index]['value'].CPL2 = '';
  this.productInfoForm.controls[index]['value'].CPL3 = '';
  this.filteredCPL2=[];
  this.filteredCPL3=[];
  this.filteredCPL2 = this.cpl2Json.filter(x => x.Base == event.value);
  this.productInfoForm.controls[index]['value'].CPL2data=this.filteredCPL2;
}
else if(name == 'CPL2'){
  this.productInfoForm.controls[index]['value'].CPL3 = '';
  this.filteredCPL3=[];
  this.filteredCPL3 = this.cpl3Json.filter(x => x.Base == event.value);
}
}
  removeProductInfoForm(index) {
    this.productInfoForm.removeAt(index);
  }
  removeAllProductInfoForm() {
    for (var i = this.productInfoForm.length - 1; i >= 0; i--) {
      this.productInfoForm.removeAt(i);
    }
    this.addProductInfoForm();

  }
  CPL1OnChange(val) {
    debugger
    this.filteredCPL2 = this.cpl2Json.filter(x => x.Base == val);
  }
  radioChange($event: MatRadioChange) {
    debugger
    console.log($event.source.name, $event.value);

    if ($event.value === "true") {
      var that=this;
      // this._creditActionCreationForm.get('FolderInfo.FolderName').enable();
      for (var i = this.folderInfoForm.length - 1; i >= 0; i--) {
        debugger
        that.folderInfoForm.controls[i].enable();
      }
    }
    else {
      this.removeAllFolderInfoForm();
      var that=this;
      for (var i = this.folderInfoForm.length - 1; i >= 0; i--) {
        debugger
        that.folderInfoForm.controls[i].disable();
      }
      // this._creditActionCreationForm.get('FolderInfo.FolderName').disable();
    }
  }

  createCreditTransaction(form) {
    
    let folders=[]
    this._creditActionCreationForm.controls.FolderInfo.value.forEach((item) => 
    { 
      folders.push(item.FolderName);
     
    });
    debugger
    if (this._creditActionCreationForm.invalid) {
      this.isSubmitted = true;
      this._creditActionCreationForm.markAllAsTouched();
      debugger
      // (<any>Object).values(this.f).forEach(control => {
      //   debugger
      //   control.markAsTouched();
      // });
      // this.checkProductFormValidations();
      return;
    }
    let cpl1=[];
    let cpl2=[];
    let cpl3=[];
    this._creditActionCreationForm.controls.ProductInfo.value.forEach((item) => 
    { 
     cpl1.push(item.CPL1);
     cpl2.push(item.CPL2);
     cpl3.push(item.CPL3);
    });
    var obj={
      industry:this.f.Industry.value,
      clientName:this.f.ClientName.value,
      prospectName:this.f.CreditActionName.value,
      creationDate:this.f.CreditActionDate.value,
      reportType:this.f.ReportType.value,
      cpl1:cpl1,
      cpl2:cpl2,
      cpl3:cpl3,
      teamMembers:'',
      appName:'',
      objectId:'',
      userId:''
    }
  }
  clearAdditionalTeamInfo()
  {
    this.f.AdditionalTeamInfo.setValue('');
  }

}
