import { NgModule } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { NgbDatepickerModule, NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { NewEventModal } from "./new-event/new-event.component";


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
      NgbModalModule
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
