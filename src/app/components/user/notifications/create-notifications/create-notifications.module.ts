import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNotificationsComponent } from './create-notifications.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';

const routes: Routes = [
  {
    path: '',
    component: CreateNotificationsComponent    
  }
];

@NgModule({
  declarations: [CreateNotificationsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CKEditorModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    RouterModule.forChild(routes)
  ]
})
export class CreateNotificationsModule { }
