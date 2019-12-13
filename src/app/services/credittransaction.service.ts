import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredittransactionService {
  baseUrl="http://localhost:3200/";
  constructor(private _http:HttpClient) { }

  getIndustryDetails(): Observable<any>{
    return this._http.get<any>(this.baseUrl+'getIndustry');
  }
  getClientName(): Observable<any>{
    return this._http.get<any>(this.baseUrl+'getCreditClientNames');
  }
getReportTypes():Observable<any>{
  return this._http.get<any>(this.baseUrl+'getCreditTransactionReportTypes');
}
getCreditCPL1():Observable<any>{
  return this._http.get<any>(this.baseUrl+'getCreditCPL1');
}
getCreditCPL2():Observable<any>{
  return this._http.get<any>(this.baseUrl+'getCreditCPL2');
}
getCreditTransactionTeams():Observable<any>{
  return this._http.get<any>(this.baseUrl+'getCreditTransactionTeams');
}

createCreditTransaction(data):Observable<any>{
  return this._http.post<any>(this.baseUrl+'createCreditTransaction',data);
}

}
