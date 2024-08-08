import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { DataTablesModule } from 'angular-datatables';
import { AcademicInfoComponent } from './components/academic-info/academic-info.component';
import { CommonModule } from '@angular/common';
import { BillEntryComponent } from './components/bill-entry/bill-entry.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    StudentDetailsComponent,
    AcademicInfoComponent,
    BillEntryComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    CommonModule

  ],
  providers: [

    provideClientHydration(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
