import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import {AppComponent} from '../../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import {Roles} from '../../common/roles.enum';
import {SnackbarService} from '../../services/snackbar.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isShowContent: boolean = false;
  userRoles:any;
  menuptions = MenuOptions;
  menuSelectedOption:any='';
  originalRoots:any=[];
  originalChilds:any=[];
  files1:any=[];
  childs:any=[];
  breadcumb:any=[];
  selectedRoot:string='';
  isLoading:boolean=false;
  searchRootText:string='';
  searchChildText:string='';
  constructor(public app:AppComponent, private formBuilder:FormBuilder,private service:ReportsService, private snackBarService:SnackbarService, private router :Router) {
    this.userRoles=Roles;
    this.service.getFiles().then(files => {
      this.originalRoots = Object.assign({}, files);
      this.files1 = files;
      console.log(this.files1.length)
    });
    service.getUserReports().subscribe(x=>{
      alert(23123213123)
    })
  }
breadcumevent(id,name,index){
  if(index != this.breadcumb.length){
  while(index<this.breadcumb.length-1)
  {
    this.breadcumb.pop();
  }
  this.getChild(id,name,false,true);
}

}
  getChild(id,name,fromRoot,frombreadcum){
console.log(id);
if(fromRoot)
this.breadcumb=[];
debugger
var obj={
  id:id,
  name: this.breadcumb.length > 0? " ➟ ".concat(name) :name,
  index:this.breadcumb.length +1
}
if(!frombreadcum)
this.breadcumb.push(obj);
this.isLoading=true;
this.childs=[];
setTimeout(() => {
  this.service.getFiles().then(files => {
    this.originalChilds = Object.assign({}, files);
    this.childs = files;
    console.log(this.childs.length);
    this.isLoading=false;
  });
}, 3000);
  }

  ngOnInit() {
//     this.app.userDetails=JSON.parse(localStorage.getItem('loginUserDetails'));
//     if(this.app.userDetails){

//     }
//     else{
// this.router.navigateByUrl("/login")
//     }
  }

 

  


 


}

export enum MenuOptions {
  PITCH_CREATION = "Pitch Creation",
  STANDARD_FOLDER = "Standard Folder",
  CREDIT_TRANSACTION_FOLDER = "Credit Trasaction Folder",
  RESTRICTED_FOLDER="Restricted Folder",
  RLATIONSHIP_FOLDER="Relationship Creation Folder",
  ADD_CLIENT="Add Client",
  NON_PRODUCT_SPECIFIC_PITCH="Non-Product Specific Pitch",
  USER_MANAGEMENT="User Management",
  CLIENT_MANAGEMENT="Client Exception Queue",
  REPORTS="Reports",
  EXCEL_REPORTS="Excel Reports",
  CREDIT_ACTION="Credit Action",
  ADD_GICG_CLIENT="Add GICG Client",
  RECYCLE_BIN="Recycle Bin"
}
