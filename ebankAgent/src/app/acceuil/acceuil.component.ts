import { Component, OnInit } from '@angular/core';
import { KeycloakSecurityService } from '../Service/keycloak-security.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  constructor(private kcService: KeycloakSecurityService) { }

  ngOnInit() {
  }

  onLogin(){
    this.kcService.kc.login();
  }
}
