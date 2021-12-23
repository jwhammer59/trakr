import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Angular Fire Modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';

// Angular Flex Layout & Angular Material Modules
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';

// Pipes
import { PhonePipe } from './pipes/phone-pipe';

import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VolunteersComponent } from './components/volunteers/volunteers.component';
import { AddVolunteerComponent } from './components/volunteers/add-volunteer/add-volunteer.component';
import { EditVolunteerComponent } from './components/volunteers/edit-volunteer/edit-volunteer.component';
import { DeleteVolunteerComponent } from './components/volunteers/delete-volunteer/delete-volunteer.component';
import { DetailVolunteerComponent } from './components/volunteers/detail-volunteer/detail-volunteer.component';
import { VolunteerTableComponent } from './components/volunteers/vol-table/volunteer-table.component';
import { FamilyIdComponent } from './components/family-id/family-id.component';
import { AddFamilyIdComponent } from './components/family-id/add-family-id/add-family-id.component';
import { DeleteFamilyIdComponent } from './components/family-id/delete-family-id/delete-family-id.component';
import { DetailFamilyIdComponent } from './components/family-id/detail-family-id/detail-family-id.component';
import { EditFamilyIdComponent } from './components/family-id/edit-family-id/edit-family-id.component';
import { FamilyIdTableComponent } from './components/family-id/family-id-table/family-id-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    VolunteersComponent,
    AddVolunteerComponent,
    EditVolunteerComponent,
    DeleteVolunteerComponent,
    DetailVolunteerComponent,
    VolunteerTableComponent,
    PhonePipe,
    FamilyIdComponent,
    AddFamilyIdComponent,
    DeleteFamilyIdComponent,
    DetailFamilyIdComponent,
    EditFamilyIdComponent,
    FamilyIdTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
