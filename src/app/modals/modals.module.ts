import { NgModule } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDatepickerModule, NgbModalModule, NgbTimepicker, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NewEventModal } from "./new-event/new-event.component";
// import {Tooltip} from "ngx-bootstrap";


const customModals = [
  // NewEventModal2
  NewEventModal
]


@NgModule({
    imports: [
      // NewEventModal,
      // BrowserAnimationsModule,
      // BrowserModule,
      ReactiveFormsModule,
      NgbDatepickerModule,
      NgbModalModule,NgbTimepickerModule,FormsModule
    ],
    declarations: [
      customModals
    ],
    exports: [
      customModals,

    ],
    providers: [
      // NgbActiveModal,
      FormBuilder,
      customModals
    ],
    // entryComponents: [
    //   customModals
    // ],
    bootstrap: [customModals],
  })
  export class ModalsModule {}
