import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, NgForm } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatRadioChange } from '@angular/material';
import { CredittransactionService } from 'src/app/services/credittransaction.service';

@Component({
  selector: 'app-credittransaction',
  templateUrl: './credittransaction.component.html',
  styleUrls: ['./credittransaction.component.css']
})
export class CredittransactionComponent implements OnInit {
  isSubmitted: boolean = false;
  creditTransactionForm: FormGroup;
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
  protected _onDestroy = new Subject<void>();

  teamInfoJson: any = [];
  filteredCPL2: any = [];
  cpl2Json: any = [];
  cpl1Json: any = [];
  reportTypesJson: any = [];
  clientNamesJson: any = [];
  industryJson: any = [];
  constructor(private formBuilder: FormBuilder, private creditTransactionservice: CredittransactionService) {
    this.creditTransactionservice.getIndustryDetails().subscribe(result => {
      this.industryJson = result;
    });
    this.creditTransactionservice.getClientName().subscribe(result => {
      this.clientNamesJson = result;
    });
    this.creditTransactionservice.getReportTypes().subscribe(result => {
      this.reportTypesJson = result;
    });
    this.creditTransactionservice.getCreditCPL1().subscribe(result => {
      this.cpl1Json = result;
    });
    this.creditTransactionservice.getCreditCPL2().subscribe(result => {
      this.cpl2Json = result;
    });
    this.creditTransactionservice.getCreditTransactionTeams().subscribe(result => {
      this.teamInfoJson = result;
    });
  }

  ngOnInit() {

    this.initform();
    this.industrySearchCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.industrySearchText = this.industrySearchCtrl.value;
    });
    this.clientNameSearchCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.clientNameSearchText = this.clientNameSearchCtrl.value;
    });
    this.reportTypeSearchCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.reportTypeSearchText = this.reportTypeSearchCtrl.value;
    });
  }

  initform() {
    this.creditTransactionForm = this.formBuilder.group({
      CreditActionName: new FormControl('', Validators.required),
      CreditActionDate: new FormControl('', Validators.required),
      Industry: new FormControl('', Validators.required),
      ClientName: new FormControl('', Validators.required),
      ReportType: new FormControl('', Validators.required),
      ProductInfo: new FormArray([]),
      TeamInfo: new FormControl('', Validators.required),
      AdditionalTeamInfo: new FormControl(''),
      IsLegalExeDocs: new FormControl(''),
      FolderName: new FormControl('', Validators.required)

    });
    this.creditTransactionForm.controls['FolderName'].disable();
    this.addProductInfoForm();
  }
  get f() {
    return this.creditTransactionForm.controls;
  }
  get productInfoForm() {
    return this.f.ProductInfo as FormArray;
  }

  addProductInfoForm() {
    if (!this.f.ProductInfo.invalid) {
      this.productInfoForm.push(this.formBuilder.group({
        CPL1: ['', Validators.required],
        CPL2: ['', Validators.required]
      }));
    }
  }
  cplKeyPress(event, index, name) {
    if (name == 'CPL1')
      this.productInfoForm.controls[index]['value'].CPL1 = '';
    else
      this.productInfoForm.controls[index]['value'].CPL2 = '';

    this.productInfoForm.controls[index]['controls'][name].status = 'INVALID';
    this.productInfoForm.controls[index]['controls'][name].value = '';
    event.target.value = '';
    event.preventDefault();
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
    this.filteredCPL2 = this.cpl2Json.filter(x => x.Base == val);
  }
  radioChange($event: MatRadioChange) {
    debugger
    console.log($event.source.name, $event.value);

    if ($event.value === "true") {
      this.creditTransactionForm.controls['FolderName'].enable();
    }
    else {
      this.creditTransactionForm.controls['FolderName'].setValue('');
      this.creditTransactionForm.controls['FolderName'].disable();
    }
  }
  createCreditTransaction(form: NgForm) {

    if (this.creditTransactionForm.invalid) {
      this.creditTransactionForm.markAllAsTouched();
      // (<any>Object).values(this.f).forEach(control => {
      //   debugger
      //   control.markAsTouched();
      // });
      // this.checkProductFormValidations();
      return;
    }
    this.isSubmitted = true;
    alert(JSON.stringify(this.creditTransactionForm.value));
    this.isSubmitted = false;
    form.resetForm();
    this.initform();
  }

}
