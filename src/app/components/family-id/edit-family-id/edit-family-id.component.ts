import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-family-id',
  templateUrl: './edit-family-id.component.html',
  styleUrls: ['./edit-family-id.component.scss'],
})
export class EditFamilyIdComponent implements OnInit {
  headerTitle = 'Edit Family ID';
  headerColor = 'accent';
  headerIcon = 'edit';

  constructor() {}

  ngOnInit(): void {}
}
