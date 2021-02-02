import { Component, OnInit } from '@angular/core';
import { Agent } from '../model/Agent';
import { Compte } from '../model/Compte';
import { Operation } from '../model/Operation';
import Swal from 'sweetalert2';
import { OperationService } from '../Service/operation.service';
import { CompteService } from '../Service/compte.service';

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {
  
  newOperation: Operation
  _compteSource: Compte
  _compteDestination: Compte
  _agent: Agent

  constructor(private _operationService: OperationService,
              private _compteService: CompteService) { }

  ngOnInit(): void {
    this.init()
  }

  onSubmit(){
   this.newOperation.agent = this._agent 
            this.newOperation.compteSource = this._compteSource
            this.newOperation.compteDestination = this._compteDestination;
            this.newOperation.numOperation = Math.floor(Math.random() * 1000000)
        
            this._operationService.virer(this.newOperation)
                .subscribe(
                  data =>  Swal.fire({
                  
                    title:"virement effectue par succes ",
                   
                    confirmButtonColor: '#4babc0',
                    confirmButtonText: "OK",
                    width: 600
                    
                  }).then(function(){
                    window.location.href = "/operations/liste"})
                     , err => { Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Impossible d'effectuer l'operation ",
                    confirmButtonColor: '#4babc0'
                  }).then(function(){
                    window.location.href = "/operations/virement";
                  })
                     })
      }
    

  init(){
    this._compteSource = new Compte()
    this._compteDestination = new Compte()
    this.newOperation = new Operation()
    this.newOperation.typeOperation = "virement"
    this.newOperation.numOperation = 0
    this.newOperation.dateOperation = new Date()
    this.newOperation.montant
    this.newOperation.compteSource = new Compte
    this.newOperation.compteDestination = new Compte()
  }

}
