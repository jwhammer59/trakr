import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-volunteer',
  templateUrl: './edit-volunteer.component.html',
  styleUrls: ['./edit-volunteer.component.scss'],
})
export class EditVolunteerComponent implements OnInit {
  headerTitle = 'Edit Volunteer';
  headerColor = 'accent';
  headerIcon = 'edit';

  constructor() {}

  ngOnInit(): void {}
}
