import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { Volunteer } from 'src/app/models/Volunteer';
import { VolunteersService } from 'src/app/services/volunteers.service';

import { MatDialog } from '@angular/material/dialog';
import { DeleteVolunteerComponent } from '../delete-volunteer/delete-volunteer.component';

@Component({
  selector: 'app-detail-volunteer',
  templateUrl: './detail-volunteer.component.html',
  styleUrls: ['./detail-volunteer.component.scss'],
})
export class DetailVolunteerComponent implements OnInit {
  headerTitle = 'Volunteer Details';
  headerColor = 'accent';
  headerIcon = 'details';

  id: string = '';
  volunteer: Volunteer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: 0,
    familyID: '',
    isAdmin: false,
    isAvailable: false,
  };

  constructor(
    private volunteersService: VolunteersService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.volunteersService.getVolunteer(this.id).subscribe((volunteer) => {
      this.volunteer = volunteer;
    });
  }

  onDeleteClicked() {
    const dialogRefDeleteVol = this.dialog.open(DeleteVolunteerComponent, {
      width: '325px',
      data: {
        firstName: this.volunteer.firstName,
        lastName: this.volunteer.lastName,
      },
    });

    dialogRefDeleteVol.afterClosed().subscribe((result) => {
      if (!result) {
        dialogRefDeleteVol.close();
        return;
      } else {
        this.volunteersService.deleteVolunteer(this.volunteer);
      }
      this.router.navigate(['/volunteers']);
    });
  }
}
