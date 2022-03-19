import { Component, OnDestroy, OnInit } from '@angular/core';
import { booking_event, GetEventsOfTrainingService } from 'app/services/api/get-events-of-training.service';
import { GetReferrerService } from 'app/services/api/get-referrer.service';
import { GetTrainingsService, training } from 'app/services/api/get-trainings.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}
declare interface TableTrainingsData {
  headerRow: string[];
  // dataRows: Observable<training_table_row[]>;
  dataRows: BehaviorSubject<training_table_row[]>;
}

interface training_table_row extends training {
  referrer: string
}

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent implements OnInit, OnDestroy {
  // VARS
  public tableTrainings: TableData;
  public tableTrainings2: TableTrainingsData;

  public myTableDataObservable = new BehaviorSubject(null);
  // public myTableDataObservable : Subscription;

  constructor(
    public getTrainingsService: GetTrainingsService,
    public getEventsOfTrainingService: GetEventsOfTrainingService,
    public getReferrerService: GetReferrerService
  ) 
  { 

    // this.tableTrainings2.dataRows = new BehaviorSubject(null);
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

    this.initTable();
  }

  ngOnDestroy(): void {
    
  }

  initTable()
  {
    this.tableTrainings = {
        headerRow: [ 'ID', 'Name', 'Beschreibung', 'Dozent', 'Preis'],
        dataRows: [
            ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
            ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
            ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
            ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
            ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
            ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
        ]
    };
    this.tableTrainings2 = {
      headerRow: [ 'ID', 'Name', 'Beschreibung', 'Dozent', 'Preis'],
      // dataRows: this.myTableDataObservable.asObservable()
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
      this.myTableDataObservable.next(callback);
      this.tableTrainings2.dataRows.next(callback);
    })
  }

  

}
