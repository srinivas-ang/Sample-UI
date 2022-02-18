import { DataSource } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Dealsmodel } from "./deals.model";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  folderSearchText = "";
  FolderTypeText = "";
  usecaseText = "";
  searchUser = "";
  lstUserInfo: any = [];
  selectedSearchOption: number=0;
  lstFolders = [
    { name: "searching for file checked out by a user", value: 1 },
    { name: "searching for deals", value: 2 },
    { name: "searching whether or not a Ghost pitch exists", value: 3 },
  ];
  userInfoDropdownSettings: any = {};
  public folderSearchCtrl: FormControl = new FormControl();
  public folderTypeCtrl: FormControl = new FormControl();
  public usecaseCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();
  displayedColumns_checkedoutByUser = ['objectId', 'objectName', 'filePath'];
  displayedColumns_deals = ['objectId', 'objectName', 'clientName', 'filePath'];
  displayedColumns_ghost = ['objectId', 'objectName', 'filePath'];
  _searchForm: FormGroup;
  searchResult_checkedoutByUser: MatTableDataSource<any>;
  searchResult_deals: MatTableDataSource<any>;
  searchResult_ghost: MatTableDataSource<any>;
  lstDeals:Dealsmodel[]=[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor() {
    this.folderSearchCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.folderSearchText = this.folderSearchCtrl.value;
      });
    this.folderTypeCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.FolderTypeText = this.folderTypeCtrl.value;
      });
    this.usecaseCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.usecaseText = this.usecaseCtrl.value;
      });
  }

  ngOnInit(): void {
    this.userInfoDropdownSettings = {
      text: "Select User Info",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableCheckAll: false,
      labelKey: "userName",
      primaryKey: "userLoginName",
      enableSearchFilter: true,
      classes: "myclass custom-class",
    };
  }
  // ngAfterViewInit() {
  //   this.searchResult_checkedoutByUser.paginator = this.paginator;
  //   this.searchResult_checkedoutByUser.sort = this.sort;

  //   this.searchResult_deals.paginator = this.paginator;
  //   this.searchResult_deals.sort = this.sort;

  //   this.searchResult_ghost.paginator = this.paginator;
  //   this.searchResult_ghost.sort = this.sort;

  // }
  initForm() {
    this._searchForm = new FormGroup({
      userInfo: new FormControl(""),
      searchFolder: new FormControl(""),
      searchUser: new FormControl(""),
      objectName: new FormControl(""),
      folderType: new FormControl(""),
      clientName: new FormControl(""),
      concurId: new FormControl(""),
      ghostObjectName: new FormControl(""),
      ghostFolderType: new FormControl(""),
      ghostClientName: new FormControl(""),
    });
  }
  onchange(item) {
    debugger;
    this.selectedSearchOption = item.value;
  }
  Search(){

  }
  dealsSearch(){
    let i=100;
    while(i>=1){
      var dat= new Dealsmodel();
      dat.objectId="6577t76t757"+'_'+i;
      dat.filePath="fj/uy7878/"+"_"+i;
      dat.objectName="folder"+'_'+i;
      dat.clientName="client_"+i;
      this.lstDeals.push(dat);
      i--;
    }
    debugger
    this.searchResult_deals = new MatTableDataSource<any>(this.lstDeals);
    this.searchResult_deals.paginator = this.paginator;
    this.searchResult_deals.sort = this.sort;
  }
  ghostSearch(){

  }
}
