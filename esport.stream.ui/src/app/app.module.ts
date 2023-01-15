import { ApplicationRef, createComponent, DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { StreamListComponent } from './pages/stream-list/stream-list.component';
import { StreamComponent } from './pages/stream-component/stream.component';
import { AppRoutingModule } from './pages/app-routing-module/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EditStreamComponent } from './pages/edit-stream/edit-stream.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDateRangePicker, MatDatepickerModule } from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime-ex';
import { Select2Module } from 'ng-select2-component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    StreamComponent,
    StreamListComponent,
    EditStreamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    Select2Module,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
    const webComponent = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('angular-component-m', webComponent);
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
  }
}
