import { Component, OnInit } from '@angular/core';
import { portefeuille } from '../model/portefeuille';
import { PortefeuilleService } from '../Service/portefeuille.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Agent } from '../model/Agent';
import { AgentService } from '../Service/agent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portefeuille-gestion',
  templateUrl: './portefeuille-gestion.component.html',
  styleUrls: ['./portefeuille-gestion.component.css']
})
export class PortefeuilleGestionComponent implements OnInit {

  constructor(private portefeuilleSrvice: PortefeuilleService,private modalService: NgbModal,private agentService:AgentService) { }
  portefeuille:portefeuille;
  agentAgence:Agent[];
  agentAffecte:Agent;
  idAgent:number;
  portefeuilleModifie:portefeuille;

  motCle:string;

  ngOnInit() {
    this.portefeuilleSrvice.getCurrentUser()
    .subscribe((data:any)=>{
    
      console.log(data);
      },(error)=>console.log(error));
    this.listPortefeuille();

  }

  listPortefeuille(){
    this.portefeuilleSrvice.getPortefeuille()
    .subscribe((data:any)=>{
      this.portefeuille=data;
      console.log(data);
      },(error)=>console.log(error));
  }

  listAgent(content,porte){
    console.log(porte.agent.id)
    this.portefeuilleModifie=porte;
    console.log(this.portefeuilleModifie);
    this.modalService.open(content);
    this.portefeuilleSrvice.getlistAgent(1)
    .subscribe((data:any)=>{
      this.agentAgence=data;
      console.log(data);
      },(error)=>console.log(error));
  }

  /*reaffectation(portefeuille:portefeuille){
    this.portefeuilleSrvice.updatePortefeuille(this.modalData)
  .subscribe(data => {console.log(data);this.modalService.dismissAll(); window.location.href = "dashboard/calender";});

  }*/


  affecteagent(){
   this.portefeuilleModifie.agent=this.agentAffecte;
   this.portefeuilleSrvice.updatePortefeuille(this.portefeuilleModifie)
   .subscribe((data:any)=>{
    this.agentAgence=data;
    console.log(data);
    },(error)=>console.log(error));
    this.modalService.dismissAll();
  }




  onItemChange(value){
    this.agentService.getAgentById(value)
    .subscribe((data:any)=>{
      this.agentAffecte=data;
      console.log(data);
      },(error)=>console.log(error));
 }

 keyBoardEvent(e){
  if(this.motCle.length != 0){
    console.log(this.motCle);
   this.portefeuilleSrvice.getPortefeuilleByMc(Number(this.motCle))
   .subscribe((data:any)=>{
    this.portefeuille=data; 
    if(this.portefeuille==null){
       Swal.fire(
         {
           confirmButtonColor: '#4babc0',
           confirmButtonText: "OK",
           width: 600,

         text:'Aucun enregistrement n est trouvé'}
         )
       }
     },(error)=>console.log(error));
  }
  else{
    console.log("vide")
    this. listPortefeuille();
  }
}



}
