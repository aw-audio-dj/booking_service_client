import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { api_calls, ConnectionManagerService, content_types, crud, response_type } from '../connection-manager.service';

export interface booking_event{
  event_id: number,
  date: string,
  training_id: number,
  maxAttendees: number,
}


@Injectable({
  providedIn: 'root'
})
export class GetEventsOfTrainingService {
  // VARS
  public events_src = new BehaviorSubject(null);
  public events__observable = this.events_src.asObservable();
  constructor(
    public conManager: ConnectionManagerService,
    public http : HttpClient,
  ) 
  { 

  }

  call(training_id:number = 0)
  {
    const url = `${this.conManager.getApiServerPath()}/${api_calls.getEventsOfTraining}/${training_id}`;
    const headers = this.conManager.createHttpHeader(content_types.TEXT, crud.GET);
   
    this.http.get(url, { headers: headers, responseType: response_type.JSON})
    .subscribe((callback:Array<booking_event>) => {
      try 
      {
        // console.log("> callback ",callback);
        // if(this.helper.isJson2(callback) == 'string')
        // {
        //   let trainings2 : Array<training> = JSON.parse(callback);
        //   console.log("> trainings ",trainings2);
        //   this.trainings_src.next(trainings2);
        //   this.test_trainings.next(trainings2)
        // }
        console.log("> event(s) ",callback);
        this.events_src.next(callback);
        // this.test_trainings.next(callback)

      } 
      catch (error) 
      {
        console.log(error)
      }
      
      
    })
  }

  call_as_observerable(training_id:number = 0):Observable<booking_event[]>
  {
    const url = `${this.conManager.getApiServerPath()}/${api_calls.getEventsOfTraining}/${training_id}`;
    const headers = this.conManager.createHttpHeader(content_types.TEXT, crud.GET);
   
    return this.http.get<booking_event[]>(url, { headers: headers, responseType: response_type.JSON})
   
  }
}
