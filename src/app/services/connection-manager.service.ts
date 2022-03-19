import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export let connectionSettings = {
  server: {
    url : "http://localhost",
    port: 3010
  }
}

export enum api_calls{
  getEventsOfTraining = "getEventsOfTraining",
  getTrainingsBetweenDates = "getTrainingsBetweenDates",
  getTrainings = "getTrainings",
  putBooking = "putBooking",
  putEvent = "putEvent",
  putTraining = "putTraining",
  getReferrer = "getReferrer",
  getBookings = "getBookings"
}
export enum response_type{
  TEXT = "text",
  JSON = "json"
}
export enum content_types{
  TEXT = "text",
  APPLICATION_JSON = "application/json"
}
export enum crud{
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

@Injectable({
  providedIn: 'root'
})
export class ConnectionManagerService {

  constructor() 
  {

  }

  getApiServerPath():string
  {
    return connectionSettings.server.url+":"+connectionSettings.server.port
  }

  public createHttpHeader(contentType:string = null, method:string = null): HttpHeaders
  {
    return new HttpHeaders({
      'Content-Type': contentType!=null?contentType:'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': method!=null?method:'GET,PUT,POST,DELETE'
    })
  }
}
