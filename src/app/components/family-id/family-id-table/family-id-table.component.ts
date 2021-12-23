import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FamilyIdTableDataSource } from './family-id-table.datasource';
import { FamilyIdService } from 'src/app/services/family-id.service';
import { FamilyID } from 'src/app/models/FamilyID';

@Component({
  selector: 'app-family-id-table',
  templateUrl: './family-id-table.component.html',
  styleUrls: ['./family-id-table.component.scss'],
})
export class FamilyIdTableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatTable, { static: false }) table!: MatTable<FamilyID>;
  dataSource!: FamilyIdTableDataSource;

  displayedColumns = [
    'familyID',
    'householdFirstName',
    'householdLastName',
    'householdEmail',
    'householdPhone',
    'button',
    'householdIsActive',
  ];

  ngOnInit() {
    this.dataSource = new FamilyIdTableDataSource(this.familyIdService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  constructor(private familyIdService: FamilyIdService) {}
}
