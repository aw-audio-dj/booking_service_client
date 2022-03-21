import { Component, Input, OnInit, ViewChild, EventEmitter, Output, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
declare var $:any;

declare interface ModalTexte {
  header: string,
  okBtn: string,
  cancelBtn: string,
}


@Component({
    selector: 'new-event-modal2',
    styleUrls: ['./new_event_modal2.css'],
    templateUrl: './new_event_modal2.html'
    
  })
export class NewEventModal2 implements OnInit, AfterViewInit
{
    // @Input() header;
    // @Input() text;
    @ViewChild('modal',{static: false}) modal: NgbModal;
    // @ViewChild('cancelBtn',{static: false}) cancelBtn: ElementRef;
    // @ViewChild('okBtn',{static: false}) okBtn: ElementRef;
    // @ViewChild('iconRow',{static: false}) iconRow: ElementRef;
    // @ViewChild('icon',{static: false}) icon: ElementRef;
    // @ViewChild('spinnerRow',{static: false}) spinnerRow: ElementRef;
    @Output() onInit: EventEmitter<any> = new EventEmitter();
    @Output() afterViewinit: EventEmitter<any> = new EventEmitter();
    @Output() afterOkpressed: EventEmitter<any> = new EventEmitter();
    @Output() afterCancelpressed: EventEmitter<any> = new EventEmitter();
    

    // VARS
    public closeResult = '';
    public modalText : ModalTexte = {
      header: "Neuer Termin einer Schlung erstellen?",
      okBtn: "Ok",
      cancelBtn: "Cancel"
    }
    

    // private userInputFormGroup: FormGroup;
    constructor(
      public dialogRef: MatDialogRef<NewEventModal2>,
      public activeModal: NgbActiveModal, 
    ) 
    {

        // this.cancel_btn = function() {}
    }

    ngOnInit(): void {
      this.onInit.emit(this);
    }

    ngAfterViewInit(): void 
    {
      this.afterViewinit.emit(this);
    }



    public ok_click()
    {
        this.afterOkpressed.emit(this);   
    }

    public cancel_click(modal: NewEventModal2)
    {
        this.afterCancelpressed.emit(this);
        // this.dialogRef.close();   
        // modal.dismiss('Cross click')     
    }
  


}


// -------------------------------------------------------------------------------