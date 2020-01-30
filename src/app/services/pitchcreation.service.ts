import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PitchcreationService {

  baseUrl="http://wdvra97a0184.wellsfargo.com:9003/";

  constructor(private _http:HttpClient) {
  
   }

  getIndustryDetails(): Observable<any>{
    return this._http.get<any>(this.baseUrl+'getIndustry');
  }
  getClientNames():Observable<any>{
    return this._http.get<any>(this.baseUrl+'getClientNames');
  }
  getCpl1Details():Observable<any>{
    return this._http.get<any>(this.baseUrl+'getCPL1Details');
  }
  getCPL2FilteredDetails(val):Observable<any>{
    return this._http.get<any>(this.baseUrl+'getCPL2Details?Base='+val);
  }
  getTeamInfoDetails():Observable<any>{
    return this._http.get<any>(this.baseUrl+'getTeamInfoDetails')
  }
  getAdditionalTeamInfo():Observable<any>{
    return this._http.get<any>(this.baseUrl+'getAdditionalTeamInfo');
  }
  createpitch(data):Observable<any>{
    return this._http.post<any>(this.baseUrl+'pitchcreation',data);
  }


  getCoverageTeamInfo():Observable<any>{
    return this._http.get<any>(this.baseUrl+'getTeamInfoDetails')
  }
  getSubIndustryDetails():Observable<any>{
    return this._http.get<any>(this.baseUrl+'getSubIndustry')
  }
  createRelationship(data):Observable<any>{
    return this._http.post<any>(this.baseUrl+'createRelationship',data)
      // return this._http.post('api/client',data)
  }
}
