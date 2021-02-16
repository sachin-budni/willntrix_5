import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AdminService {

  task: AngularFireUploadTask | undefined;

  // Progress monitoring
  percentage: Observable<number> | undefined;

  snapshot: Observable<any> | undefined;

  // Download URL
  downloadURL: Observable<string> | undefined;


  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage,
              private http: HttpClient, private auth: AngularFireAuth) {
  }

  getBolgs() {
    return this.db.list('blogs');
  }

  blog(id: any) {
    return this.db.object(`blogs/${id}`);
  }

  addBlog(value: any): any {
    value.date = firebase.database.ServerValue.TIMESTAMP;
    return this.db.list('blogs').push(value);
  }

  get authData(): Observable<firebase.User | null> {
    return this.auth.authState;
  }

  uploadImages(files: FileList): Observable<any> {
    const file: any = files.item(0);
    return this.storage.upload('blog/' + file.name, file).percentageChanges();
  }
  getImage(value: string) {
    return this.storage.ref('blog/' + value).getDownloadURL();
  }

  getDataDB() {
    return this.db.list('blogs').valueChanges();
  }

  fetchCategoryData() {
    const categories = new Promise((resolve, reject) => {
      this.db.list('category').valueChanges().subscribe((data: any) => {
        resolve(data);
      }, (err: any) => reject(err));
    });
    return categories;
  }

  addChips(chips: any) {
    this.db.object('category/chips').set(chips);
  }

}
