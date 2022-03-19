import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConnectionManagerService, api_calls, content_types, crud, response_type } from '../connection-manager.service';
import { booking } from './put-booking.service';

@Injectable({
  providedIn: 'root'
})
export class GetBookingsService {
  // VARS
  public referrer_src = new BehaviorSubject(null);
  public referrer__observable = this.referrer_src.asObservable();
  constructor(
    public conManager: ConnectionManagerService,
    public http : HttpClient,
  ) { }

  call_as_observerable(event_id:number = 0):Observable<booking[]>
  {
    const url = `${this.conManager.getApiServerPath()}/${api_calls.getBookings}/${event_id}`;
    const headers = this.conManager.createHttpHeader(content_types.TEXT, crud.GET);
   
    return this.http.get<booking[]>(url, { headers: headers, responseType: response_type.JSON})
   
  }
}
