import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../../lbd/lbd-chart/lbd-chart.component';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {

  constructor
  (

  ) 
  {
    
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    
  }

}