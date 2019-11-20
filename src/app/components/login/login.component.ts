import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from '../../services/login.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
private formBuilder: FormBuilder,
private route: ActivatedRoute,
private router: Router,
private loginService : LoginService,
// private toastr: ToastrService
) { }
 
ngOnInit() {
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
setTimeout(() => {
  if(this.fval.email.value == 'test' && this.fval.password.value=='test')
    this.router.navigate(['/home']);
  else{
    this.spinnerButtonOptions.active=false;
    this.errorMsg="Invalid Username or Password.";
  }

}, 4000);

// this.loginService.login(this.fval.email.value, this.fval.password.value)
// .subscribe(
// data => {
// this.router.navigate(['/home']);
// },
// error => {
// // this.toastr.error(error.error.message, 'Error');
// this.loading = false;
// });
}

}
