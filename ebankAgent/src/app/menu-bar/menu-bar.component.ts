/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Agent } from '../model/Agent';
import { KeycloakSecurityService } from '../Service/keycloak-security.service';
import { isThursday } from 'date-fns';
import { UploadFileService } from '../Service/upload-file.service';
import { PortefeuilleService } from '../Service/portefeuille.service';


@Component({
  selector: 'app-nemu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  _agent:Agent

  constructor(private route:Router,private kcService: KeycloakSecurityService,private portefeuilleService:PortefeuilleService) { }

  ngOnInit(): void {
   this.portefeuilleService.getCurrentUser()
   .subscribe(event=>{console.log(event);})
   console.log(this.kcService.kc.loadUserInfo());
  }

  onLogout(){
    this.kcService.kc.logout();
  }


  onChangePassword(){
    this.kcService.kc.accountManagement();
  }

  isAppManager(){
    
    return this.kcService.kc.hasResourceRole("manager")
  }

  isCaissier(){
    return this.kcService.kc.hasResourceRole("caissier");
  }

  isCompteManager(){
    return this.kcService.kc.hasResourceRole("compte-manager");
  }

  isChargeClienthele(){
    return this.kcService.kc.hasResourceRole("charge-clienthele");
  }
 
    
  }


