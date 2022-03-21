import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetBookingsService } from 'src/app/services/api/get-bookings.service';
import { booking_event, GetEventsOfTrainingService } from 'src/app/services/api/get-events-of-training.service';
import { GetReferrerService } from 'src/app/services/api/get-referrer.service';
import { training, GetTrainingsService } from 'src/app/services/api/get-trainings.service';
import { PutBookingService, putBookingCallback } from 'src/app/services/api/put-booking.service';
import { HelperFunctionsService } from 'src/app/services/helper-functions.service';
import { NotificationService } from 'src/app/services/notification.service';





// declare interface TableData {
//   headerRow: string[];
//   dataRows: string[][];
// }
export interface TableTrainingsData {
  headerRow: string[];
  dataRows: BehaviorSubject<training_table_row[]>;
}

interface training_table_row extends training {
  referrer: string
}

export interface TableEventsData{
  headerRow: string[],
  dataRows: BehaviorSubject<booking_event_row[]>;
}

interface booking_event_row extends booking_event {
  training_name: string,
  free_bookings: number
}

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent implements OnInit, OnDestroy {
  // VARS
  // public tableTrainings: TableData;
  public tableTrainings: TableTrainingsData;
  public tableEvents: TableEventsData;

  // public myTableDataObservable = new BehaviorSubject(null);
  // public myTableDataObservable : Subscription;

  constructor(
    public getTrainingsService: GetTrainingsService,
    public getEventsOfTrainingService: GetEventsOfTrainingService,
    public getReferrerService: GetReferrerService,
    public putBookingService: PutBookingService,
    public getBookingsService: GetBookingsService,
    public notificationService: NotificationService,
    public helper: HelperFunctionsService
  )
  {

  }


  ngOnInit(): void
  {
    this.getTrainingsService.call();

    this.getTrainingsService.call_as_observerable().subscribe((callback:Array<training>) => {
      console.log("> trainings(2) ",callback)
    });

    this.getEventsOfTrainingService.call(1);
    this.getEventsOfTrainingService.call_as_observerable(1).subscribe((callback:Array<booking_event>) => {
      try
      {
        console.log("> event(s)2 ",callback);
      }
      catch (error)
      {
        console.log(error)
      }


    })

    this.initTrainingTable();
    this.initEventTable();
  }

  ngOnDestroy(): void {

  }

  initTrainingTable()
  {
    this.tableTrainings = {
      headerRow: [ 'ID', 'Name', 'Beschreibung', 'Dozent', 'Preis'],
      dataRows: new BehaviorSubject(null)
    }
    // this.tableTrainings.dataRows = this.getTrainingsService.test_trainings
    this.updateTrainingTable();
  }

  updateTrainingTable()
  {
    this.getTrainingsService.call_as_observerable()
    .pipe
    (
      map((_trainings:Array<training>) => {
        _trainings
        .map(async (training_row:training_table_row)=>{
          // const referrer_ = await this.getReferrerService.call_as_promise(tr.referrer_id)
          const referrer_ = await this.getReferrerService.call_as_observerable(training_row.referrer_id).toPromise();
          // console.log("|||| ",referrer_);
          training_row.referrer = referrer_[0].surname+" "+referrer_[0].lastname;
          // await this.getReferrerService.call_as_promise(tr.referrer_id).then(d=>{console.log("||||| ",d)})
          return training_row;
        })
        // tr.referrer = "test";console.log("tr ",tr);
        return _trainings;
      })
    )
    .subscribe( (callback:training_table_row[]) =>{
      console.log("> trainings(3) ",callback);
      // this.myTableDataObservable.next(callback);
      this.tableTrainings.dataRows.next(callback);
    })
  }

  initEventTable()
  {
    this.tableEvents = {
      headerRow: [ 'ID', 'Datum', 'Schulung', 'Max Teilnehmer' , 'Freie Plätze' , 'Buchen'],
      dataRows: new BehaviorSubject(null)
    }
    this.updateEventTable();
  }

  updateEventTable()
  {
    this.tableTrainings.dataRows.subscribe((training_table_data:training_table_row[]) => {
      let newDataRows : booking_event_row[] = [];
      for (const key in training_table_data)
      {
        if (Object.prototype.hasOwnProperty.call(training_table_data, key)) {
          const row = training_table_data[key];
          // console.log("row ",row);

          this.getEventsOfTrainingService.call_as_observerable(row.training_id)
          .pipe
          (
            map( (_booking_events:Array<booking_event>) => {
              _booking_events
              .map(async (event_row:booking_event_row)=>{
                event_row.training_name = row.name;
                event_row.date = this.helper.germanDateFormatWithTime(new Date(event_row.date));
                event_row.free_bookings = event_row.maxAttendees - await (await this.getBookingsService.call_as_observerable(event_row.event_id).toPromise()).length;
                return event_row;
              })
              return _booking_events;
            })

          )
          .subscribe( (callback:booking_event_row[]) => {
            console.log("> event(3) ",callback);
            newDataRows = newDataRows.concat(callback);
            this.tableEvents.dataRows.next(newDataRows);
          })
        }
      }
    })
  }

  new_event(training_id:number)
  {
    // this.new_event_modal.open({});




  }

  book_event(event_id:number)
  {
    // console.log("book_training ",event_id);
    this.putBookingService.call_as_observerable(event_id)
    .subscribe((callback: putBookingCallback) => {
      // console.log("put_booking ",callback);
      if(callback.message.includes("insert booking successful"))
      {
        this.notificationService.showNotification('bottom','center', 'Buchung erfolgreich!',2);
      }
      else
      {
        this.notificationService.showNotification('bottom','center', 'Buchung fehlgeschlagen!',4);
      }
      this.updateEventTable();
    })
  }



}