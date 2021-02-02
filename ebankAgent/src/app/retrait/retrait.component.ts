import { Component, OnInit } from '@angular/core';
import { Compte } from '../model/Compte';
import { Agent } from '../model/Agent';
import { Operation } from '../model/Operation';
import Swal from 'sweetalert2';
import { OperationService } from '../Service/operation.service';
import { CompteService } from '../Service/compte.service';


@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.component.html',
  styleUrls: ['./retrait.component.css']
})
export class RetraitComponent implements OnInit {
  newOperation: Operation
  _compte: Compte
  _agent: Agent

  constructor(private _operationService: OperationService,
              private _compteService: CompteService) { }

  ngOnInit(): void {

    this.init();
 
  }

  onSubmit(){
    this.newOperation.agent = this._agent //this.compte.agent
    this._compteService.getCompteByRib(this._compte.rib).subscribe(
      data => {
        //this._compte = dat
        this.newOperation.compteSource = data
        this.newOperation.numOperation = Math.floor(Math.random() * 1000000)
        this._operationService.retirer(this.newOperation)
              .subscribe(
                data =>Swal.fire({
                  title:"Retrait effectue par succes ",
                  confirmButtonColor: '#4babc0',
                  confirmButtonText: "OK",
                  width: 600 
                }).then(function(){
                  window.location.href = "/operations/liste"})
                   , err => { Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: "Impossible d'effectuer l'operation",
                  confirmButtonColor: '#4babc0',
                }).then(function(){
                  window.location.href = "/operations/retrait";
                })
                   }
                   )
      }

      
    )
    

    
    
  }

  init(){
    this._compte = new Compte();
    this.newOperation = new Operation()
    this.newOperation.typeOperation = "retrait"
   /* this.newOperation.numOperation = 0
    this.newOperation.montant*/
    this.newOperation.dateOperation = new Date()
   
    this.newOperation.compteSource = new Compte()
    this.newOperation.compteDestination = null
    
  }


}
