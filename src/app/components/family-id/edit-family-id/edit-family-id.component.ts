import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FamilyID } from 'src/app/models/FamilyID';
import { FamilyIdService } from 'src/app/services/family-id.service';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-family-id',
  templateUrl: './edit-family-id.component.html',
  styleUrls: ['./edit-family-id.component.scss'],
})
export class EditFamilyIdComponent implements OnInit {
  headerTitle = 'Edit Family ID';
  headerColor = 'accent';
  headerIcon = 'edit';

  @ViewChild(MatSnackBar, { static: false }) snackbar!: MatSnackBar;

  familyIdEditForm: FormGroup;
  familyID: Observable<FamilyID>;
  id: string;

  constructor(
    private familyIdService: FamilyIdService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.familyIdEditForm = this.fb.group({
      id: '',
      familyID: ['', Validators.required],
      householdFirstName: ['', Validators.required],
      householdLastName: ['', Validators.required],
      householdPhone: ['', Validators.required],
      householdEmail: ['', [Validators.required, Validators.email]],
      householdIsActive: [false, Validators.required],
    });
    this.loadFamilyId();
  }

  loadFamilyId() {
    console.log(this.id);
    this.familyID = this.familyIdService
      .getFamilyID(this.id)
      .pipe(tap((familyId) => this.familyIdEditForm.patchValue(familyId)));
    console.log('end of load familyid');
  }

  get f() {
    return this.familyIdEditForm.controls;
  }

  onSubmit({ value }: { value: FamilyID }) {
    this.familyIdService.updateFamilyID(value);
    this.openSnackBar('Family ID Updated', '');
    this.router.navigate(['/familyIds']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
