import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { DateValidator } from './../../common/DateValidator';

@Component({
  selector: 'app-non-productspecifcpitchcreation',
  templateUrl: './non-productspecifcpitchcreation.component.html',
  styleUrls: ['./non-productspecifcpitchcreation.component.css']
})
export class NonProductspecifcpitchcreationComponent implements OnInit {

  _Non_ProductSpecificForm: FormGroup;
  teamInfoDropdownSettings: any = {};
  isSubmitted: boolean = false;
  pitchMinDate: Date = new Date();
  isDateFormatError: boolean = false;
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
  teamInfoJson: any[] = [
    {
      Name: 'James, Smith',
      Value: 'James, Smith'
    },
    {
      Name: 'Maria, Rodriguez',
      Value: 'Maria, Rodriguez'
    },
    {
      Name: 'James, Johnson',
      Value: 'James, Johnson'
    },
    {
      Name: 'Robert, Smith',
      Value: 'Robert, Smith'
    },
    {
      Name: 'Maria, Martinez',
      Value: 'Maria, Martinez'
    },
    {
      Name: 'IndusDavid, Smithtrial',
      Value: 'David, Smith'
    },
    {
      Name: 'Juan, Carlos',
      Value: 'Juan, Carlos'
    },
    {
      Name: 'Mike, Jones',
      Value: 'Mike, Jones'
    }

  ]
  constructor(private formBuilder: FormBuilder, private snackBarService: SnackbarService) { }

  ngOnInit() {
    this.teamInfoDropdownSettings = {
      text: "Select Team Info",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableCheckAll: false,
      labelKey: 'Name',
      primaryKey: 'Value',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    this.initForm();

  }

  get f() {
    return this._Non_ProductSpecificForm.controls;
  }
  initForm() {
    this._Non_ProductSpecificForm = this.formBuilder.group({
      PitchName: new FormControl('', Validators.required),
      PitchDate: new FormControl('', Validators.required),
      TeamInfo: new FormControl('', Validators.required),
      PitchStatus: new FormControl(''),
      PitchClient: new FormControl('')


    });
  }

  getErrorMessage(pickerInput: string): string {
    if (!pickerInput || pickerInput === '') {
      return 'Pitch date Required.';
    }
    return DateValidator.dateFormatVaidator(this.f["PitchDate"]);
  }

  createNonProductSpecific(form) {
    if (this._Non_ProductSpecificForm.invalid) {
      this.isSubmitted = true;
      
      this._Non_ProductSpecificForm.markAllAsTouched();
      return;
    }
    this.snackBarService.message = "Pitch creation successfully created."

    this.snackBarService.showSnackbar();
    // form.resetForm();
    this.initForm();

  }
  cancelNonProductSpecific(form) {
    // form.resetForm();
    this.initForm();
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
