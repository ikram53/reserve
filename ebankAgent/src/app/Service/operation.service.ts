import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Operation } from '../model/operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  _url = "http://localhost:8081/operation/"
  //_url="https://afoihi-agent.herokuapp.com/operation/";

  
  constructor(private http: HttpClient) { }

  getOperationsParClient(id:number){
    return this.http.get(this._url+"listOperation/"+id);   
   }
 

   chercherOperation(mc:string){
     return this.http.get(this._url+"recherche?mc="+mc);

   }
   getOperationsParCompte(id:number){
    return this.http.get(this._url+"listOperation/"+id);   
   }

  getOperations(){
    return this.http.get(this._url+"list")
  }

  getOperation(idClient: number){
    return this.http.get(this._url+"listOperation/"+idClient)
  }

  verser(operation: Operation){
    return this.http.post<String>(this._url+"versement", operation)
  }

  retirer(operation: Operation){
    return this.http.post<any>(this._url+"retrait", operation)
  }

  virer(operation: Operation){
    return this.http.post<any>(this._url+"virement", operation)
  }

  recharge(operation: Operation, codeRacharge:number){
    return this.http.post<any>(this._url+"recharge/"+codeRacharge, operation)
  }
}
