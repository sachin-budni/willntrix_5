import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Course } from '../courses/courses.component';

@Injectable()
export class CoursesService {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  get allCourses() {
    return this.db.list('courses').snapshotChanges();
  }

  addAndUpdate(course: Course) {
    return this.db.object(`courses/${course.route}`).set(course);
  }

  removeCourse(index: any) {
    return this.db.object(`courses/${index}`).remove();
  }

  imagePercentage(value: File) {
    return this.storage.upload('courses/' + value.name, value).percentageChanges();
  }
  imageURL(value: string) {
    return this.storage.ref('courses/' + value).getDownloadURL();
  }
  addSylabusPDF(file: File) {
    return this.storage.upload(file.name, file).percentageChanges();
  }

  getSylabusPDF(value: string) {
    return this.storage.ref(value).getDownloadURL();
  }
  get sylabus() {
    return this.db.list(`sylabus`).snapshotChanges();
  }

  sylabusData(key: any) {
    return this.db.object(`sylabus/${key}`).valueChanges();
  }

  pushSylabus(sylabus: any) {
    return this.db.object(`sylabus/${sylabus.name}`).set(sylabus);
  }
}
