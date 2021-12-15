import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-volunteer',
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.scss'],
})
export class AddVolunteerComponent implements OnInit {
  headerTitle = 'Add Volunteer';
  headerColor = 'accent';
  headerIcon = 'person_add';

  constructor() {}

  ngOnInit(): void {}
}
