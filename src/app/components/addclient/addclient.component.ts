import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { AddclientService } from '../../services/addclient.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ViewclientComponent } from './viewclient/viewclient.component';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {
  // searchText:any;
  display:any="none";
  isValidFormSubmitted=true;
  searchResult: MatTableDataSource<any>; 
  // searchResult:any=[];
  searchForm: FormGroup;
  resultsLength:any=0;
  isDataFound:any=true;
  displayedColumns = ['action', 'wcisId', 'clientName', 'Sponsor','tickerSymbol','taxId','industry','city'];
  clientSpinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Search Salesforce Client',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
  }

  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  
  constructor(private formBuilder: FormBuilder,private salesforceClientService:AddclientService,public dialog: MatDialog) { 
    this.searchForm=this.formBuilder.group({
      searchText: new FormControl('', [Validators.minLength(3), Validators.required]),
    });
  }

  // ngAfterViewInit() {
  //   debugger
  //   this.searchResult.paginator = this.paginator;
  //   // this.searchResult.sort = this.sort;
  // }

  ngOnInit() {
  }

  get getSearchText() {
    return this.searchForm.get('searchText');
} 
  removeSearchText(){
    this.getSearchText.setValue('');
  }
  
  
  searchClientDetails(){
    debugger
    if (this.searchForm.invalid) {
      this.isValidFormSubmitted = false;
      this.searchForm.markAllAsTouched();
     
      return;
    }
    this.isValidFormSubmitted=true;
    this.clientSpinnerButtonOptions.active=true;
    this.salesforceClientService.searchSalesforceClients(this.getSearchText.value).subscribe(result => {
      this.clientSpinnerButtonOptions.active=false;
      if(result.length > 0){
        this.display='';
        this.resultsLength=result.length;
        this.searchResult= new MatTableDataSource(result);
        this.searchResult.paginator = this.paginator;
        this.searchResult.sort=this.sort;
      }
      else{
        this.isDataFound=false;
        this.display='none';
      }
     
    });
  }

  viewClienDetails(data) {
    debugger
    const dialogRef = this.dialog.open(ViewclientComponent, {
      width: '80%',
      data:data
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });

  }

}
