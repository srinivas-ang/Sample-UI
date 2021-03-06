import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent} from '../../app.component';
import { LoginService } from '../../services/login.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  UserDetails:any= [
    {
      "UserName": "testadmin",
      "Password": "testadmin",
      "Role": "Admin"
    },
    {
      "UserName": "testbanker",
      "Password": "testbanker",
      "Role": "Banker"
    }
  ];
  loginForm: FormGroup;
loading = false;
submitted = false;
returnUrl: string;
errorMsg:string;

spinnerButtonOptions: MatProgressButtonOptions = {
  active: false,
  text: 'Login',
  spinnerSize: 18,
  raised: true,
  stroked: false,
  buttonColor: 'primary',
  spinnerColor: 'accent',
  fullWidth: false,
  disabled: false,
  mode: 'indeterminate',
  buttonIcon: {
    fontIcon: 'fingerprint'
  }
}
 
constructor(
private app: AppComponent,
private formBuilder: FormBuilder,
private route: ActivatedRoute,
private router: Router,
private loginService : LoginService,
// private toastr: ToastrService
) { }
 
ngOnInit() {
  if(localStorage.getItem("loginUserDetails"))
  {
    this.router.navigateByUrl('/home');
  }
 
this.loginForm = this.formBuilder.group({
email: ['', Validators.required],
password: ['', Validators.required]
});


 
}
 
// for accessing to form fields
get fval() { return this.loginForm.controls; }
 
onFormSubmit() {
this.submitted = true;
if (this.loginForm.invalid) {
  (<any>Object).values(this.fval).forEach(control => {
    control.markAsTouched();
  });
return;
}

this.loading = true;
this.spinnerButtonOptions.active=true;
var data = this.UserDetails.find(x=>x.UserName==this.fval.email.value && x.Password == this.fval.password.value);
if(data!=null && data !=undefined){
  this.spinnerButtonOptions.active=false;
  localStorage.setItem("loginUserDetails",JSON.stringify(data));
  this.app.userDetails=data;
  this.router.navigateByUrl('/home');
}
else{
  this.errorMsg="Invalid Username or Password.";
  this.spinnerButtonOptions.active=false;
}
// this.loginService.login(this.fval.email.value, this.fval.password.value)
// .subscribe(
// data => {
// if(data!=null && data !=undefined && data.length > 0){
//   this.spinnerButtonOptions.active=false;
//   localStorage.setItem("loginUserDetails",JSON.stringify(data[0]));
//   this.app.userDetails=data[0];
//   this.router.navigate(['/home']);
// }
// else{
//   this.errorMsg="Invalid Username or Password.";
//   this.spinnerButtonOptions.active=false;
// }

// },
// error => {
// // this.toastr.error(error.error.message, 'Error'); 
// this.loading = false;
// });
}

}
