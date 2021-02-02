import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CalenderComponent } from './calender/calender.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { RetraitComponent } from './retrait/retrait.component';
import { VirementComponent } from './virement/virement.component';
import { VersementComponent } from './versement/versement.component';
import { OperationComponent } from './operation/operation.component';
import {CompteActiveComponent} from './compte-active/compte-active.component';
import {CompteDesativeComponent} from './compte-desative/compte-desative.component';
import { ClientAgenceComponent } from './client-agence/client-agence.component';
import { CreationCompteComponent } from './creation-compte/creation-compte.component';
import { CreditComponent } from './credit/credit.component';
import { PortefeuilleGestionComponent } from './portefeuille-gestion/portefeuille-gestion.component';
import { MontantDureeComponent } from './montant-duree/montant-duree.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';






const routes: Routes = [
  
 { path: '', redirectTo: '/dashboard', pathMatch: 'full'},

  {path:'acceuil',component:AcceuilComponent},
  /*{ path:'user',component: CreateUserComponent},*/
  {path:'dashboard',component:DashboardComponent},
  {path:"portefeuille",component:PortefeuilleGestionComponent},
  /*{path:"dashboard/calender",component:CalenderComponent},*/

  {path:"dashboard",
  children:[
    {path:"file",component:UploadFilesComponent},
    {path:"calender",component:CalenderComponent}
  ]},

  {path:"compte",
  children:[
    {path:"creation-compte",component:CreationCompteComponent},
    {path:"compteDesactive",component:CompteDesativeComponent},
    {path:"compteActive",component:CompteActiveComponent}
  ]},
  {path:"credit",
  children:[
    {path:"montant-duree",component:MontantDureeComponent}
  ]},

  {path:"client",
  children:[
    {path:"listClient",component: ClientAgenceComponent}
  ]},

  { path: "operations", 
  children: [
    { path: "", redirectTo: "/operations/liste", pathMatch: "full"},
    { path: "liste", component: OperationComponent},
    { path: "retrait", component: RetraitComponent},
    { path: "virement", component: VirementComponent},
    { path: "versement", component: VersementComponent}
  ]
} ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule,FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
