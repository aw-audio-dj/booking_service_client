import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { booking_event } from '../services/api/get-events-of-training.service';
import { training } from '../services/api/get-trainings.service';



export interface TableTrainingsData {
  headerRow: string[];
  dataRows: BehaviorSubject<training_table_row[]>;
}

export interface training_table_row extends training {
  referrer: string
}

export interface TableEventsData{
  headerRow: string[],
  dataRows: BehaviorSubject<booking_event_row[]>;
}

export interface booking_event_row extends booking_event {
  training_name: string,
  free_bookings: number
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }


  sortEventArray(a:Promise<booking_event_row>, b:Promise<booking_event_row>):number
  {
    const key = "event_id";
    if (a[key] < b[key])
      return -1;
    if (a[key] > b[key])
      return 1;
    return 0;
  }

  sortTrainingArray(a:Promise<training_table_row>, b:Promise<training_table_row>):number
  {
    const key = "training_id";
    if (a[key] < b[key])
      return -1;
    if (a[key] > b[key])
      return 1;
    return 0;
  }

}
