import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionManagerService, api_calls, content_types, crud, response_type } from '../connection-manager.service';

export interface putEventCallback{
  message:string
}
export interface putEventData{
  training_id: number,
  date: Date,
  event_id? :number
}

@Injectable({
  providedIn: 'root'
})
export class PutEventService {

  constructor(
    public conManager: ConnectionManagerService,
    public http : HttpClient
  ) { }

  call_as_observerable(training_id:number = null, date: Date = null):Observable<putEventCallback>
  {
    const url = `${this.conManager.getApiServerPath()}/${api_calls.putEvent}`;
    const headers = this.conManager.createHttpHeader(content_types.APPLICATION_JSON, crud.PUT);
    const data:putEventData = {training_id: training_id, date: date };
    return this.http.put<putEventCallback>(url, { headers: headers , arguments: data, responseType: response_type.JSON })

  }
}
