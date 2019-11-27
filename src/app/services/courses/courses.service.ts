import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Topic } from 'src/app/models/models';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private db: AngularFirestore) { }


  public getCourseTopics(): Observable<Topic[]> {
     return this.db.collection<Topic>('topics').valueChanges();
  }
}
