import { Component, OnInit } from '@angular/core';
import { Agent } from '../model/Agent';
import { Compte } from '../model/Compte';
import { Operation } from '../model/Operation';
import { OperationService } from '../Service/operation.service';
import { CompteService } from '../Service/compte.service';

import Swal from 'sweetalert2';
import { KeycloakSecurityService } from '../Service/keycloak-security.service';

@Component({
  selector: 'app-versement',
  templateUrl: './versement.component.html',
  styleUrls: ['./versement.component.css']
})
export class VersementComponent implements OnInit {
 
  newOperation: Operation
  _compte: Compte
  _agent: Agent

  constructor(private _operationService: OperationService,private kcSecurity:KeycloakSecurityService,
              private _compteService: CompteService) { }

  ngOnInit(): void {
    this.init();
    console.log(this.kcSecurity.kc.token);
  }

  onSubmit(){
       /* this.newOperation.agent = this._agent;*/
      
        this.newOperation.compteDestination = this._compte;
   /* this.newOperation.numOperation = Math.floor(Math.random() * 1000000);*/
     
        
        this._operationService.verser(this.newOperation)
              .subscribe(
                data =>Swal.fire({
                  
                  title:"versement effectue par succes ",
                 
                  confirmButtonColor: '#4babc0',
                  confirmButtonText: "OK",
                  width: 600
                  
                }).then(function(){
                  window.location.href = "/operations/liste"})
                   , err => { 
                    Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text:"Impossible d'effectuer l'operation",
                  confirmButtonColor: '#4babc0'
                }).then(function(){
                  window.location.href = "/operations/versement";
                })
                   }
                   )
      
    
  }

  init(){
    this._compte = new Compte();
    this.newOperation = new Operation();
    this.newOperation.typeOperation = "versement"
    this.newOperation.numOperation = 0
    this.newOperation.dateOperation = new Date();
    this.newOperation.montant=0
    this.newOperation.compteSource = null
    this.newOperation.compteDestination = new Compte();
   
  }


}
