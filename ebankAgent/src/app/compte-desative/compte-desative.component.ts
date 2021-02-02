import { Component, OnInit } from '@angular/core';
import { Compte } from '../model/Compte';
import { CompteService } from '../Service/compte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compte-desative',
  templateUrl: './compte-desative.component.html',
  styleUrls: ['./compte-desative.component.css']
})
export class CompteDesativeComponent implements OnInit {
  pageCompte:Array<Compte>;
  motCle:string="";
  activationReussite:any;
  constructor(public compteService:CompteService) { }

  ngOnInit(): void {
    this.listCompteDesactive();
  }
  onActiver(c){

    Swal.fire({
    title: 'Vous etes sur ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'red',
    cancelButtonColor: '#4babc0',
    cancelButtonText: 'Non',
    confirmButtonText: 'Oui activé!'
  }).then((result) => {
    if (result.value) {
      
     Swal.fire(
       {
      title:"Activation avec succes ",
                 
      confirmButtonColor: '#4babc0',
      confirmButtonText: "OK",
      width: 600
}
     )

    this.compteService.activerCompte(c)
   . subscribe((data:boolean)=>{
     this.activationReussite=data;
    console.log(this.activationReussite);
    this.pageCompte.splice(
      this.pageCompte.indexOf(c),1
    );
    window.location.href = "comptes/compteActive"
   },
      err=>{ Swal.fire(
        'Erreur non désactivé')})
     
    }
  })
}
  listCompteDesactive(){
    this.compteService.getCompteDesactive()
    .subscribe((data:any)=>{
      this.pageCompte=data;
      console.log(data);
      },(error)=>console.log(error));
  }

  recherche(){
    console.log(this.motCle);
    this.compteService.chercherCompteD(this.motCle)
    .subscribe((data:any)=>{
     this.pageCompte=data;
     
     if(this.pageCompte.length==0){
        Swal.fire(
          'Aucun enregistrement n est trouvé')}
      },(error)=>console.log(error));
     
  }

  keyBoardEvent(e){
    if(this.motCle.length != 0){
      this.recherche();
    }
    else{
      this.listCompteDesactive();
    }
  }

}
