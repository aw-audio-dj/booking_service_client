import { Component, OnDestroy, OnInit } from '@angular/core';
import { booking_event, GetEventsOfTrainingService } from 'app/services/api/get-events-of-training.service';
import { GetReferrerService } from 'app/services/api/get-referrer.service';
import { GetTrainingsService, training } from 'app/services/api/get-trainings.service';
import { HelperFunctionsService } from 'app/services/helper-functions.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

// declare interface TableData {
//   headerRow: string[];
//   dataRows: string[][];
// }
declare interface TableTrainingsData {
  headerRow: string[];
  dataRows: BehaviorSubject<training_table_row[]>;
}

interface training_table_row extends training {
  referrer: string
}

declare interface TableEventsData{
  headerRow: string[],
  dataRows: BehaviorSubject<booking_event_row[]>;
}

interface booking_event_row extends booking_event {
  training_name: string
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
      headerRow: [ 'ID', 'Name', 'Beschreibung', 'Dozent', 'Preis' , 'Buchen'],
      dataRows: new BehaviorSubject(null)
    }
    // this.tableTrainings.dataRows = this.getTrainingsService.test_trainings

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
      headerRow: [ 'ID', 'Datum', 'Schulung', 'Max Teilnehmer'],
      dataRows: new BehaviorSubject(null)
    }
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
                event_row.date = this.helper.germanDateFormatWithTime(new Date(event_row.date))
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

  book_training(training_id:number)
  {
    console.log("book_training ",training_id)
  }

}
