import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifcaitonViewComponent } from './notifcaiton-view.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../material.module';
import { DatePipe } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: NotifcaitonViewComponent    
  }
];

@NgModule({
  declarations: [NotifcaitonViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  providers: [DatePipe],
})
export class NotifcaitonViewModule { }
