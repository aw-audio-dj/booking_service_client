import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ConnectionSettings{
  server : {
    url: string,
    port: number
  }
}
export let connectionSettings: ConnectionSettings = {
  server: {
    url : "http://localhost",
    port: 3010
  }
}

export enum api_calls{
  getEventsOfTraining = "eventsOfTraining",
  getTrainingsBetweenDates = "trainingsBetweenDates",
  getTrainings = "trainings",
  putBooking = "booking",
  putEvent = "event",
  putTraining = "training",
  getReferrer = "referrer",
  getBookings = "bookings"
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
  getConnectionSettings():ConnectionSettings
  {
    return connectionSettings;
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
