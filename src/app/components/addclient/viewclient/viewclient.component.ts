import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-viewclient',
  templateUrl: './viewclient.component.html',
  styleUrls: ['./viewclient.component.css']
})
export class ViewclientComponent implements OnInit {
master:any;
  sampleData=[
    {
      Name:"Folder 1",
      ModifiedDate:"Todays date",
      ModifiedBy:"Banker",
      IsFolder:true
    },
    {
      Name:"Document 1",
      ModifiedDate:"Todays date",
      ModifiedBy:"Banker",
      IsFolder:false
    },
    {
      Name:"Folder 2",
      ModifiedDate:"Todays date",
      ModifiedBy:"Banker",
      IsFolder:true
    },
    {
      Name:"Folder 3",
      ModifiedDate:"Todays date",
      ModifiedBy:"Banker",
      IsFolder:true
    },
    {
      Name:"Document 2",
      ModifiedDate:"Todays date",
      ModifiedBy:"Banker",
      IsFolder:false
    },
  ]
  constructor(public dialogRef: MatDialogRef<ViewclientComponent>,@Inject(MAT_DIALOG_DATA) public source: any) { }

  ngOnInit() {
    this.master=this.source
  }
  closeDialog(){
    this.dialogRef.close();
  }

}
