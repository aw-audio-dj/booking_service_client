import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { TypographyComponent } from './framework_components/typography/typography.component';
import { MapsComponent } from './framework_components/maps/maps.component';
import { IconsComponent } from './framework_components/icons/icons.component';
import { NotificationsComponent } from './framework_components/notifications/notifications.component';
import { UserComponent } from './framework_components/user/user.component';
import { HomeComponent } from './framework_components/home/home.component';
import { UpgradeComponent } from './framework_components/upgrade/upgrade.component';
import { TablesComponent } from './framework_components/tables/tables.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, 
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
          path: '',
          // loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
          // component: TablesComponent
          loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
        }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
