import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../Service/upload-file.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse, HttpRequest } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  motCle:string;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  fileInfos: string[];

  constructor(private uploadService: UploadFileService) { }
  nameFile="Choose file from your computer"
  ngOnInit() {

this.getFiles();


  }
  getFiles(){
    this.uploadService.getExistingFiles().subscribe(
      event => {
    console.log(event);
  this.fileInfos=event;

});
  }


  keyBoardEvent(e){
    if(this.motCle.length != 0){
      this.uploadService.searchFile(this.motCle)
      .subscribe(event=>{
        this.fileInfos=event;
        console.log(event);
      })
    }
    else{this.getFiles();}
    
  }

selectFile(event) {
    this.selectedFiles = event.target.files;
    this.nameFile=event.target.files[0].name;
  }

  
downloadFile(nameFile){
  this.uploadService.downloadFile(nameFile).subscribe(
    (response: any) =>{
      let binaryData = [];
      binaryData.push(response);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: response.type}));
      downloadLink.setAttribute('download', nameFile);
      downloadLink.click();
      URL.revokeObjectURL(downloadLink.href);
    });
}

deleteFile(nameFile){
  console.log("delete");
  Swal.fire({
    title: 'Vous etes sur de supprimer le fichier ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'red',
    cancelButtonColor: '#4babc0',
    cancelButtonText: 'Non',
    confirmButtonText: 'Oui supprimer!'
  }).then((result) => {
    if (result.value) {
      this.uploadService.deleteFile(nameFile).subscribe(
        event => {
        console.log(event);
        Swal.fire({
         title:"Suppression par succes",           
         confirmButtonColor: '#4babc0',
         confirmButtonText: "OK",
         width: 600
   });
   window.location.href = "dashboard/file"
    },
    err=>{ Swal.fire(
      'Erreur non désactivé');});
  }});
  }





  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile).subscribe(
      event =>{
        if (event.type === HttpEventType.UploadProgress) {
                  this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
        }
      },
      err => {
        console.log(err.error.message);
        if(err.error.message=="File too large!") this.message = 'File too Large!';
        else   this.message = 'Could not upload the file!';
        this.progress = 0;
        this.currentFile = undefined;
        window.alert = new alert(this.message);
        window.location.href = "/dashboard/file";
      });

    this.selectedFiles = undefined;
  }

}
