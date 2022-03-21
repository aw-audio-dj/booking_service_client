import { Component, Input, OnInit, ViewChild, EventEmitter, Output, AfterViewInit, ElementRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
declare var $:any;

declare interface ModalTexte {
  header: string,
  okBtn: string,
  cancelBtn: string,
}


@Component({
    selector: 'new-event-modal',
    styleUrls: ['./new_event_modal.css'],
    templateUrl: './new_event_modal.html'
    
  })
export class NewEventModal implements OnInit, AfterViewInit
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
      private modalService: NgbModal
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


    open(content) 
    {
      // $("#content").modal("show");
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    
  
    private getDismissReason(reason: any): string 
    {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }

    public ok_click()
    {
        this.afterOkpressed.emit(this);   
    }

    public cancel_click(modal: NewEventModal)
    {
        this.afterCancelpressed.emit(this);
        // this.dialogRef.close();   
        // modal.dismiss('Cross click')     
    }
  


}


// -------------------------------------------------------------------------------