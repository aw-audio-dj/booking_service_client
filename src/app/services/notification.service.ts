import { Injectable } from '@angular/core';
declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showNotification(from, align ,text:string){
      const type = ['','info','success','warning','danger'];

      var color = Math.floor((Math.random() * 4) + 1);
      $.notify({
          icon: "pe-7s-gift",
          message: text
      },{
          type: type[color],
          timer: 1000,
          placement: {
              from: from,
              align: align
          }
      });
  }
}
