import { Component, OnInit } from '@angular/core';
import { OperationService } from '../Service/operation.service';
import { Router } from '@angular/router';
import { Operation } from '../model/Operation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {
  public motif:string;
  pageOperation:any=[];
  numOperation:number;
  motCle:string;

  constructor(private operationService: OperationService, public router:Router) { }

  ngOnInit(): void {

    this.operationService.getOperations()
        .subscribe(
          data =>{
            console.log("show : "+data);
            this.pageOperation =<Operation>data;
          },
          error => console.error(error)
          ) 
  }

  keyBoardEvent(e) {
    console.log(this.motCle);
    console.log("event")
    console.log(this.motCle.length);
    if ( this.motCle.length !== 0) {
      this.recherche();
    }
    else {
      this.listOperation();
    }
  }
  listOperation(){
    console.log('list')
    this.operationService.getOperations()
    .subscribe((data)=>{
      this.pageOperation=data;
       }),(error)=> err=>{
         console.log("errrrrre")
        this.router.navigateByUrl("/login");
      }
    }

  recherche() {
    this.operationService.chercherOperation(this.motCle)
    .subscribe((data: any) => {
     this.pageOperation = data;
     console.log(data)
     if (data.length==0) {
       console.log("vide")
        Swal.fire(
          'Aucun enregistrement n est trouvé')}
      } , ( error) => console.log(error));
  }


}
