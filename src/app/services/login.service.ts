import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
baseUrl="http://wdvra97a0184.wellsfargo.com:9003/";
  constructor(private _http:HttpClient) { }

  login(username, password): Observable<any>{
    return this._http.get<any>(this.baseUrl+'getUserDetails?UserName='+username+'&Password='+password)
  }
}
