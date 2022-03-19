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
}
