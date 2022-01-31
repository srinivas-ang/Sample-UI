import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ReportsService } from "src/app/services/reports.service";
import { MenuOptions } from "../home/home.component";
import { Aclmodel } from "./aclmodel.model";

@Component({
  selector: "app-aclsearch",
  templateUrl: "./aclsearch.component.html",
  styleUrls: ["./aclsearch.component.css"],
})
export class AclsearchComponent implements OnInit {
  userRoles: any;
  displayedColumns: unknown=['objectId','folderName','folderPath','folderType'];
  isLoading: boolean = false;
  lstACL: Aclmodel[] = [];
  acl: Aclmodel;
  isSubmitted:boolean=false;
  searchText:string='';
  searchResult: MatTableDataSource<Aclmodel[]>;
  resultsLength: any = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private service: ReportsService) {
    this.acl = new Aclmodel();
    this.acl.folderName='';
    this.acl.folderPath='';
    this.acl.folderType='';
    this.acl.objectId='';
    // this.displayedColumns = Object.keys(this.acl);
    console.log(this.displayedColumns);
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.searchResult.paginator = this.paginator;
    this.searchResult.sort = this.sort;
  }
  aclSearch() {
      let i=100;
      while(i>=1){
        var dat= new Aclmodel();
        dat.objectId="6577t76t757"+'_'+i;
        dat.folderType="folder"+"_"+i;
        dat.folderPath="fj/uy7878/"+"_"+i;
        dat.folderName="folder"+'_'+i;
        this.lstACL.push(dat);
        i--;
      }
      debugger
      this.searchResult = new MatTableDataSource<any>(this.lstACL);
    this.isLoading = true;
    this.isSubmitted=true;
  }
}
