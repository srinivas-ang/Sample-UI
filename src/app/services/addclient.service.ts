import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AddclientService {
  headers:HttpHeaders;
   baseUrl="http://localhost:3200/";
  constructor(private _http:HttpClient) { }

  searchSalesforceClients(criteriaType, criteriaValue):Observable<any>{
    var userDetails=JSON.parse(localStorage.getItem("loginUserDetails"));
    const httpOptions = {
      headers: new HttpHeaders({
        'appName': 'IBCM',
        'username':userDetails ? userDetails.UserName:'sample'
      })
    };
    return this._http.get<any>(this.baseUrl+'getSalesforceClients',httpOptions);
    // return this._http.get('api/searchClient/'+ criteriaType + '/' + criteriaValue,httpOptions);
  }
}
