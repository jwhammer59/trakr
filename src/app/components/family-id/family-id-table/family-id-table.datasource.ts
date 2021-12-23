import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// Bring in Volunteers
import { FamilyIdService } from 'src/app/services/family-id.service';
import { FamilyID } from 'src/app/models/FamilyID';

export class FamilyIdTableDataSource extends DataSource<FamilyID> {
  data!: FamilyID[];
  paginator!: MatPaginator;
  sort!: MatSort;

  constructor(private familyIdService: FamilyIdService) {
    super();
    this.familyIdService
      .getFamilyIDs()
      .subscribe((familyIDs) => (this.data = familyIDs));
  }

  connect(): Observable<FamilyID[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange,
    ];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  disconnect() {}

  private getPagedData(data: FamilyID[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: FamilyID[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'familyID':
          return compare(a.familyID, b.familyID, isAsc);
        case 'householdFirstName':
          return compare(a.householdFirstName, b.householdFirstName, isAsc);
        case 'householdLastName':
          return compare(a.householdLastName, b.householdLastName, isAsc);
        case 'householdEmail':
          return compare(a.householdEmail, b.householdEmail, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string, b: string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
