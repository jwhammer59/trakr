import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FamilyID } from 'src/app/models/FamilyID';
import { FamilyIdService } from 'src/app/services/family-id.service';

import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-family-id',
  templateUrl: './add-family-id.component.html',
  styleUrls: ['./add-family-id.component.scss'],
})
export class AddFamilyIdComponent implements OnInit {
  headerTitle = 'Add Volunteer';
  headerColor = 'accent';
  headerIcon = 'person_add';

  @ViewChild(MatSnackBar, { static: false }) snackbar!: MatSnackBar;

  familyIdForm!: FormGroup;

  allFamilyIds$!: Observable<FamilyID[]>;
  currentFamilyID: string = '' as any;
  matchingFamilyIdArray: FamilyID[] = [];
  familyIdArray: string[] = [];

  constructor(
    private familyIdService: FamilyIdService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.familyIdForm = this.fb.group({
      familyID: ['', Validators.required],
      householdFirstName: ['', Validators.required],
      householdLastName: ['', Validators.required],
      householdPhone: ['', Validators.required],
      householdEmail: ['', [Validators.required, Validators.email]],
      householdIsActive: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    // Get All Family ID Objects
    this.allFamilyIds$ = this.familyIdService.getFamilyIDs();
    this.allFamilyIds$.subscribe((famData) => {
      this.matchingFamilyIdArray = famData;
      this.processFamilyID(this.matchingFamilyIdArray);
    });
  }

  // Create new array of only Family ID's
  processFamilyID(data: FamilyID[]) {
    this.familyIdArray = [];
    data.map((el) => {
      let familyIdMatch = 'familyID';
      familyIdMatch = el.familyID;
      this.familyIdArray.push(familyIdMatch);
    });
  }

  onSubmit({ value, valid }: { value: FamilyID; valid: boolean }) {
    this.currentFamilyID = value.familyID;

    if (!valid) {
      this.currentFamilyID = '';
      this.autoDismissSnackBar('Form Invalid!', '');
    } else if (this.familyIdArray.includes(this.currentFamilyID)) {
      const tempFamilyID = this.currentFamilyID;
      this.currentFamilyID = '';
      this.manualDismissSnackBar(
        `Family ID ${tempFamilyID} already taken!`,
        'OK'
      );
    } else {
      this.familyIdService.addFamilyID(value);
      this.currentFamilyID = '';
      this.autoDismissSnackBar('Family ID Added!', '');
      this.router.navigate(['/familyID']);
    }
  }

  manualDismissSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
    });
  }

  autoDismissSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
