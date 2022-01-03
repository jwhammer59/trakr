import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-family-id',
  templateUrl: './add-family-id.component.html',
  styleUrls: ['./add-family-id.component.scss'],
})
export class AddFamilyIdComponent implements OnInit {
  headerTitle = 'Add Volunteer';
  headerColor = 'accent';
  headerIcon = 'person_add';

  constructor() {}

  ngOnInit(): void {}
}
