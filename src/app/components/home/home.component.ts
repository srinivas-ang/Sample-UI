import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { TeaminformatonComponent } from './teaminformaton/teaminformaton.component';
import { MatDialog } from '@angular/material';

import {SnackbarService} from '../../services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isShowContent: boolean = false;
  selectedValue: string;

  pitchCreationForm: FormGroup;
  selectedTeamInfo:any='';
  public FilterCtrl: FormControl = new FormControl();
  menuSelectedOption:any='';
  menuptions = MenuOptions;
dummy:boolean=false;
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
      Value: 'Customer & Retail'
    },
    {
      Name: 'The kroger Co.',
      Value: 'Energy & Power'
    }

  ]

  cpl2Json = [
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
      }))
    }
  }
  removeProductInfoForm(index){
    this.productInfoForm.removeAt(index);
  }

  // changeClient(data) {
  //   alert("selected --->" + data);
  // }


  onTabChange(event) {
    this.resetResourceFrom();
  }

  resetResourceFrom() {
     this.pitchCreationForm.reset();
    // for (const key in this.pitchCreationForm.controls) {

    //   this.pitchCreationForm.get(key).setErrors(null);
    //   this.pitchCreationForm.get(key).markAsPristine();
    //  }
     this.initResourceForm();
     this.addProductInfoForm();
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
    setTimeout(() => {
      this.snackBarService.message="Pitch creation successfully created."
      this.snackBarService.showSnackbar();
      this.pitchSpinnerButtonOptions.active = false;
      this.resetResourceFrom();
   
    }, 3000);

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(TeaminformatonComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.selectedTeamInfo = result;
      if(result != null && result.length > 0){
      result.forEach(element => {
        this.selectedTeamInfo+=element.Name + ', ';
        // this.selectedTeamInfo +=element.Name+ '\n' + '\n';
      });
      this.f["TeamInfo"].setValue(this.selectedTeamInfo);
    }
     
    });
  }


}

export enum MenuOptions {
  PITCH_CREATION = "Pitch Creation",
  STANDARD_FOLDER = "Standard Folder",
  CREDIT_TRANSACTION_FOLDER = "Credit Trasaction Folder"
}