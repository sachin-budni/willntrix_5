import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Users } from './user';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  oldUrl: string | undefined;
  errmessage: any;
  prograssFlag = false;
  private afFirebaseData: AngularFirestoreCollection<any>;
  constructor(private auth: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore) {
    this.afFirebaseData = this.afDB.collection('UserProfile');
  }

  logIn(data: any) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password).then(() => {
      this.router.navigate([this.oldUrl ? this.oldUrl : '/']);
    });
  }

  oAuthLogin(provider: any) {
    return this.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user, undefined);
        this.router.navigate([this.oldUrl ? this.oldUrl : '/']);
      });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  logOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  signWithEmailAndPassword(data1: any) {
    // tslint:disable-next-line: no-shadowed-variable
    this.auth.createUserWithEmailAndPassword(data1.email, data1.password).then((auth: any) => {
      this.updateAuthProfile(auth, data1);
    }).catch((err: any) => {
      this.errmessage = err.message;
    });
  }

  updateAuthProfile(auth1: firebase.auth.UserCredential, data1: any) {
    // const Pimage = this.auth.user.;
    // const user: firebase.User = {

    // }
    // return this.auth.updateCurrentUser({
      // displayName: data1.firstName + ' ' + data1.lastName,
      // photoURL: Pimage ? Pimage : 'assets/profile.png',
    // }).then(() => {
      this.updateUserData(auth1.user, data1);
      this.router.navigate(['/']);
    // });
  }

  updateUserData(user: firebase.User | null, d: any) {
    const userRef: AngularFirestoreDocument<any> = this.afFirebaseData.doc(user?.uid);
    const data: Users = {
      userId: user?.uid,
      userName: user?.displayName,
      userEmail: user?.email,
      userPhoneNo: user?.phoneNumber ? user?.phoneNumber : d ? d.mobileNo : null,
      userProfile: user?.photoURL,
      createDate: user?.metadata.creationTime,
      lastSeen: user?.metadata.lastSignInTime,
      roles: {
        isStudent: true
      }
    };
    userRef.set(data, { merge: true }).catch(err => console.log(err));
  }

  resetPassword(email: any) {
    return this.auth.sendPasswordResetEmail(email.forgotEmail);
  }
}
