import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-teaminformaton',
  templateUrl: './teaminformaton.component.html',
  styleUrls: ['./teaminformaton.component.css']
})
export class TeaminformatonComponent implements OnInit {

  private defaultSelected = 0
  private selection: any=[];
  destinationSelection:any=[];
  private destination:any=[];
source = [
  {
    Name: 'Deposits Other',
    Value: 'Deposits Other'
  },
  {
    Name: 'Fed Funds Deposits',
    Value: 'Fed Funds Deposits'
  },
  {
    Name: 'Interest Bearing DDAs',
    Value: 'Interest Bearing DDAs'
  },
  {
    Name: 'Non-Interest Bearing DDAs & Float',
    Value: 'Non-Interest Bearing DDAs & Float'
  },
  {
    Name: 'Structured Deposits',
    Value: 'Structured Deposits'
  },
  {
    Name: 'Sweep Balances',
    Value: 'Sweep Balances'
  },
  {
    Name: 'Time Deposits/Placements',
    Value: 'Time Deposits/Placements'
  },
    {
      Name: 'Deposits Other',
      Value: 'Deposits Other'
    },
    {
      Name: 'Fed Funds Deposits',
      Value: 'Fed Funds Deposits'
    },
    {
      Name: 'Interest Bearing DDAs',
      Value: 'Interest Bearing DDAs'
    },
    {
      Name: 'Non-Interest Bearing DDAs & Float',
      Value: 'Non-Interest Bearing DDAs & Float'
    },
    {
      Name: 'Structured Deposits',
      Value: 'Structured Deposits'
    },
    {
      Name: 'Sweep Balances',
      Value: 'Sweep Balances'
    },
    {
      Name: 'Time Deposits/Placements',
      Value: 'Time Deposits/Placements'
    },
    


  ]

  constructor(public dialogRef: MatDialogRef<TeaminformatonComponent>){

  }
  ngOnInit(){

  }

  sourceChange(event){
  this.selection=event.value;
  }
  
  movelefttoright(){
    if(this.selection != null && this.selection!=""){
  this.destination.push(this.selection)
  this.source = this.source.filter(obj => obj !== this.selection);
  this.selection='';
    }
  }
  moverighttoleft(){
     if(this.destinationSelection != null && this.destinationSelection!=""){
    this.source.push(this.destinationSelection)
  this.destination = this.destination.filter(obj => obj !== this.destinationSelection);
  this.destinationSelection='';
     }
  }
  sendSelectedData(){
    this.dialogRef.close(this.destination);
  }
  closeDialog() {
    this.dialogRef.close(this.destination);
  }
}
