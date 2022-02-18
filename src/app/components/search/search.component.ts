import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

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

  _searchForm: FormGroup;

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

  }
  ghostSearch(){

  }
}
