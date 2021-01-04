import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }
 
  openModalSnack = (message: string,action: string,details: any = null,duration: number = 3000) => {

      if(action === 'success'){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: message,
          showConfirmButton: false,
          timer: duration,
          toast: true,
        })

      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: message,
          text: details,
          timer: duration,
          footer: '<a href>Why do I have this issue?</a>'
        })
      }
  };
  openConfirm = (title = null) => new Promise((resolve, reject) => {
    Swal.fire({
      title: title,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado!',
          '',
          'success'
        );
        resolve(true);
      } else {
        reject(false);
      }
    }).catch(e => reject(false));
  });

  openSnackBar(message: string, action: string, duration: number = 6000) {

    if (action === 'success') {
      Swal.fire({
        icon: 'success',
        position: 'top-end',
        title: message,
        showConfirmButton: false,
        timer: duration,
        toast: true,
        background: 'rgba(0, 0, 0, 0.96)',
      });
    } else if (action === 'error') {
      Swal.fire({
        icon: 'error',
        position: 'top-end',
        title: message,
        showConfirmButton: false,
        timer: duration,
        toast: true,
        background: 'rgba(0, 0, 0, 0.96)',
      });
    } else {
      Swal.fire({
        icon: 'error',
        position: 'top-end',
        title: message,
        showConfirmButton: false,
        timer: duration,
        toast: true,
        background: 'rgba(0, 0, 0, 0.96)',
      });
    }

  }

  convertBase64ToFile(base64:string, filename:string,filetype:string):string{

    let today = new Date();
    let date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+'_'+time;


    const downloadLink = document.createElement("a");     
    downloadLink.href = `data:${filetype};base64,${base64}`;
    downloadLink.download = ` ${dateTime}_${filename}`;
    downloadLink.click();
    return "Report created!";
  }
}
