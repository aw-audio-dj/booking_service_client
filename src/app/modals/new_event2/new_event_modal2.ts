import { Component, Input, OnInit, ViewChild, EventEmitter, Output, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    // @ViewChild('modal',{static: false}) modal: NgbModal;
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
    public anlegenForm: FormGroup;
    

    // private userInputFormGroup: FormGroup;
    constructor(
      public dialogRef: MatDialogRef<NewEventModal2>,
      private fb: FormBuilder,
    ) 
    {

        // this.cancel_btn = function() {}
    }

    ngOnInit(): void {
      this.initForms();
      this.onInit.emit(this);
      
    }

    ngAfterViewInit(): void 
    {
      this.afterViewinit.emit(this);
    }


    initForms()
    {
      this.anlegenForm = this.fb.group({
        versammlungsbeginn: [{hour: 13, minute: 30, second: 0} ],
        versammlungsdatum: [new Date().toLocaleDateString() ],
      });
      const today = new Date();
      this.anlegenForm['versammlungsbeginn'] = {hour: today.getHours(), minute: today.getMinutes(), second: today.getSeconds()};
      setTimeout(() => {
        this.anlegenForm.get('versammlungsdatum').setValue(new Date().toLocaleDateString());
      }, 500);
    }

    public ok_click()
    {
        this.afterOkpressed.emit(this);
        this.dialogRef.close();   
    }

    public cancel_click(modal: NewEventModal2)
    {
        this.afterCancelpressed.emit(this);
        this.dialogRef.close();   
        // modal.dismiss('Cross click')     
    }
  


}


// -------------------------------------------------------------------------------