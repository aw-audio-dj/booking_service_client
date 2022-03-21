import { Routes } from '@angular/router';

import { DashboardComponent } from '../../framework_components/dashboard/dashboard.component';
import { UserProfileComponent } from '../../framework_components/user-profile/user-profile.component';
import { TableListComponent } from '../../framework_components/table-list/table-list.component';
import { TypographyComponent } from '../../framework_components/typography/typography.component';
import { IconsComponent } from '../../framework_components/icons/icons.component';
import { MapsComponent } from '../../framework_components/maps/maps.component';
import { NotificationsComponent } from '../../framework_components/notifications/notifications.component';
import { UpgradeComponent } from '../../framework_components/upgrade/upgrade.component';
import { TrainingsComponent } from 'src/app/booking_manager_components/trainings/trainings.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'trainings',      component: TrainingsComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];
