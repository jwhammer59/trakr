import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { FamilyID } from 'src/app/models/FamilyID';
import { FamilyIdService } from 'src/app/services/family-id.service';

import { VolunteersService } from 'src/app/services/volunteers.service';
import { Volunteer } from 'src/app/models/Volunteer';

import { MatDialog } from '@angular/material/dialog';
import { DeleteFamilyIdComponent } from '../delete-family-id/delete-family-id.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-family-id',
  templateUrl: './detail-family-id.component.html',
  styleUrls: ['./detail-family-id.component.scss'],
})
export class DetailFamilyIdComponent implements OnInit {
  headerTitle = 'Family ID Detail';
  headerColor = 'accent';
  headerIcon = 'details';

  allVolunteers$!: Observable<Volunteer[]>;
  matchingFamilyID!: Volunteer[];
  volunteerArray: string[] = [];

  id: string = '';
  familyId: FamilyID = {
    familyID: '',
    householdFirstName: '',
    householdLastName: '',
    householdEmail: '',
    householdPhone: '',
    householdIsActive: false,
  };

  constructor(
    private familyIdService: FamilyIdService,
    private volunteersService: VolunteersService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.familyIdService.getFamilyID(this.id).subscribe((familyId) => {
      this.familyId = familyId;
    });

    this.allVolunteers$ = this.volunteersService.getVolunteers();
    this.allVolunteers$.subscribe((volData) => {
      this.matchingFamilyID = volData;
      this.filterMatchingFamilyIds(this.matchingFamilyID);
    });
  }

  filterMatchingFamilyIds(data: Volunteer[]) {
    this.volunteerArray = [];
    data.map((el) => {
      if (el.familyID.includes(this.familyId.familyID)) {
        this.volunteerArray.push(el.firstName + ' ' + el.lastName);
      } else {
        return null;
      }
    });
    console.log(this.volunteerArray);
  }

  onDeleteClicked() {
    const dialogRefDeleteFamilyId = this.dialog.open(DeleteFamilyIdComponent, {
      width: '325px',
      data: {
        familyID: this.familyId.familyID,
      },
    });

    dialogRefDeleteFamilyId.afterClosed().subscribe((result) => {
      if (!result) {
        dialogRefDeleteFamilyId.close();
        return;
      } else {
        this.familyIdService.deleteFamilyID(this.familyId);
      }
      this.router.navigate(['/familyIds']);
    });
  }
}
