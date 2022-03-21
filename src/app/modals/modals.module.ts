import { CdkTableModule } from "@angular/cdk/table";
import { NgModule } from "@angular/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRippleModule, MatCommonModule, MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { NewEventModal2 } from "./new_event/new_event_modal2";

const ngMaterialModules = [
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatProgressBarModule,
  MatSliderModule,
  MatCommonModule,
  MatDividerModule,
  MatAutocompleteModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatSelectModule,
  MatRadioModule,
  MatGridListModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
  MatTreeModule,
  MatSlideToggleModule,
  MatSortModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatBottomSheetModule,
  MatBadgeModule,
  MatPaginatorModule,
  CdkTableModule
];

const customModals = [
  NewEventModal2

]


@NgModule({
    imports: [
      // NewEventModal,
      // BrowserAnimationsModule,
      // BrowserModule,      
      ngMaterialModules
    ],
    declarations: [
      customModals
    ],
    exports: [
      customModals,
      ngMaterialModules
    ],
    providers: [
      // NgbActiveModal,
      customModals
    ],
    // entryComponents: [
    //   customModals
    // ],    
    bootstrap: [customModals],
  })
  export class ModalsModule {}