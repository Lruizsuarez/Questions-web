import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { environment } from './../../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$: Observable<User>;

  private provider = new firebase.auth.OAuthProvider('microsoft.com');

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.user$ = this.auth.authState.pipe(
      switchMap(user => {
        console.log('authstate service..');
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.initProvider();
  }


  private initProvider() {
    this.provider.setCustomParameters({
      tenant: environment.microsoftConfig.tenant,
      client_id: environment.microsoftConfig.client_id,
    });

    environment.microsoftConfig.userPermissions.forEach(x => {
      this.provider.addScope(x);
    });
  }



  public updateCommons(userDisplayName: string, code: string, uid: string): Promise<void> {
    const ref = this.db.doc(`users/${uid}`);
    return ref.set({
      name: userDisplayName,
      code: code,
      authenticated: true
    }, { merge: true });
  }

  async doMicrosoftAuth() {
    const credential = await this.auth.auth.signInWithPopup(this.provider);
    return this.updateData(credential.user);
  }

  private updateData(user: firebase.User): Promise<void> {
    const dbRef = this.db.doc<User>(`users/${user.uid}`);

    return dbRef.get().toPromise().then(doc => {
      if (doc.get('authenticated') === true) {
        return;
      } else {
        const data: User = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          code: '',
          authenticated: false
        };
        return dbRef.set(data);
      }
    });
  }


  public getAuthState(): Observable<User> {
    return this.user$;
  }

  public validateUserType(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.db.collection('teachers', ref => ref.where('teacherContact.email', '==', email).limit(1)).get().subscribe(value => {
        if (value.size > 0) {
          resolve('TEACHER');
        } else {
          reject('STUDENT');
        }
      });
    });
  }
}
