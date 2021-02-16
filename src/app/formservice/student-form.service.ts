import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Email } from './../core/user';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentFormService {
  private StundentRegister: AngularFirestoreCollection;
  private dailyEntry: AngularFirestoreCollection;
  private placement: AngularFireList<any>;
  private democlass: AngularFireList<any>;
  private StudentData: Observable<{}> | undefined;
  public $course: AngularFireList<any>;
  
  wxId = '';

  studentDataEntry: AngularFirestoreCollection | undefined;
  constructor(private store: AngularFirestore, private auth: AuthService,
              private afBD: AngularFireDatabase,
              private snackBar: MatSnackBar, private http: HttpClient) {
    this.StundentRegister = this.store.collection('StundentRegister');
    this.dailyEntry = this.store.collection('DailyEntry');
    this.placement = this.afBD.list('placementdata');
    this.democlass = this.afBD.list('democlass');
    this.$course = this.afBD.list('courses');
  }
  getDiscount(mobileNumber: any, code: any) {
    return this.afBD.list('discount'
    // ,ref => ref
    // .orderByChild("mobileNumber")
    // .startAt('8951024495')
    // .endAt('8951024495')
    ).query.orderByChild('mobileNumber')
    .startAt('8951024495')
    // .endAt('8951024495').on('value',snap => console.log(snap.));
  }
  StudentDataPush(formData: any) {
    const id = 'WX' + formData.CandidateName.substr(0, 4).toUpperCase() + formData.ContactDetails.slice(-4);
    Object.assign(formData, { wxid: id });
    this.StundentRegister.doc(this.auth.user?.uid).
      set(formData).then((d: any) => this.snakBar(id)).catch((err: any) => console.log(err));
  }

  DailyEntry(data: any) {
    Object.assign(data, { UserId: this.auth.user?.uid, wxid: this.getWxid.toLocaleUpperCase() });
    this.dailyEntry.add(data).
      then((d: any) => this.snakBar()).catch((err: any) => console.log(err));
  }

  get getWxid() {
    return this.wxId;
  }

  setWxid(id: any) {
    this.wxId = id;
  }
  getAllData(id: string): Observable<{}> {
    this.StudentData = this.store.collection('StundentRegister', ref => ref.where('ContactDetails', '==', id)).valueChanges();
    this.wxId = id;
    return this.StudentData;
  }

  studentDetails(id: any) {
    return this.store.collection(`StundentRegister`).doc(id).valueChanges();
  }

  studentDailyEntry() {
    return this.store.collection('DailyEntry', ref => ref.where('UserId', '==', this.auth.user?.uid)).valueChanges();
  }

  placementdata(post: any) {
    Object.assign(post, { date: new Date().toString() });
    return this.placement.push(post);
  }

  snakBar(id?: any) {
    this.snackBar.open('Successfully Submitted!', id, {
      duration: 5000,
      panelClass: ['mycsssnackbartest']
    });
  }

  SnackBarError(error: any, id?: any) {
    this.snackBar.open(error, id, {
      duration: 5000,
      panelClass: ['mycsssnackbartest']
    });
  }

  demoClass(data: any) {
    Object.assign(data, { applyDate: new Date().toString() });
    return this.democlass.push(data).then(() => this.snakBar()).catch((err: any) => console.log(err));
  }

  workshop(data: any) {
    data.WorthyWeekendDate = data.WorthyWeekendDate.toString();
    Object.assign(data, { UseId: this.auth.user?.uid });
    return this.store.collection('workshop').add(data);
  }
  enquiry(value: any) {
    this.afBD.list('enquiry').push(value)
    .then((d) => this.snakBar()).catch(err => console.log(err));
  }

  contactData(data: any) {
    Object.assign(data, { date: new Date() });
    return this.store.collection('contact').add(data);
  }

  sendMailNotification(emailBody: Email) {
    return this.http.post('https://us-central1-tracker-c3f1e.cloudfunctions.net/EmailNotifacation', emailBody)
      .pipe(
        map(d => {
          this.snackBar.open('Message hass been sent', '', {
            duration: 2000
          });
          return 'done';
        })
      );
  }
}
