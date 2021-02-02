import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/file/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  
  getExistingFiles() {
    return this.http.get<any>(this.baseUrl+"/file/list");
   }

   /*getEssaie(){
     return this.http.get(this.baseUrl+"/userinfo")
   }*/
  
  deleteFile(nameFile: string) {
    return this.http.delete(this.baseUrl+"/file/delete/"+nameFile);
  }

  downloadFile(nameFile:string){
   /* const req = new HttpRequest('GET', `${this.baseUrl}/file/download/${nameFile}`, {
  
      responseType:  'blob'
    });
     return this.http.request(req);
    */
    /*return this.http.get<any>(this.baseUrl+"/file/download/"+nameFile,{responseType: 'text'});*/

    return this.http.get<Observable<Blob>>(this.baseUrl+"/file/download/"+nameFile, {  responseType: 'blob' as 'json'});
   

  }

  searchFile(mc:string) {
    return this.http.get<string[]>(this.baseUrl+"/file/search/"+mc);
   }
}
