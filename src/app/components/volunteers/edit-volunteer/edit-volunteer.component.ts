import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Volunteer } from 'src/app/models/Volunteer';
import { VolunteersService } from 'src/app/services/volunteers.service';

import { FamilyID } from 'src/app/models/FamilyID';
import { FamilyIdService } from 'src/app/services/family-id.service';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';

import { STATES } from 'src/app/data/state-data';

@Component({
  selector: 'app-edit-volunteer',
  templateUrl: './edit-volunteer.component.html',
  styleUrls: ['./edit-volunteer.component.scss'],
})
export class EditVolunteerComponent implements OnInit {
  headerTitle = 'Edit Volunteer';
  headerColor = 'accent';
  headerIcon = 'edit';

  volunteerEditForm: FormGroup;
  volunteer: Observable<Volunteer>;
  id: string;

  allFamilyIDs$: Observable<FamilyID[]>;

  states = STATES;

  constructor(
    private volunteersService: VolunteersService,
    private familyIdService: FamilyIdService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.volunteerEditForm = this.fb.group({
      id: '',
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      familyID: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      isAdmin: [false, Validators.required],
      isAvailable: [false, Validators.required],
      isCantor: [false, Validators.required],
      isEMoHC: [false, Validators.required],
      isGifts: [false, Validators.required],
      isGiftsChild: [false, Validators.required],
      isLector: [false, Validators.required],
      isRosary: [false, Validators.required],
      isServer: [false, Validators.required],
      isTech: [false, Validators.required],
      isUsher: [false, Validators.required],
      isOther: [false, Validators.required],
      isMassCoord: [false, Validators.required],
      isSaturday: [false, Validators.required],
      isSundayEarly: [false, Validators.required],
      isSundayLate: [false, Validators.required],
      isWeekday: [false, Validators.required],
    });

    this.loadAllVolunteers();
  }

  loadAllVolunteers() {
    this.volunteer = this.volunteersService
      .getVolunteer(this.id)
      .pipe(tap((volunteer) => this.volunteerEditForm.patchValue(volunteer)));

    // Get All Family ID's
    this.allFamilyIDs$ = this.familyIdService.getFamilyIDs();
  }

  get f() {
    return this.volunteerEditForm.controls;
  }

  onSubmit({ value }: { value: Volunteer }) {
    this.volunteersService.updateVolunteer(value);
    this.openSnackBar('Volunteer Updated!', '');
    this.router.navigate(['/volunteers']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
