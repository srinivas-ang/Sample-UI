import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RecyclebinService } from 'src/app/services/recyclebin.service';

@Component({
  selector: 'app-recyclebin',
  templateUrl: './recyclebin.component.html',
  styleUrls: ['./recyclebin.component.css']
})
export class RecyclebinComponent implements OnInit {
  _recyclebinForm: FormGroup;
  public docOrFolderSearchCtrl:FormControl=new FormControl();
  docOrFolderSearchText:any='';
  lstDocOrFolder:any=[];
  public userSearchCtrl:FormControl=new FormControl();
  userSearchText:any='';
  lstUsers:any=[];
  protected _onDestroy = new Subject<void>();
  isSubmitted:boolean=false;

  showSearchData:boolean=false;
  displayedColumns = ['select','objectName', 'deletedDate','deletedBy','objectPath']
  lastSearchData: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  selection = new SelectionModel<any>(true, []);
  data:any=[{
    objectName:'Srinivas',
    deletedDate:"10/03/2021",
    deletedBy:'Srinivas',
    objectPath:'wef/dffdf/dsfdsfsd/dsfdsfdfd'
  },
  {
    objectName:'Srinivas',
    deletedDate:"10/03/2021",
    deletedBy:'Srinivas',
    objectPath:'wef/dffdf/dsfdsfsd/dsfdsfdfd'
  },
  {
    objectName:'Srinivas',
    deletedDate:"10/03/2021",
    deletedBy:'Srinivas',
    objectPath:'wef/dffdf/dsfdsfsd/dsfdsfdfd'
  }]

  pitchSpinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Search',
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
  constructor(private formBuilder: FormBuilder, private recyclebinService:RecyclebinService) { }

  ngOnInit(): void {
    this.lstDocOrFolder=[{Name:"Document",Value:"Document"},{Name:"Folder",Value:"Folder"}]
    this.formInitialization();
    
    this.docOrFolderSearchCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(()=>{
      this.docOrFolderSearchText = this.docOrFolderSearchCtrl.value;
    });
    this.userSearchCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(()=>{
      this.userSearchText = this.userSearchCtrl.value;
    });
  }
  get f() {
    return this._recyclebinForm.controls;
  }
  formInitialization() {
    this._recyclebinForm = this.formBuilder.group({
      filePath: new FormControl('', Validators.required),
      dateRange: new FormControl('', Validators.required),
      folder: new FormControl('Document', Validators.required),
      user: new FormControl(''),
      objectName: new FormControl('', Validators.required),
    });
  }
  objectNameKeyup(event){
    let str=event.replace('/','')
    this.f.objectName.setValue(str);
  }
  getUsers(){
  }
  applySearch(){
    this.showSearchData=true;
    debugger;
    if (this._recyclebinForm.invalid) {
      this.isSubmitted = true;
      this._recyclebinForm.markAllAsTouched();
      return;
    }
    debugger
    var obj={
      objectName:this.f.objectName.value,
      folderPath:this.f.filePath.value,
      objectType:this.f.folder.value,
      date:this.f.dateRange.value

    }

    this.lastSearchData = new MatTableDataSource(this.data);
      this.lastSearchData.paginator = this.paginator;
      this.lastSearchData.sort = this.sort;
    console.log(obj)
    console.log(this._recyclebinForm)

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    this.lastSearchData.filter = filterValue;
  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.lastSearchData.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.lastSearchData.data.forEach(row => this.selection.select(row));
  }

  logSelection() {
    debugger
    console.log(this.selection.selected)
    this.selection.selected.forEach(s => console.log(s.objectName));
  }
}
