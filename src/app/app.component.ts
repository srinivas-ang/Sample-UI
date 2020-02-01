import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CIBUI';
  public userDetails:any;
 constructor(private router:Router){

 }
  ngOnInit() {
    this.userDetails=JSON.parse(localStorage.getItem('loginUserDetails'));
  }
  logout(){
    this.userDetails=null;
    localStorage.clear();
this.router.navigateByUrl('/login');
  }
}
