import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
constructor(private auth:AuthService,private router:Router,private loginService:LoginService){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise<any>((resolve, reject) => {
        this.auth.getCurrentUser()
        .then(user => {
          return resolve(this.isAdmin(user));
        }, err => {
          this.router.navigate(['login']);
          return resolve(false);
        });
      });
  }
  isAdmin(user: firebase.User){
    return new Promise<any>((resolve,reject)=>{
      this.auth.userDateFromDB(user).then(d=>{
        this.loginService.prograssFlag = false;
        resolve(d);
      }).catch((err: any)=>{
        this.router.navigate(['']);
        reject(err);
      })
    })
  }
  
}
