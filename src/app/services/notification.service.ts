import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showNotification(from, align,text:string, color = 1){

      // const color = Math.floor((Math.random() * 5) + 1);

      switch(color){
        case 1:
        this.toastr.info(`<span class="now-ui-icons ui-1_bell-53"></span> ${text} `,'', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-info alert-with-icon",
          positionClass: 'toast-' + from + '-' +  align
        });
        break;
        case 2:
        this.toastr.success(`<span class="now-ui-icons ui-1_bell-53"></span> ${text}`, '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + from + '-' +  align
        });
        break;
        case 3:
        this.toastr.warning(`<span class="now-ui-icons ui-1_bell-53"></span> ${text}`, '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: 'toast-' + from + '-' +  align
        });
        break;
        case 4:
        this.toastr.error(`<span class="now-ui-icons ui-1_bell-53"></span> ${text}`, '', {
          timeOut: 8000,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: 'toast-' + from + '-' +  align
        });
        break;
        case 5:
        this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> ${text}`, '', {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-primary alert-with-icon",
            positionClass: 'toast-' + from + '-' +  align
          });
        break;
        default:
        break;
      }
  }
}
