import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
baseUrl="";
  constructor(private _http:HttpClient) { }

  login(username, password): Observable<any>{
    return this._http.get<any>(this.baseUrl+'controller/login?username='+username+'&password='+password)
  }
}
