import { ApplicationRef, createComponent, DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap{
  constructor(private injector: Injector) {
    const webComponent = createCustomElement(AppComponent, {injector: this.injector});
    customElements.define('angular-component-m', webComponent);
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
  }
}
