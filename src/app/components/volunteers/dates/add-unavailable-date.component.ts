import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Volunteer } from 'src/app/models/Volunteer';
import { VolunteersService } from 'src/app/services/volunteers.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-unavailable-date',
  templateUrl: './add-unavailable-date.component.html',
  styleUrls: ['./add-unavailable-date.component.scss'],
})
export class AddUnavailableDateComponent implements OnInit {
  addUnDateForm: FormGroup;
  unAvailableDateArray: number[] = [];
  dateToAdd: number;
  addUnAvailableDate: boolean = false;

  id: string;
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
    isCantor: false,
    isEMoHC: false,
    isGifts: false,
    isGiftsChild: false,
    isLector: false,
    isMassCoord: false,
    isOther: false,
    isRosary: false,
    isServer: false,
    isTech: false,
    isUsher: false,
    isSaturday: false,
    isSundayEarly: false,
    isSundayLate: false,
    isWeekday: false,
  };

  constructor(
    public dialogRef: MatDialogRef<AddUnavailableDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Volunteer,
    private volunteersService: VolunteersService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.data.id!;
    this.volunteersService.getVolunteer(this.id).subscribe((volunteer) => {
      this.volunteer = volunteer;
      this.getVolunteerUnAvailableDates(volunteer);
    });

    this.addUnDateForm = this.fb.group({
      id: this.id,
      dateUnAvailable: ['', Validators.required],
    });
  }

  getVolunteerUnAvailableDates(data: Volunteer) {
    this.unAvailableDateArray = data.dateUnAvailable;
  }

  onNoClick(): void {
    this.dialogRef.close(this.addUnAvailableDate);
  }

  onSubmit({ value, valid }: { value: Volunteer; valid: boolean }) {
    let newValue = value;
    this.dateToAdd = Math.floor(value.dateUnAvailable);
    console.log(this.dateToAdd);
    newValue.dateUnAvailable = this.dateToAdd;

    if (!valid) {
      this.openSnackBar('Invalid Date', 'Ex: mm/dd/yyyy');
    } else if (this.unAvailableDateArray.includes(this.dateToAdd)) {
      const tempDateToAdd = new Date(this.dateToAdd).toLocaleDateString();
      this.manualSnackBar(
        `UnAvailable Date ${tempDateToAdd} has already been added.`,
        'OK'
      );
    } else {
      this.volunteersService.updateVolUnAvailableDate(newValue);
      this.dialogRef.close(this.addUnAvailableDate);
      this.openSnackBar('Success!', 'Date Added!');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }

  manualSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
    });
  }
}
