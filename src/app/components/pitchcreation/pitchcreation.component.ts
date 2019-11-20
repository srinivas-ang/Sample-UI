import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Subject, ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material';
@Component({
  selector: 'app-pitchcreation',
  templateUrl: './pitchcreation.component.html',
  styleUrls: ['./pitchcreation.component.css']
})
export class PitchcreationComponent implements OnInit,OnDestroy {

  pitchCreationForm: FormGroup;
  selectedTeamInfo:any='';
  
  public cpl1FilterCtrl: FormControl = new FormControl();
  public teamInfoSearchCtrl:FormControl=new FormControl();
  public filteredTeamInfo:ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filteredCPL2:any=[];
  filterCPL1:any;
  protected _onDestroy = new Subject<void>();
  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;
  
  clients = [
    { id: 'id1', clientName: 'Bruce' },
    { id: 'id2', clientName: 'Ben' },
    { id: 'id3', clientName: 'Peter' }
  ];

  industryJson = [
    {
      Name: 'Customer & Retail',
      Value: 'Customer & Retail'
    },
    {
      Name: 'Energy & Power',
      Value: 'Energy & Power'
    },
    {
      Name: 'Financial Institutions',
      Value: 'Financial Institutions'
    },
    {
      Name: 'Gaming',
      Value: 'Gaming'
    },
    {
      Name: 'Healthcare',
      Value: 'Healthcare'
    },
    {
      Name: 'Industrial',
      Value: 'Industrial'
    },
    {
      Name: 'RestFin',
      Value: 'RestFin'
    },
    {
      Name: 'Technology, Media & Telecom',
      Value: 'Technology, Media & Telecom'
    }

  ]
  clientNamesJson = [
    {
      Name: 'Test2424',
      Value: 'Test2424'
    },
    {
      Name: 'The kroger Co.',
      Value: 'The kroger Co.'
    }

  ]

  cpl1Json = [
    {
      Name: 'Deposits Other',
      Value: 'Deposits Other'
    },
    {
      Name: 'Fed Funds Deposits',
      Value: 'Fed Funds Deposits'
    },
    {
      Name: 'Interest Bearing DDAs',
      Value: 'Interest Bearing DDAs'
    },
    {
      Name: 'Non-Interest Bearing DDAs & Float',
      Value: 'Non-Interest Bearing DDAs & Float'
    },
    {
      Name: 'Structured Deposits',
      Value: 'Structured Deposits'
    },
    {
      Name: 'Sweep Balances',
      Value: 'Sweep Balances'
    },
    {
      Name: 'Time Deposits/Placements',
      Value: 'Time Deposits/Placements'
    },
    


  ]
  cpl2Json = [
    {
      Name: 'Deposits Other  cpl2',
      Value: 'Deposits Other  cpl2',
      Base:'Deposits Other'
    },
    {
      Name: 'Fed Funds Deposits  cpl2',
      Value: 'Fed Funds Deposits  cpl2',
      Base:'Deposits Other'
    },
    {
      Name: 'Interest Bearing DDAs  cpl2',
      Value: 'Interest Bearing DDAs  cpl2',
      Base: 'Interest Bearing DDAs'
    },
    {
      Name: 'Non-Interest Bearing DDAs & Float  cpl2',
      Value: 'Non-Interest Bearing DDAs & Float  cpl2',
      Base: 'Interest Bearing DDAs'
    },
    {
      Name: 'Structured Deposits cpl2',
      Value: 'Structured Deposits cpl2',
      Base: 'Interest Bearing DDAs'
    },
    {
      Name: 'Sweep Balances cpl2',
      Value: 'Sweep Balances cpl2',
      Base: 'Sweep Balances'
    },
    {
      Name: 'Time Deposits/Placements cpl2',
      Value: 'Time Deposits/Placements cpl2',
      Base: 'Sweep Balances'
    },
    


  ]
  teamInfoJson:any[] = [
    {
      Name: 'Customer & Retail',
      Value: 'Customer & Retail'
    },
    {
      Name: 'Energy & Power',
      Value: 'Energy & Power'
    },
    {
      Name: 'Financial Institutions',
      Value: 'Financial Institutions'
    },
    {
      Name: 'Gaming',
      Value: 'Gaming'
    },
    {
      Name: 'Healthcare',
      Value: 'Healthcare'
    },
    {
      Name: 'Industrial',
      Value: 'Industrial'
    },
    {
      Name: 'RestFin',
      Value: 'RestFin'
    },
    {
      Name: 'Technology, Media & Telecom',
      Value: 'Technology, Media & Telecom'
    }

  ]

  pitchSpinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Create Pitch',
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
  constructor( private formBuilder:FormBuilder, private snackBarService:SnackbarService) {
    this.initResourceForm();
   // this.teamInfoSearchCtrl.setValue('');
  }
  ngAfterViewInit() {
    this.setInitialValue();
  }
  protected setInitialValue() {
    debugger
    this.filteredTeamInfo
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        debugger
        this.multiSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
      });
  }

  initResourceForm() {
    this.pitchCreationForm = this.formBuilder.group({
      Name: new FormControl('', Validators.required),
      PitchDate: new FormControl('', Validators.required),
      Industry: new FormControl('', Validators.required),
      ClientName: new FormControl('', Validators.required),
      ProductInfo:new FormArray([]),
      TeamInfo:new FormControl('',Validators.required),
      AdditionalTeamInfo:new FormControl('')

    });
    this.addProductInfoForm();
  }

  ngOnInit() {
    this.f.TeamInfo.setValue([this.teamInfoJson[1], this.teamInfoJson[2]]);
    this.filteredTeamInfo.next(this.teamInfoJson.slice());
    this.filteredCPL2=this.cpl2Json;
    // this.filteredTeamInfo=this.teamInfoJson;
  console.log(this.filteredTeamInfo)

  this.teamInfoSearchCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(()=>{
    debugger
    this.filterTeamInfo();
  })

  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  CPL1OnChange(val){
    debugger
this.filteredCPL2=this.cpl2Json.filter(x=> x.Base == val);
  }
  
  get f(){
    return this.pitchCreationForm.controls;
  }
  get productInfoForm(){
    return this.f.ProductInfo as FormArray;
  }
  addProductInfoForm(){
    if(!this.f.ProductInfo.invalid)
    {
      debugger
      this.productInfoForm.push(this.formBuilder.group({
        CPL1:['', Validators.required],
        CPL2:['',Validators.required]
      }));

     
      for (let index = 0; index <  this.productInfoForm.controls.length; index++) {
        var element =  this.productInfoForm.controls[index];
        console.log('checking start')
         console.log(element['controls'].CPL1.status)
        // console.log(element.controls.status)
        
      }     
    }
  }
  removeProductInfoForm(index){
    this.productInfoForm.removeAt(index);
  }

  


 

  resetResourceFrom() {
     this.pitchCreationForm.reset();
     this.pitchCreationForm.clearValidators();
    this.pitchCreationForm.updateValueAndValidity();
     this.initResourceForm();
  }
 
  checkProductFormValidations(){
    if(this.productInfoForm.invalid){
      (<any>Object).values(this.productInfoForm.controls).forEach(controls => {
        (<any>Object).values(controls.controls).forEach(control => {
          control.markAsTouched();
        });
       

      });
    }
  }
  createResource() {
    if (this.pitchCreationForm.invalid) {
      (<any>Object).values(this.f).forEach(control => {
        control.markAsTouched();
      });
      this.checkProductFormValidations();
      return;
    }
   
    this.pitchSpinnerButtonOptions.active = true;
    alert(JSON.stringify(this.pitchCreationForm.value))
    setTimeout(() => {
      this.snackBarService.message="Pitch creation successfully created."
      this.snackBarService.showSnackbar();
      this.pitchSpinnerButtonOptions.active = false;
      this.resetResourceFrom();
   
    }, 3000);

  }
 
  public filterTeamInfo() {
    debugger
    if (!this.teamInfoJson) {
      return;
    }
    // get the search keyword
    let search = this.teamInfoSearchCtrl.value;
    if (!search) {
      this.filteredTeamInfo.next(this.teamInfoJson.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredTeamInfo.next(
      this.teamInfoJson.filter(bank => bank.Name.toLowerCase().indexOf(search) > -1)
    );
  }



}
