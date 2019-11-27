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
  private filteredSource:any=[];
  private searchText:any='';
  source:any[] = [
    {
      Name: 'James, Smith',
      Value: 'James, Smith'
    },
    {
      Name: 'Maria, Rodriguez',
      Value: 'Maria, Rodriguez'
    },
    {
      Name: 'James, Johnson',
      Value: 'James, Johnson'
    },
    {
      Name: 'Robert, Smith',
      Value: 'Robert, Smith'
    },
    {
      Name: 'Maria, Martinez',
      Value: 'Maria, Martinez'
    },
    {
      Name: 'IndusDavid, Smithtrial',
      Value: 'David, Smith'
    },
    {
      Name: 'Juan, Carlos',
      Value: 'Juan, Carlos'
    },
    {
      Name: 'Mike, Jones',
      Value: 'Mike, Jones'
    }

  ]
  constructor(public dialogRef: MatDialogRef<TeaminformatonComponent>){

  }
  ngOnInit(){
//     debugger
//     this.source.forEach(x=>{
//       this.filteredSource.push(x);
//     })
// this.filteredSource=Object.assign({}, this.source);
  }
// searchChange(){
//   if(this.searchText !='')
// this.filteredSource=this.source.filter(obj=> obj.Name.indexOf(this.searchText.toLowerCase()));
// else
// this.filteredSource=Object.assign({}, this.source);
// }
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
