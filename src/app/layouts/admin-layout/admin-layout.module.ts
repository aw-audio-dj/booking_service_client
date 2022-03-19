import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../framework_components/home/home.component';
import { UserComponent } from '../../framework_components/user/user.component';
import { TablesComponent } from '../../framework_components/tables/tables.component';
import { TypographyComponent } from '../../framework_components/typography/typography.component';
import { IconsComponent } from '../../framework_components/icons/icons.component';
import { MapsComponent } from '../../framework_components/maps/maps.component';
import { NotificationsComponent } from '../../framework_components/notifications/notifications.component';
import { UpgradeComponent } from '../../framework_components/upgrade/upgrade.component';
import { TrainingsComponent } from 'app/components/trainings/trainings.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  declarations: [
    TrainingsComponent,
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent
    
  ]
})

export class AdminLayoutModule {}
