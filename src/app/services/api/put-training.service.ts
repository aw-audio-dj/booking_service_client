import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionManagerService, api_calls, content_types, crud, response_type } from '../connection-manager.service';
import { referrer } from './get-referrer.service';

export interface putTrainingCallback{
  message:string
}
@Injectable({
  providedIn: 'root'
})
export class PutTrainingService {

  constructor(
    public conManager: ConnectionManagerService,
    public http : HttpClient
    )
    { }

  call_as_observerable(referrer_id:number = 0):Observable<putTrainingCallback>
  {
    const url = `${this.conManager.getApiServerPath()}/${api_calls.putTraining}`;
    const headers = this.conManager.createHttpHeader(content_types.TEXT, crud.GET);

    return this.http.put<putTrainingCallback>(url, { headers: headers, responseType: response_type.JSON})

  }
}
