import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperFunctionsService {

  constructor(

  )
  {

  }

  isJson(obj:string)
  {
    var t = typeof obj;
    return ['boolean', 'number', 'string', 'symbol', 'function'].indexOf(t) == -1;
  }

  isJson2(object_):string
  {
    var firstShot = typeof object_;
    if (firstShot !== 'object') {
        return firstShot;
    }
    else if (object_.constructor === [].constructor) {
        return 'array';
    }
    else if (object_.constructor === {}.constructor) {
        return 'object';
    }
    else if (object_ === null) {
        return 'null';
    }
    else {
        return 'don\'t know';
    }
  }

  germanTime(date_:Date)
  {
    let uhrzeit = ``;
    try
    {
      let mydate = new Date(date_);
      uhrzeit = mydate.getHours()+":"+(mydate.getMinutes() < 10 ? "0"+mydate.getMinutes() : mydate.getMinutes() )+" Uhr";
    } catch (error) {
      console.log(error);
    }finally{
      return uhrzeit;
    }
  }

  germanTimeFormat(time:Date)
  {
    let monat = (((time.getMonth())+1) < 10) ? "0"+((time.getMonth())+1): ((time.getMonth())+1);
    let stunde = time.getHours() < 10 ? "0"+time.getHours() : time.getHours();
    let minute = time.getMinutes() < 10 ? "0"+time.getMinutes() : time.getMinutes();
    let sekunde = time.getSeconds() < 10 ? "0"+time.getSeconds() : time.getSeconds();
    return (time.getDate())+"."+monat+"."+time.getFullYear()+ " - "+stunde+":"+minute+":"+sekunde+"s";
  }

  germanDateFormat(time:Date)
  {
    let monat = (((time.getMonth())+1) < 10) ? "0"+((time.getMonth())+1): ((time.getMonth())+1);
    return (time.getDate())+"."+monat+"."+time.getFullYear();
  }

  germanDateFormatWithTime(time:Date)
  {
    let monat = (((time.getMonth())+1) < 10) ? "0"+((time.getMonth())+1): ((time.getMonth())+1);
    return (time.getDate())+"."+monat+"."+time.getFullYear()+ " um "+this.germanTime(time);
  }
}
