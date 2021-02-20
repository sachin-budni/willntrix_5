import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Users } from './user';
import firebase from 'firebase'

@Injectable()
export class AuthService {
  user: firebase.User | undefined;
  oldUrl:string | undefined;
  authState:Observable<any>
  constructor(private auth : AngularFireAuth,
    private store: AngularFirestore) {
    this.authState = this.auth.authState;
  }

  userDateFromDB(user: any){
    return new Promise((resolve,reject)=>{
        this.store.doc("UserProfile/"+user.uid).valueChanges().subscribe((d: any)=>{
          if(d && d["roles"]["isAdmin"]){
            resolve(true);
          }else{
            reject(false)
          }
        })
    })
  }

  get currentUser(): Observable<firebase.User | null>{
    return this.auth.user;
  }
  
  get getInstituteUserData(){
    return this.store.doc(`UserProfile/${this.user?.uid}`).valueChanges();
  }

  get getAuthState():Observable<firebase.User | null>{
    return this.auth.authState;
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      const currentUser = this.auth.onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }
  


  canRead(user: Users): boolean {
    const allowed = ["isAdmin", 'isEditor', 'isStudent']
    return this.checkAuthorization(user, allowed)
  }

  canEdit(user: Users): boolean {
    const allowed = ['isAdmin', 'isEditor']
    return this.checkAuthorization(user, allowed)
  }

  canDelete(user: Users): boolean {
    const allowed = ['isAdmin']
    return this.checkAuthorization(user, allowed)
  }

  private checkAuthorization(user: Users, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      // if ( user.roles[role] ) {
      //   return true
      // }
    }
    return false
  }

  logout() {
    return this.auth.signOut();
  }
}
