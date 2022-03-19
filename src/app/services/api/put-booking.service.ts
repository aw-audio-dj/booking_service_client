import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_calls, ConnectionManagerService, content_types, crud, response_type } from '../connection-manager.service';
import { referrer } from './get-referrer.service';

export interface booking{
  booking_id?: number,
  event_id: string,
  timestamp?: string
}

export interface putBookingCallback{
  message: string
}


@Injectable({
  providedIn: 'root'
})
export class PutBookingService {

  constructor(
    public conManager: ConnectionManagerService,
    public http : HttpClient,
  ) 
  { 

  }

  call_as_observerable(event_id:number = 0):Observable<putBookingCallback>
  {
    const url = `${this.conManager.getApiServerPath()}/${api_calls.putBooking}/${event_id}`;
    const headers = this.conManager.createHttpHeader(content_types.TEXT, crud.PUT);
   
    return this.http.put<putBookingCallback>(url, { headers: headers, responseType: response_type.JSON})
   
  }
}
