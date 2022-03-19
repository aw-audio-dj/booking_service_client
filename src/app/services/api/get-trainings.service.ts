import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { api_calls, ConnectionManagerService, connectionSettings, content_types, crud, response_type } from '../connection-manager.service';
import { HelperFunctionsService } from '../helper-functions.service';
import { booking_event } from './get-events-of-training.service';

export interface training{
  training_id: number,
  name: string,
  description: string,
  referrer_id: number,
  price: number
}

@Injectable({
  providedIn: 'root'
})
export class GetTrainingsService {
  // VARS
  public trainings_src = new BehaviorSubject(null);
  public trainings__observable = this.trainings_src.asObservable();
  public test_trainings: ReplaySubject<training[]> = new ReplaySubject<training[]>(1);
  

  constructor(
    public conManager: ConnectionManagerService,
    public http : HttpClient,
    private helper: HelperFunctionsService,

  ) 
  {
    const trainingsPrefill:training = {training_id: 0,name: "Bitte Objekt auswählen", description:"test",price: 123.44,referrer_id:1};
    this.test_trainings.next([trainingsPrefill])
  }


  async call()
  {
    const url = `${this.conManager.getApiServerPath()}/${api_calls.getTrainings}`;
    const headers = this.conManager.createHttpHeader(content_types.TEXT, crud.GET);
    // console.log("headers ",headers)
    this.http.get(url, { headers: headers, responseType: response_type.JSON})
    .subscribe((callback:Array<training>) => {
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
        console.log("> trainings ",callback);
        this.trainings_src.next(callback);
        this.test_trainings.next(callback)

      } 
      catch (error) 
      {
        console.log(error)
      }
      
      
    })
  }

  call_as_observerable(training_id:number = 0):Observable<training[]>
  {
    const url = `${this.conManager.getApiServerPath()}/${api_calls.getTrainings}`;
    const headers = this.conManager.createHttpHeader(content_types.TEXT, crud.GET);
   
    return this.http.get<training[]>(url, { headers: headers, responseType: response_type.JSON})
   
  }

}
