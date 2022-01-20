import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import firestore from 'firebase/compat/app';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Volunteer } from '../models/Volunteer';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class VolunteersService {
  volunteerCollection!: AngularFirestoreCollection<Volunteer>;
  volunteerDoc!: AngularFirestoreDocument<Volunteer>;
  volunteers!: Observable<Volunteer[]>;
  volunteer!: Observable<any>;

  dbPath: string = 'volunteers';

  constructor(
    private afs: AngularFirestore,
    private loadingService: LoadingService
  ) {
    this.volunteerCollection = afs.collection<Volunteer>(`${this.dbPath}`);
  }

  getVolunteers() {
    this.volunteers = this.volunteerCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Volunteer;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.volunteers;
  }

  getVolunteer(id: string): Observable<Volunteer> {
    this.volunteerDoc = this.afs.doc<Volunteer>(`${this.dbPath}/${id}`);
    this.volunteer = this.volunteerDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Volunteer;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.volunteer;
  }

  addVolunteer(volunteer: Volunteer) {
    this.volunteerCollection.add(volunteer);
  }

  updateVolunteer(volunteer: Volunteer) {
    this.volunteerDoc = this.afs.doc(`${this.dbPath}/${volunteer.id}`);
    this.volunteerDoc.update(volunteer);
  }

  deleteVolunteer(volunteer: Volunteer) {
    this.volunteerDoc = this.afs.doc(`${this.dbPath}/${volunteer.id}`);
    this.volunteerDoc.delete();
  }

  updateVolUnAvailableDate(volunteer: Volunteer) {
    this.volunteerDoc = this.afs.doc(`${this.dbPath}/${volunteer.id}`);
    this.volunteerDoc.update({
      dateUnAvailable: firestore.firestore.FieldValue.arrayUnion(
        volunteer.dateUnAvailable
      ),
    });
  }

  deleteVolUnAvailableDate(date: string, vol: string) {
    this.volunteerDoc = this.afs.doc(`${this.dbPath}/${vol}`);
    this.volunteerDoc.update({
      dateUnAvailable: firestore.firestore.FieldValue.arrayRemove(date),
    });
  }
}
