import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiServiceService } from './api-service.service';
import { StorageService } from './storage.service';
import { DatePipe } from '@angular/common';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HeaderModule,
    FooterModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule
  ],
  providers: [ApiServiceService, StorageService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
