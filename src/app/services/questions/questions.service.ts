import { Question } from './../../models/models';
import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map,  take } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService implements OnInit {

  private collection: AngularFirestoreCollection<Question>;

  constructor(private db: AngularFirestore) { }


  ngOnInit(): void {
    this.collection = this.db.collection<Question>('/questions');
  }

  public getCollection(): Observable<Question[]> {
    return this.collection.snapshotChanges().pipe(
      map((doc) => {
        return doc.map(question => {

          const id = question.payload.doc.id;
          const data = question.payload.doc.data();
          return { id, ...data };
        });


      }));
  }

  public getQuestion(id: string): Observable<Question> {
    return this.collection.doc<Question>(id).snapshotChanges().pipe(
      take(1),
      map(question => {
        const id = question.payload.id;
        const data = question.payload.data();

        return { id, ...data };
      })
    );
  }

  public postQuestion(question: Question): Promise<void> {
    return this.collection.add(question).then(doc => {
      if (doc.id) {
        return;
      }
    }).catch(reason => {
      return;
    });
  }

  public updateQuestion(question: Question): Promise<void> {
    const id = question.id;
    delete question.id;
    return this.collection.doc<Question>(id).update(question);
  }

  public deleteQuestion(id: string): Promise<void> {
    return this.collection.doc(id).delete();
  }
}
