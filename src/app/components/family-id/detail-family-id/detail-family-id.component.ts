import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { FamilyID } from 'src/app/models/FamilyID';
import { FamilyIdService } from 'src/app/services/family-id.service';

import { MatDialog } from '@angular/material/dialog';
import { DeleteFamilyIdComponent } from '../delete-family-id/delete-family-id.component';

@Component({
  selector: 'app-detail-family-id',
  templateUrl: './detail-family-id.component.html',
  styleUrls: ['./detail-family-id.component.scss'],
})
export class DetailFamilyIdComponent implements OnInit {
  headerTitle = 'Family ID Detail';
  headerColor = 'accent';
  headerIcon = 'details';

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
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.familyIdService.getFamilyID(this.id).subscribe((familyId) => {
      this.familyId = familyId;
    });
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
