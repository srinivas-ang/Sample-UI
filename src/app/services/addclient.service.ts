import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AddclientService {
  headers:HttpHeaders;
  userDetails:any;
   baseUrl="http://localhost:3200/";
  constructor(private _http:HttpClient) {
     this.userDetails=JSON.parse(localStorage.getItem("loginUserDetails"));
   }

  searchSalesforceClients(criteriaType, criteriaValue):Observable<any>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'appName': 'IBCM',
        'username':this.userDetails ? this.userDetails.UserName:'sample'
      })
    };
    // return this._http.get<any>(this.baseUrl+'getSalesforceClients',httpOptions);
    return this._http.get('api/searchClient/'+ criteriaType + '/' + criteriaValue,httpOptions);
  }
  addSalesforceClient(data):Observable<any>{
    data.UserName=this.userDetails ? this.userDetails.UserName:'sample';
    const httpOptions = {
      headers: new HttpHeaders({
        'appName': 'CBG',
        'userid':'sample',
        'username':this.userDetails ? this.userDetails.UserName:'sample'
      })
    };
    return this._http.post<any>('api/client',data,httpOptions);
  }
}
