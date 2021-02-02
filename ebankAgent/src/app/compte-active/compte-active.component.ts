import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompteService } from '../Service/compte.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-compte-active',
  templateUrl: './compte-active.component.html',
  styleUrls: ['./compte-active.component.css']
})
export class CompteActiveComponent implements OnInit {
  public motCle:string="";
  public pageCompte:any=[];
  public page:number=0;
  public desactivationReussite:boolean;
  constructor(public httpClient:HttpClient,public compteService:CompteService,public router:Router) { }

  ngOnInit(): void {
   this.listCompte();
  }

  onDesactiver(c){
   
    Swal.fire({
      title: 'Vous etes sur ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '#4babc0',
      cancelButtonText: 'Non',
      confirmButtonText: 'Oui désactivé !'
    }).then((result) => {
      if (result.value) {
        
       Swal.fire({
        title:"Desactivation avec succes ",
                 
                  confirmButtonColor: '#4babc0',
                  confirmButtonText: "OK",
                  width: 600
       }
      )
      this.compteService.desactiverCompte(c)
     . subscribe((data:boolean)=>{
       this.desactivationReussite=data;
      console.log(this.desactivationReussite);
      this.pageCompte.splice(
        this.pageCompte.indexOf(c),1
      );
      window.location.href = "comptes/compteDesactive"
     },
        err=>{ Swal.fire(
          'Erreur non désactivé')})
       
      }
    })
  
  }
  onDetailCompte(idCompte){
    this.router.navigate(['comptes/detailsCompte',idCompte], {skipLocationChange: true});
  }

  onDetailClient(id){
    console.log(id);
    this.router.navigate(['detailClient',id]);
   }
  

  chercher(){
    this.listCompte();
  }
  
  listCompte(){
    this.compteService.getComptes()
    .subscribe((data:any)=>{
      this.pageCompte=data;
      console.log(data);
      },(error)=>console.log(error));
  }

  recherche(){
    this.compteService.chercherCompteA(this.motCle)
    .subscribe((data:any)=>{
     this.pageCompte=data;
     
     if(this.pageCompte.length==0){
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

  keyBoardEvent(e){
    if(this.motCle.length != 0){
      this.recherche();
    }
    else{
      this.listCompte();
    }
  }





}
