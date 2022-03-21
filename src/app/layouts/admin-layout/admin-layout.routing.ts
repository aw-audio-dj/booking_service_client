import { Routes } from '@angular/router';

import { HomeComponent } from '../../framework_components/home/home.component';
import { UserComponent } from '../../framework_components/user/user.component';
import { TablesComponent } from '../../framework_components/tables/tables.component';
import { TypographyComponent } from '../../framework_components/typography/typography.component';
import { IconsComponent } from '../../framework_components/icons/icons.component';
import { MapsComponent } from '../../framework_components/maps/maps.component';
import { UpgradeComponent } from '../../framework_components/upgrade/upgrade.component';
import { TrainingsComponent } from 'app/components/trainings/trainings.component';
import { NotificationsComponent } from 'app/framework_components/notifications/notifications.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'trainings',      component: TrainingsComponent },
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
