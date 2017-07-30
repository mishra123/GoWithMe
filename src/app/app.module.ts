import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {ErrorFoundComponent} from './error/error.component';
import {AdminModule} from './app-routing.module';
import {routing} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ErrorFoundComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
