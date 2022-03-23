import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../framework_components/dashboard/dashboard.component';
import { UserProfileComponent } from '../../framework_components/user-profile/user-profile.component';
import { TableListComponent } from '../../framework_components/table-list/table-list.component';
import { TypographyComponent } from '../../framework_components/typography/typography.component';
import { IconsComponent } from '../../framework_components/icons/icons.component';
import { MapsComponent } from '../../framework_components/maps/maps.component';
import { NotificationsComponent } from '../../framework_components/notifications/notifications.component';
import { NgChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UpgradeComponent } from '../../framework_components/upgrade/upgrade.component';
import { TrainingsComponent } from 'src/app/booking_manager_components/trainings/trainings.component';
import { ModalsModule } from 'src/app/modals/modals.module';
import { EventsComponent } from 'src/app/booking_manager_components/events/events.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgChartsModule,
    NgbModule,
    ModalsModule,
    ToastrModule.forRoot(),

  ],
  declarations: [
    TrainingsComponent,
    EventsComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
  ]
})

export class AdminLayoutModule {}
