import { Component } from '@angular/core';

@Component({
  selector: 'app-family-id',
  templateUrl: './family-id.component.html',
  styleUrls: ['./family-id.component.scss'],
})
export class FamilyIdComponent {
  headerTitle = 'Family ID';
  headerColor = 'accent';
  headerIcon = 'family_restroom';

  constructor() {}
}
