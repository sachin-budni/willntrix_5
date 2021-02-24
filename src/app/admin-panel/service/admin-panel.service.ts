import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Review } from '../review/review.component';

@Injectable()
export class AdminPanelService {

  constructor(private afDB: AngularFireDatabase, private afStorage: AngularFireStorage) { }

  get reviews() {
    return this.afDB.list('reviews');
  }

  get getSkills() {
    return this.afDB.list('skills');
  }

  videoPercentage(value: File) {
    return this.afStorage.upload('review/' + value.name, value).percentageChanges();
  }
  videoURL(value: string) {
    return this.afStorage.ref('review/' + value).getDownloadURL();
  }

  sendReview(value: Review) {
    this.afDB.list('reviews').push(value);
  }

  showAndHideReview(show: boolean, id: any) {
    return this.afDB.object(`reviews/${id}`).update({ show });
  }

  removeReview(key: any) {
    return this.afDB.object(`reviews/${key}`).remove();
  }
}
