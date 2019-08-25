import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }


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
}
