import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AIBUI';
  public userDetails:any;
 
  ngOnInit() {
    debugger
    this.userDetails=JSON.parse(localStorage.getItem('loginUserDetails'));
  }
 
}
