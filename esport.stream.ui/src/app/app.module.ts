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
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog'
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime-ex';
import { Select2Module } from 'ng-select2-component';
import { ReactiveFormsModule } from '@angular/forms';
import { YesNoComponent } from './components/modals/yes-no/yes-no.component';
import { RecordedStreamsComponent } from './pages/recorded-streams/recorded-streams.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { faStar as farStar,
  faArrowAltCircleRight as farArrowAltCircleRight,
  faArrowAltCircleLeft as farArrowAltCircleLeft,
 } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar, 
  faArrowAltCircleRight as fasArrowAltCircleRight,
  faArrowAltCircleLeft as fasArrowAltCircleLeft,
 } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    StreamComponent,
    StreamListComponent,
    EditStreamComponent,
    YesNoComponent,
    RecordedStreamsComponent,
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
    ReactiveFormsModule,
    MatDialogModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector, library: FaIconLibrary) {
    library.addIcons(fasStar, farStar);
    library.addIcons(farArrowAltCircleRight, fasArrowAltCircleRight);
    library.addIcons(farArrowAltCircleLeft, fasArrowAltCircleLeft);


    const webComponent = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('angular-component-m', webComponent);
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
  }
}
