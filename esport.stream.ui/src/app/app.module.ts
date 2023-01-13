import { ApplicationRef, createComponent, DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { StreamListComponent } from './pages/stream-list/stream-list.component';
import { StreamComponent } from './pages/stream-component/stream.component';
import { AppRoutingModule } from './pages/app-routing-module/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    StreamComponent,
    StreamListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
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
