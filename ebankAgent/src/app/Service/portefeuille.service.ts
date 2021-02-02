import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { portefeuille } from '../model/portefeuille';
import { Agent } from '../model/Agent';


@Injectable({
  providedIn: 'root'
})
export class PortefeuilleService {
  private host:string="http://localhost:8081";
  constructor(private http:HttpClient) { }
  getCurrentUser(){
    return this.http.get(this.host+"/agent/currentAgent");
  }
  getPortefeuille() {
    return this.http.get<portefeuille[]>(this.host+"/portefeuille/list");
   }

   getlistAgent(id:number) {
    return this.http.get<Agent[]>(this.host+"/portefeuille/affectation/"+id);
   }

   updatePortefeuille(portefeuille:portefeuille) {
     console.log(portefeuille);
    return this.http.put(this.host+"/portefeuille/reaffectation/"+portefeuille.id,portefeuille);
   }
   getPortefeuilleByMc(id:number) {
    return this.http.get<portefeuille[]>(this.host+"/portefeuille/search/"+id);
   }

}
