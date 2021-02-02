import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { Compte } from '../model/Compte';
import { Agent } from '../model/Agent';
import { CompteService } from '../Service/compte.service';


@Component({
  selector: 'app-creation-compte',
  templateUrl: './creation-compte.component.html',
  styleUrls: ['./creation-compte.component.css']
})
export class CreationCompteComponent implements OnInit {
  client: Client = new Client();
  compte: Compte = new Compte();
  nouveauCompte: Compte;
  currentAgent: Agent;
  nextS1: boolean = false;
  nextS2: boolean = false;

  constructor(
     private compteService: CompteService ) { }

    ngOnInit(): void {
    
    
    }

    numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode === 101 || charCode === 69 || charCode === 45 || charCode === 43) {
        return false;
      }
      return true;
    }

    onNextStep1() {
      this.compte.client = this.client;
      this.nextS1 = true;
    }
    onTerminer(){ window.location.href = "/listClient";}

  onNextStep2() {
    
  this.compteService.saveCompte(this.compte)
    .subscribe(response => {
      this.nouveauCompte = response;
     
    
    });
    this.nextS2 = true;
    
  }


}
