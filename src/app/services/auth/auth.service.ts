import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private provider = new firebase.auth.OAuthProvider('microsoft.com');

  constructor(private auth: AngularFireAuth) {
    this.initProvider();
   }


  private initProvider(){
    this.provider.setCustomParameters({
      tenant: environment.microsoftConfig.tenant,
      client_id: environment.microsoftConfig.client_id,
    });

    environment.microsoftConfig.userPermissions.forEach(x => {
      this.provider.addScope(x);
    });
  }

  public login(email: string, password: string): Promise<boolean> {
    return this.auth.auth.signInWithEmailAndPassword(email, password).then(userCredential => {
      const val = (userCredential.user.uid != null ? true : false);
      return val;
    }).catch(error => {
      console.log('authService.login : error : ', error);
      return false;
    });
  }

  public registry(email: string, password: string, userDisplayName: string): Promise<boolean> {

    return this.auth.auth.createUserWithEmailAndPassword(email, password).then(userCredential => {
      const val = (userCredential.user.uid != null ? true : false);
      return val == true ? this.updateDisplayName(userDisplayName) : false;
    }).catch(error => {
      console.log('authService.registry : error : ', error);
      return false;
    });

  }


  public updateDisplayName(userDisplayName: string): Promise<boolean> {
    let user = this.auth.auth.currentUser;

    return user.updateProfile({
      displayName: userDisplayName
    }).then((value) => {
      return true;
    }).catch((reason) => {
      console.log('authService.updateDisplayName : error :', reason);
      return false;
    });
  }

  public doMicrosoftAuth() {
    this.auth.auth.signInWithPopup(this.provider)
      .then((res) => {
          alert(JSON.stringify(res));
      }).catch((err) => {
          alert(JSON.stringify(err));
      });
  }
}
