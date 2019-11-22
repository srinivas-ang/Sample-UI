import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Subject, ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material';
import { MatDialog } from '@angular/material';
import { TeaminformatonComponent } from '../home/teaminformaton/teaminformaton.component';
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
  pitchMinDate:Date=new Date();
  protected _onDestroy = new Subject<void>();
  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;
  isSubmitted:boolean=false;
  teamInfoDropdownSettings = {};
  
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
      Name: 'James Smith',
      Value: 'James, Smith'
    },
    {
      Name: 'Maria Rodriguez',
      Value: 'Maria, Rodriguez'
    },
    {
      Name: 'James Johnson',
      Value: 'James, Johnson'
    },
    {
      Name: 'Robert Smith',
      Value: 'Robert, Smith'
    },
    {
      Name: 'Maria Martinez',
      Value: 'Maria, Martinez'
    },
    {
      Name: 'IndusDavid Smithtrial',
      Value: 'David, Smith'
    },
    {
      Name: 'Juan Carlos',
      Value: 'Juan, Carlos'
    },
    {
      Name: 'Mike Jones',
      Value: 'Mike, Jones'
    }

  ]
  data = [
    { item_id: 1, item_text: 'Hanoi' },
    { item_id: 2, item_text: 'Lang Son' },
    { item_id: 3, item_text: 'Vung Tau' },
    { item_id: 4, item_text: 'Hue' },
    { item_id: 5, item_text: 'Cu Chi' }
  ];

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
  constructor(public dialog: MatDialog, private formBuilder:FormBuilder, private snackBarService:SnackbarService) {
    this.initResourceForm();
   // this.teamInfoSearchCtrl.setValue('');
  }
  ngAfterViewInit() {
    this.setInitialValue();
  }
  protected setInitialValue() {
    this.filteredTeamInfo
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        
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
      AdditionalTeamInfo:new FormControl(''),
      CorpFinnInvolved:new FormControl('')

    });
    this.addProductInfoForm();
  }

  ngOnInit() {
    this.teamInfoDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: 'Search',
      noDataAvailablePlaceholderText: 'No search result found.',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    // this.f.TeamInfo.setValue([this.teamInfoJson[1], this.teamInfoJson[2]]);
    this.filteredTeamInfo.next(this.teamInfoJson.slice());
    this.filteredCPL2=this.cpl2Json;
    // this.filteredTeamInfo=this.teamInfoJson;
  console.log(this.filteredTeamInfo)

  this.teamInfoSearchCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(()=>{
    this.filterTeamInfo();
  })

  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  CPL1OnChange(val){
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
  removeAllProductInfoForm(){
    debugger
    for(var i=this.productInfoForm.length-1 ; i>= 0 ; i--)
    {
      this.productInfoForm.removeAt(i);
    }
    this.addProductInfoForm();

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
    this.isSubmitted=true;
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
      this.isSubmitted=false;
      this.resetResourceFrom();
   
    }, 3000);

  }
 
  public filterTeamInfo() {
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

  clearAdditionalTeamInfo()
  {
    this.f.AdditionalTeamInfo.setValue('');
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(TeaminformatonComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.selectedTeamInfo = result;
      
      if(result != null && result.length > 0){
        this.selectedTeamInfo='';
      result.forEach(element => {
        // this.selectedTeamInfo+=element.Name + ', ';
         this.selectedTeamInfo +=element.Name+ '\n' + '\n';
      });
      this.f["AdditionalTeamInfo"].setValue(this.selectedTeamInfo);
    }
     
    });

  }
}
