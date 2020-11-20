import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
  selector: 'app-excelreports',
  templateUrl: './excelreports.component.html',
  styleUrls: ['./excelreports.component.css']
})
export class ExcelreportsComponent implements OnInit {
  reportForm: FormGroup;
  isSubmitted=false;
  folderTypeSearchtxt='';
selectedReport="Excel";
selectedItems=[];
  public folderTypeSearchCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();
  // groupForm: FormGroup;
  folderTypeJson=[
    {
    Name:"All",
    Value:"All"
  },
  {
    Name:"Application Support",
    Value:"Application Support"
  },
  {
    Name:"Bussiness Resource",
    Value:"Bussiness Resource"
  },
  {
    Name:"CAO & HRO Connect",
    Value:"CAO & HRO Connect"
  },
  {
    Name:"CBG Cabinet",
    Value:"CBG Cabinet"
  },
]
usersData=[
  {"id":1,"itemName":"India"},
  {"id":2,"itemName":"Singapore"},
  {"id":3,"itemName":"Australia"},
  {"id":4,"itemName":"Canada"},
  {"id":5,"itemName":"South Korea"},
  {"id":6,"itemName":"Germany"},
  {"id":7,"itemName":"France"},
  {"id":8,"itemName":"Russia"},
  {"id":9,"itemName":"Italy"},
  {"id":10,"itemName":"Sweden"}
];
usereffectedDrdSettings = {
  text: "Select User Effected Names",
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  enableCheckAll: false,
  labelKey: 'itemName',
  primaryKey: 'id',
  enableSearchFilter: true,
  classes: "myclass custom-class"
};
runReportBtnOptions: MatProgressButtonOptions = {
  active: false,
  text: 'Run Report',
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
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
      AccessFromDate: new FormControl('', Validators.required),
      AccessToDate: new FormControl('', Validators.required),
      UserEffectedName: new FormControl('', Validators.required),
      UserPerformedName: new FormControl('', Validators.required),
      Folder: new FormControl('', Validators.required),
      FolderType: new FormControl('', Validators.required),
      ExcludeSystemAccount: new FormControl(''),
      GroupName: new FormControl('', Validators.required),
      ExcludeMigrated: new FormControl(''),
      ExcludeAdmins: new FormControl(''),
      ReportType:new FormControl('Excel')

    });
    this.folderTypeSearchCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.folderTypeSearchtxt = this.folderTypeSearchCtrl.value;
    });
  }
  get f() {
    return this.reportForm.controls;
  }
  onItemUserSelect(item: any) {
    // console.log(item);
    // console.log(this.selectedItems)
  }
  onUserSelectAll(items: any) {
    // console.log(items);
  }

  movelefttorightUser() {

  }
  moverighttoleftUser() {

  }

  DownloadFile(){
    debugger
    console.log(this.f.UserPerformedName.value)
    // console.log(this.selectedItems)
    // window.open("https://thumbs.dreamstime.com/z/woman-praying-free-birds-to-nature-sunset-background-woman-praying-free-birds-enjoying-nature-sunset-99680945.jpg", '_blank', '', true);
    // window.location.href = "https://thumbs.dreamstime.com/z/woman-praying-free-birds-to-nature-sunset-background-woman-praying-free-birds-enjoying-nature-sunset-99680945.jpg";
  }

}
