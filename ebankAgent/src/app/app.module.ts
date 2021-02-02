import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalenderComponent } from './calender/calender.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RetraitComponent } from './retrait/retrait.component';
import { VersementComponent } from './versement/versement.component';
import { VirementComponent } from './virement/virement.component';
import { OperationComponent } from './operation/operation.component';
import { CompteActiveComponent } from './compte-active/compte-active.component';
import { CompteDesativeComponent } from './compte-desative/compte-desative.component';
import { ClientAgenceComponent } from './client-agence/client-agence.component';
import { CreationCompteComponent } from './creation-compte/creation-compte.component';

import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { CreditComponent } from './credit/credit.component';

import { MontantDureeComponent } from './montant-duree/montant-duree.component';
import { CalendarService } from './Service/calendar.service';
import { PortefeuilleGestionComponent } from './portefeuille-gestion/portefeuille-gestion.component';
import { KeycloakSecurityService } from './Service/keycloak-security.service';
import { RequestInterceptorService } from './Service/request-interceptor.service';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';






export function kcFactory(kcSecurity:KeycloakSecurityService){
return ()=>kcSecurity.init();
}


@NgModule({
  declarations: [
    AppComponent,
    CalenderComponent,
    MenuBarComponent,
    LoginComponent,
    DashboardComponent,
    RetraitComponent,
    VersementComponent,
    VirementComponent,
    OperationComponent,
    CompteActiveComponent,
    CompteDesativeComponent,
    ClientAgenceComponent,
    CreationCompteComponent,
    CreditComponent,
    MontantDureeComponent,
    PortefeuilleGestionComponent,
    AcceuilComponent,
    UploadFilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    NgbModule,HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,MatIconModule,
    DragDropModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [FlatpickrModule,CalendarService,
  {provide:APP_INITIALIZER,deps:[KeycloakSecurityService],useFactory:kcFactory,multi:true},
  {provide:HTTP_INTERCEPTORS,useClass:RequestInterceptorService,multi:true}]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
