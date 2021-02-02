import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compte } from '../model/Compte';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor(private http:HttpClient){}
  _url = "http://localhost:8081/compte/"
 
  //_url="https://afoihi-agent.herokuapp.com/"


  getComptes(){
    return this.http.get(this._url+"agent/listCompteActive");
  }

  chercherCompteA(motCle: String){
  return this.http.get(this._url+"agent/chercherA?mc="+motCle);
   }

   chercherCompteD(motCle: String){
     console.log("chercher compte");

    return this.http.get(this._url+"agent/chercherD?mc="+motCle);
     }

   desactiverCompte(compte: Compte){
    
    return this.http.put(this._url+"agent/desactiverCompte",compte);
     }

     activerCompte(compte:Compte){
      
       return this.http.put(this._url+"agent/activeCompte",compte);
     }

    getCompteDesactive(){
      return this.http.get(this._url+"agent/listCompteDesactive");
    }
   
    saveCompte(compte: Compte) {
      return this.http.post<Compte>(this._url+"agent/saveCompte",compte);
    }


    getCompteByRib(rib:String){
      return this.http.get<Compte>(this._url+"CC/rib/"+rib)
    }
  }
