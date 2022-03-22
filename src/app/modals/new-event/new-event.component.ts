import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons,NgbDatepicker, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


declare interface ModalTexte {
  header: string,
  okBtn: string,
  cancelBtn: string,
}
export interface ModalData{
  training_id: number
}
export interface veranstaltungs_datum{
  year: number,
  month: number,
  day: number,
  hour?: number,
  minute?: number,
  second?: number
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
    console.log("ModalData ",this.data);

    this.onInit.emit(this);
  }

  ngAfterViewInit(): void
  {
    this.afterViewinit.emit(this);
  }


  // open(content)
  // {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  initForms()
  {
    this.anlegenForm = this.fb.group({
      // versammlungsbeginn: new FormControl ({hour: 13, minute: 30, second: 0} , [Validators.required,Validators.minLength(1)]),
      versammlungsdatum: new FormControl ({},  [Validators.required,Validators.minLength(1)]),
    });
    const today = new Date();
    // this.anlegenForm['versammlungsbeginn'] = {hour: today.getHours(), minute: today.getMinutes(), second: today.getSeconds()};
    this.anlegenForm.get('versammlungsdatum').setValue(new Date().toLocaleDateString());
    console.log("init forms ",this.anlegenForm)
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
