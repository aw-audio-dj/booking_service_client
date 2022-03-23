import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConnectionManagerService, api_calls, content_types, crud, response_type } from '../connection-manager.service';
import { booking_event } from './get-events-of-training.service';

export interface referrer{
  referrer_id: number,
  surname: string,
  lastname: string
}

@Injectable({
  providedIn: 'root'
})
export class GetReferrerService {
  // VARS
  public referrer_src = new BehaviorSubject(null);
  public referrer__observable = this.referrer_src.asObservable();
  constructor(
    public conManager: ConnectionManagerService,
    public http : HttpClient,
  )
  {

  }

  call_as_observerable(referrer_id:number = 0):Observable<referrer[]>
  {
    const url = `${this.conManager.getApiServerPath()}/${api_calls.getReferrer}/${referrer_id}`;
    const headers = this.conManager.createHttpHeader(content_types.TEXT, crud.GET);
    return this.http.get<referrer[]>(url, { headers: headers, responseType: response_type.JSON})
  }

  call_as_promise(referrer_id:number = 0):Promise<referrer[]>
  {
    const url = `${this.conManager.getApiServerPath()}/${api_calls.getReferrer}/${referrer_id}`;
    const headers = this.conManager.createHttpHeader(content_types.TEXT, crud.GET);
    const promise = this.http.get<referrer[]>(url, { headers: headers, responseType: response_type.JSON}).toPromise();
    return promise;
  }
}
