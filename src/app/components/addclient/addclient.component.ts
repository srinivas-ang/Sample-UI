import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { AddclientService } from '../../services/addclient.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ViewclientComponent } from './viewclient/viewclient.component';
import { HttpErrorResponse } from '@angular/common/http';
import { PitchcreationService } from '../../services/pitchcreation.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {
  SalesforceClients: any = [
    {
      "wcisId": "",
      "clientName": "ohello Golf Club Inc",
      "Sponsor": "",
      "tickerSymbol": "",
      "taxId": "",
      "industry": "Energy & Power",
      "city": "OTHELLO",
      "subIndustry": "Energy",
      "state": "MN"
    },
    {
      "wcisId": 233775419,
      "clientName": "ohello Golf Club Inc",
      "Sponsor": "",
      "tickerSymbol": "",
      "taxId": "",
      "industry": "Energy & Power",
      "city": "OTHELLO",
      "subIndustry": "Energy",
      "state": "MN"
    },
    {
      "wcisId": 2337754191,
      "clientName": "Accent Inc.",
      "Sponsor": "",
      "tickerSymbol": "",
      "taxId": "",
      "industry": "Customer & Retail",
      "city": "OTHELLO",
      "subIndustry": "Consumer Products",
      "state": "MN"
    },
    {
      "wcisId": 2337754192,
      "clientName": "ohello Golf Club Inc",
      "Sponsor": "",
      "tickerSymbol": "",
      "taxId": "",
      "industry": "Energy & Power",
      "city": "OTHELLO",
      "subIndustry": "Consumer Products",
      "state": "MN"
    },
    {
      "wcisId": 233775419,
      "clientName": "ohello Golf Club Inc",
      "Sponsor": "",
      "tickerSymbol": "",
      "taxId": "",
      "industry": "Energy & Power",
      "city": "OTHELLO",
      "subIndustry": "Consumer Products",
      "state": "MN"
    },
    {
      "wcisId": 233775419,
      "clientName": "ohello Golf Club Inc",
      "Sponsor": "",
      "tickerSymbol": "",
      "taxId": "",
      "industry": "Energy & Power",
      "city": "OTHELLO",
      "subIndustry": "Consumer Products",
      "state": "MN"
    },
    {
      "wcisId": 233775419,
      "clientName": "ohello Golf Club Inc",
      "Sponsor": "",
      "tickerSymbol": "",
      "taxId": "",
      "industry": "Energy & Power",
      "city": "OTHELLO",
      "subIndustry": "Consumer Products",
      "state": "MN"
    },
    {
      "wcisId": 233775419,
      "clientName": "ohello Golf Club Inc",
      "Sponsor": "",
      "tickerSymbol": "",
      "taxId": "",
      "industry": "Energy & Power",
      "city": "OTHELLO",
      "subIndustry": "Consumer Products",
      "state": "MN"
    },
    {
      "wcisId": 233775419,
      "clientName": "ohello Golf Club Inc",
      "Sponsor": "",
      "tickerSymbol": "",
      "taxId": "",
      "industry": "Energy & Power",
      "city": "OTHELLO",
      "subIndustry": "Consumer Products",
      "state": "MD"
    },
    {
      "wcisId": 233775419,
      "clientName": "ohello Golf Club Inc",
      "Sponsor": "",
      "tickerSymbol": "",
      "taxId": "",
      "industry": "Energy & Power",
      "city": "OTHELLO",
      "subIndustry": "Consumer Products",
      "state": "MD"
    },
    {
      "wcisId": 233775419,
      "clientName": "ohello Golf Club Inc",
      "Sponsor": "",
      "tickerSymbol": "",
      "taxId": "",
      "industry": "Energy & Power",
      "city": "OTHELLO",
      "subIndustry": "Consumer Products",
      "state": "MD"
    },
    {
      "wcisId": 233775419,
      "clientName": "ohello Golf Club Inc",
      "Sponsor": "",
      "tickerSymbol": "",
      "taxId": "",
      "industry": "Energy & Power",
      "city": "OTHELLO",
      "subIndustry": "Consumer Products",
      "state": "MD"
    }
  ];
  // searchText:any;
  display: any = "none";
  isValidFormSubmitted = true;
  searchResult: MatTableDataSource<any>;
  // searchResult:any=[];
  searchForm: FormGroup;
  resultsLength: any = 0;
  isDataFound: any = true;
  displayedColumns = ['action', 'clientName', 'industry', 'city', 'state', 'taxId', 'wcisId'];
  clientSpinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Search Salesforce Clients',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
  }


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private formBuilder: FormBuilder, private salesforceClientService: AddclientService, public dialog: MatDialog,
    private relationshipService: PitchcreationService, private snackBarService: SnackbarService) {
    this.searchForm = this.formBuilder.group({
      searchText: new FormControl('', [Validators.minLength(2), Validators.required]),
      searchType: new FormControl("C")
    });
  }

  ngOnInit() {
  }

  get getSearchText() {
    return this.searchForm.get('searchText');
  }
  get getSearchType() {
    return this.searchForm.get('searchType');
  }
  removeSearchText() {
    this.getSearchText.setValue('');
  }


  searchClientDetails() {
    if (this.searchForm.invalid) {
      this.isValidFormSubmitted = false;
      this.searchForm.markAllAsTouched();

      return;
    }
    this.isValidFormSubmitted = true;
    this.clientSpinnerButtonOptions.active = true;
    // this will be comment after dynamic start
    // this.resultsLength=this.SalesforceClients.length;
    //     this.searchResult= new MatTableDataSource(this.SalesforceClients);
    //     this.searchResult.paginator = this.paginator;
    //     this.searchResult.sort=this.sort;
    //     this.display='';
    //     this.clientSpinnerButtonOptions.active=false;

    // this will be comment after dynamic end

    this.salesforceClientService.searchSalesforceClients(this.getSearchType.value, this.getSearchText.value).subscribe(result => {
      this.clientSpinnerButtonOptions.active = false;
      if (result.length > 0) {
        this.display = '';
        this.resultsLength = result.length;
        this.searchResult = new MatTableDataSource(result);
        this.searchResult.paginator = this.paginator;
        this.searchResult.sort = this.sort;
      }
      else {
        this.isDataFound = false;
        this.display = 'none';
      }

    }, error => {
      this.clientSpinnerButtonOptions.active = false;
      if (error instanceof HttpErrorResponse && error.status == 404) {
        this.isDataFound = false;
        this.display = 'none';
      }
    });
  }
  addSalesforceClient(data) {
    var obj = {
      "clientId": data.clientId,
      "clientName": data.clientName,
      "callingApplication": "salesforce",
      "targetApplication": "CBG",
      "industry": data.industry,
      "subIndustry": data.subIndustry,
      "creationUserName": "",
      "isSponsor": data.isSponsor,
      "sector": data.sector,
      "region": data.region,
      "icisClientId": data.icisClientId,
      "companyType": "testcompany1",
      "coverageTeamActive": "dmadmin;APK"
    }

    this.salesforceClientService.addSalesforceClient(data).subscribe(result=>{
      if(result.CBG.responseMessage == "SUCCESS"){
        window.open(result.CBG.cbgobjectInfo.cosipath, "_blank");
        // alert("r_object_id : " + result.CBG.cbgobjectInfo.r_object_id + '\n' + "r_folder_path : " + result.CBG.cbgobjectInfo.r_folder_path + '\n' + "cosipath: " + result.CBG.cbgobjectInfo.cosipath);
      }
      else
      {
        this.snackBarService.message = result.CBG.responseMessage;
        this.snackBarService.showSnackbar();
      }
      
    }, error => {
      if (error instanceof HttpErrorResponse) {
        this.snackBarService.message = error.message;
        this.snackBarService.showSnackbar();
       
      }
    });
  }
  viewSalesforceClient(url){
    window.open("insight://|ri|379627|oi|E0b05caeb80003394", "_blank");

  }
  // viewClienDetails(data, type) {
  //   if (type == 'add') {
  //     var obj = {
  //       "clientName": data.clientName,
  //       "industry": data.industry,
  //       "subIndustry": data.subIndustry
  //     }
  //     this.relationshipService.createRelationship(obj).subscribe(result => {
  //       this.snackBarService.message = result.IBCM.responseMessage;
  //       this.snackBarService.showSnackbar();
  //     }, error => {
  //       this.snackBarService.message = "error occured";
  //       this.snackBarService.showSnackbar();
  //     });
  //   }
  //   else {
  //     const dialogRef = this.dialog.open(ViewclientComponent, {
  //       width: '80%',
  //       data: data
  //     });

  //     dialogRef.afterClosed().subscribe(result => {

  //     });
  //   }

  // }

}
