import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalData, NewEventModal } from 'src/app/modals/new-event/new-event.component';
import { GetBookingsService } from 'src/app/services/api/get-bookings.service';
import { booking_event, GetEventsOfTrainingService } from 'src/app/services/api/get-events-of-training.service';
import { GetReferrerService } from 'src/app/services/api/get-referrer.service';
import { training, GetTrainingsService } from 'src/app/services/api/get-trainings.service';
import { PutBookingService, putBookingCallback } from 'src/app/services/api/put-booking.service';
import { putEventCallback, PutEventService } from 'src/app/services/api/put-event.service';
import { HelperFunctionsService } from 'src/app/services/helper-functions.service';
import { NotificationService } from 'src/app/services/notification.service';

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
  public tableTrainings: TableTrainingsData;
  public tableEvents: TableEventsData;

  constructor(
    public getTrainingsService: GetTrainingsService,
    public getEventsOfTrainingService: GetEventsOfTrainingService,
    public getReferrerService: GetReferrerService,
    public putBookingService: PutBookingService,
    public getBookingsService: GetBookingsService,
    public putEventService: PutEventService,
    public notificationService: NotificationService,
    public modalService: NgbModal,
    public helper: HelperFunctionsService
  )
  {

  }


  ngOnInit(): void
  {
    this.initTrainingTable();
    this.initEventTable();
  }

  ngOnDestroy(): void {

  }

  initTrainingTable():void
  {
    this.tableTrainings = {
      headerRow: [ 'ID', 'Name', 'Beschreibung', 'Dozent', 'Preis'],
      dataRows: new BehaviorSubject(null)
    }
    this.updateTrainingTable();
  }

  updateTrainingTable():void
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
          return training_row;
        })
        return _trainings;
      })
    )
    .subscribe( (callback:training_table_row[]) =>{;
      this.tableTrainings.dataRows.next(callback);
    })
  }

  initEventTable():void
  {
    this.tableEvents = {
      headerRow: [ 'ID', 'Datum', 'Schulung', 'Max Teilnehmer' , 'Freie Plätze' ],
      dataRows: new BehaviorSubject(null)
    }
    this.updateEventTable();
  }

  updateEventTable():void
  {
    this.tableTrainings.dataRows.subscribe((training_table_data:training_table_row[]) => {
      let newDataRows : booking_event_row[] = [];
      for (const key in training_table_data)
      {
        if (Object.prototype.hasOwnProperty.call(training_table_data, key)) {
          const row = training_table_data[key];
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
            // console.log("> event(3) ",callback);
            newDataRows = newDataRows.concat(callback);
            this.tableEvents.dataRows.next(newDataRows);
          })
        }
      }
    })
  }

  new_event(training_id:number)
  {
    const modalRef = this.modalService.open(NewEventModal);
    let modalData : ModalData = {training_id: training_id}
    modalRef.componentInstance.data = modalData;
    modalRef.componentInstance.afterOkpressed.subscribe( async (modal:NewEventModal) => {
      // console.log("ok pressed ", (modal.anlegenForm.controls) , modal.getSelectedDate())
      let putEventCallback: putEventCallback = await this.putEventService.call_as_observerable(training_id, modal.getEventDate()).toPromise();
      console.log("putEventCallback ",putEventCallback)
      if(putEventCallback.message.includes("insert event successful"))
      {
        // Sucesss
        this.notificationService.showNotification('bottom','center', 'Neuer Schulungs-Termin angelegt!',2);
      }
      else
      {
        // Error
        this.notificationService.showNotification('bottom','center', 'Aktion verlief fehlerhaft!',4);
      }
      this.updateEventTable();
    })
  }

  book_event(event_id:number):void
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
