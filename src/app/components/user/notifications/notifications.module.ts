import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';


const routes: Routes = [
  {
    path: 'post-notification',
    loadChildren: () => import('./create-notifications/create-notifications.module').then(m => m.CreateNotificationsModule)
  },
  {
    path: 'view-notification',
    loadChildren: () => import('./notifcaiton-view/notifcaiton-view.module').then(m => m.NotifcaitonViewModule)
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class NotificationsModule { }
