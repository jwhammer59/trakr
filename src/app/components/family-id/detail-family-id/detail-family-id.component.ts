import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-family-id',
  templateUrl: './detail-family-id.component.html',
  styleUrls: ['./detail-family-id.component.scss'],
})
export class DetailFamilyIdComponent implements OnInit {
  headerTitle = 'Family ID Detail';
  headerColor = 'accent';
  headerIcon = 'details';

  constructor() {}

  ngOnInit(): void {}
}
