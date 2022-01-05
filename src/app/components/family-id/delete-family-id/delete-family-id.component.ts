import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FamilyID } from 'src/app/models/FamilyID';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-family-id',
  templateUrl: './delete-family-id.component.html',
  styleUrls: ['./delete-family-id.component.scss'],
})
export class DeleteFamilyIdComponent {
  deleteFamilyId: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteFamilyIdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FamilyID,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close(this.deleteFamilyId);
  }

  onDeleteClick() {
    this.autoDismissSnackBar('Family ID Deleted!', 'Goodbye!');
    this.deleteFamilyId = true;
  }

  autoDismissSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
