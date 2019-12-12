import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddclientService {
  baseUrl="http://localhost:3200/";
  constructor(private _http:HttpClient) { }

  searchSalesforceClients(data):Observable<any>{
    return this._http.get<any>(this.baseUrl+'getSalesforceClients')
      //  return this._http.get('api/client',data)
  }
}
