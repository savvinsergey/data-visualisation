import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SettingsFormComponent } from "./shared/components/settings-form/settings-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { TableComponent } from "./shared/components/table/table.component";
import { SortDataByIDsPipe } from "./shared/pipes/sortDataByIDs.pipe";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SettingsFormComponent,
    TableComponent,
    SortDataByIDsPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
