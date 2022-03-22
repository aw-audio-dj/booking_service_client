import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  NgbActiveModal   } from '@ng-bootstrap/ng-bootstrap';


declare interface ModalTexte {
  header: string,
  okBtn: string,
  cancelBtn: string,
}
export interface ModalData{
  training_id: number
}
export interface event_date{
  year: number,
  month: number,
  day: number,
  hour?: number,
  minute?: number,
  second?: number
}
export interface event_time{
  hour: number,
  minute: number,
  second: number
}

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventModal implements OnInit ,AfterViewInit {
  // VARS
  public closeResult = '';
  public modalText : ModalTexte = {
    header: "Neuer Termin einer Schlung erstellen?",
    okBtn: "Eintragen",
    cancelBtn: "Abbrechen"
  }
  public anlegenForm: FormGroup;

  // @ViewChild('content',{static: false}) content: NgbModal;
  // Inputs
  @Input() public data: ModalData;
  // Outputs
  @Output() onInit: EventEmitter<any> = new EventEmitter();
  @Output() afterViewinit: EventEmitter<any> = new EventEmitter();
  @Output() afterOkpressed: EventEmitter<any> = new EventEmitter();
  @Output() afterCancelpressed: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
    )
  {
    this.initForms();
  }

  ngOnInit(): void
  {
    this.onInit.emit(this);
  }

  ngAfterViewInit(): void
  {
    this.afterViewinit.emit(this);
  }

  initForms()
  {
    const today = new Date();
    let event_date: event_date = {
      year: today.getFullYear(),
      month: (today.getMonth()+1),
      day: today.getDate()
    }
    let event_time: event_time = {
      hour: today.getHours(),
      minute: today.getMinutes(),
      second: today.getSeconds()
    }
    this.anlegenForm = this.fb.group({
      event_date: new FormControl (event_date,  [Validators.required,Validators.minLength(1)]),
      event_time: new FormControl (event_time,  [Validators.required,Validators.minLength(1)]),
    });
    // console.log("init forms ",this.anlegenForm)
  }

  public getEventDate():Date
  {
    let training_date = new Date();
    training_date.setFullYear(this.anlegenForm.controls.event_date.value.year)
    training_date.setMonth(this.anlegenForm.controls.event_date.value.month-1)
    training_date.setDate(this.anlegenForm.controls.event_date.value.day);
    training_date.setHours(this.anlegenForm.controls.event_time.value.hour);
    training_date.setMinutes(this.anlegenForm.controls.event_time.value.minute);
    training_date.setSeconds(this.anlegenForm.controls.event_time.value.second);
    return training_date;
  }

  public ok_click()
  {
      this.afterOkpressed.emit(this);
      // this.modalService.dismissAll();
      this.activeModal.dismiss();
  }

  public cancel_click()
  {
      this.afterCancelpressed.emit(this);
      this.activeModal.dismiss();
      // this.content.dismissAll();
      // modal.dismiss('Cross click')
  }



}
