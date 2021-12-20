import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { HomeComponent } from '../components/home/home.component';
import { AddVolunteerComponent } from '../components/volunteers/add-volunteer/add-volunteer.component';
import { DeleteVolunteerComponent } from '../components/volunteers/delete-volunteer/delete-volunteer.component';
import { DetailVolunteerComponent } from '../components/volunteers/detail-volunteer/detail-volunteer.component';
import { EditVolunteerComponent } from '../components/volunteers/edit-volunteer/edit-volunteer.component';
import { VolunteersComponent } from '../components/volunteers/volunteers.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'volunteer', component: VolunteersComponent },
  { path: 'add-volunteer', component: AddVolunteerComponent },
  { path: 'edit-volunteer/:id', component: EditVolunteerComponent },
  { path: 'delete-volunteer', component: DeleteVolunteerComponent },
  { path: 'detail-volunteer/:id', component: DetailVolunteerComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
