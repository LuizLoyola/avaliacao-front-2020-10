import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ReminderListComponent} from './reminder-list/reminder-list.component';
import {DataTablesModule} from 'angular-datatables';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ReminderListComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
