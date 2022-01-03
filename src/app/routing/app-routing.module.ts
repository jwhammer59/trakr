import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AddFamilyIdComponent } from '../components/family-id/add-family-id/add-family-id.component';
import { DeleteFamilyIdComponent } from '../components/family-id/delete-family-id/delete-family-id.component';
import { DetailFamilyIdComponent } from '../components/family-id/detail-family-id/detail-family-id.component';
import { EditFamilyIdComponent } from '../components/family-id/edit-family-id/edit-family-id.component';
import { FamilyIdComponent } from '../components/family-id/family-id.component';
import { HomeComponent } from '../components/common/home/home.component';
import { AddVolunteerComponent } from '../components/volunteers/add-volunteer/add-volunteer.component';
import { DeleteVolunteerComponent } from '../components/volunteers/delete-volunteer/delete-volunteer.component';
import { DetailVolunteerComponent } from '../components/volunteers/detail-volunteer/detail-volunteer.component';
import { EditVolunteerComponent } from '../components/volunteers/edit-volunteer/edit-volunteer.component';
import { VolunteersComponent } from '../components/volunteers/volunteers.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'volunteers', component: VolunteersComponent },
  { path: 'add-volunteer', component: AddVolunteerComponent },
  { path: 'edit-volunteer/:id', component: EditVolunteerComponent },
  { path: 'delete-volunteer', component: DeleteVolunteerComponent },
  { path: 'detail-volunteer/:id', component: DetailVolunteerComponent },
  { path: 'familyIds', component: FamilyIdComponent },
  { path: 'add-familyId', component: AddFamilyIdComponent },
  { path: 'edit-familyId/:id', component: EditFamilyIdComponent },
  { path: 'delete-familyId', component: DeleteFamilyIdComponent },
  { path: 'detail-familyId/:id', component: DetailFamilyIdComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
