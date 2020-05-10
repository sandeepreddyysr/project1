import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNotificationsComponent } from './create-notifications.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


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
    RouterModule.forChild(routes)
  ]
})
export class CreateNotificationsModule { }
