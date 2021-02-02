import { Injectable } from '@angular/core';
import {KeycloakInstance} from 'keycloak-js';
import * as Keycloak from 'keycloak-js';
/*declare let keycloak:any;*/

@Injectable({
  providedIn: 'root'
})


export class KeycloakSecurityService {
public kc:KeycloakInstance;

  constructor() { }

  public async init(){
    this.kc=Keycloak({
      url:"http://localhost:8080/auth/",
      realm:"EBANK",
      clientId:"EBANKAGENT"
     
    })
    await this.kc.init({
      onLoad:"login-required"
    })
  }


}
