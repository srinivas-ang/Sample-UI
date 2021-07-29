import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    debugger;
    if (this._recyclebinForm.invalid) {
      this.isSubmitted = true;
      this._recyclebinForm.markAllAsTouched();
      return;
    }
    console.log(this._recyclebinForm)

  }
}
