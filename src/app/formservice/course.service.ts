import { Injectable } from '@angular/core';
import { LoginService } from '../core/login.service';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class CourseService {

  constructor(private db: AngularFireDatabase) { }
  getCourseDetails(id: any) {
    return this.db.list('sylabus').valueChanges().pipe(
      map((data: any) => {
        const sylabus = data.filter((d: any) => d.name.toLowerCase() === id.toLowerCase());
        return sylabus[0];
      })
    );
  }

  getCourses(course: any) {
    return this.db.object(`courses/${course}`).valueChanges();
  }

  get courseNames() {
    return this.db.list('coursename').valueChanges();
  }

  get getReviews() {
    return this.db.list('reviews');
  }

  get getSkills() {
    return this.db.list('skills');
  }
}
