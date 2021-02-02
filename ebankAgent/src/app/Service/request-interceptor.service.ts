import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakSecurityService } from './keycloak-security.service';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor{

  constructor(private kcSecurity:KeycloakSecurityService) { }
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    
    if(!this.kcSecurity.kc.authenticated) {return next.handle(req);}

    let request=req.clone({
      setHeaders:{
        Authorization: 'Bearer '+this.kcSecurity.kc.token
      }
    });
  console.log(this.kcSecurity.kc.token)

    return next.handle(request);

  }
}
