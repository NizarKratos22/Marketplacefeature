import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OpportunityService {
     
  baseURL = "http://localhost:9091/Opportunity"



  constructor(private opportunityhttp :HttpClient) { }

 getOpportunityByUserId(id:any):Observable<any>{
  return this.opportunityhttp.get<any>(this.baseURL+"/getByUserId/"+id);
 }

 getallOpportunities():Observable<any>{
  return this.opportunityhttp.get(this.baseURL+"/getAll/");
 }

addOpportunity(Opportunity:any , id:any):Observable<any>
{
  return this.opportunityhttp.post<any>(this.baseURL+"/addOpportunity/"+id,Opportunity);
}

deleteOpportunity(id:any):Observable<any>{
  return this.opportunityhttp.delete(this.baseURL+"/delete/"+id);
}

getOpportunityById(id:any):Observable<any>{
  return this.opportunityhttp.get<any>(this.baseURL+"/getByid/"+id);
}
CountOpportunityByIdUser(id:any):Observable<any>{
  return this.opportunityhttp.get(this.baseURL+"/CountOpportunityByIdUser"+id);
}

countOpportunity():Observable<any>{
  return this.opportunityhttp.get(this.baseURL+"/countOpportunity");
}

addImage(file:any,id:any):Observable<any>{
  return this.opportunityhttp.put<any>(this.baseURL +"/Image/"+id,file);
}
masquerOpportunity(id:any):Observable<any>{
  return this.opportunityhttp.put(this.baseURL +"/masquer/"+id, null);
}
updateOpportunity(id:any ,opportunity:any):Observable<any>{
  return this.opportunityhttp.put(this.baseURL+"/update/"+id,opportunity);
}
}
