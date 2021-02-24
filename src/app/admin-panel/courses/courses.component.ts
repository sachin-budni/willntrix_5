import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../service/courses.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormField } from 'src/app/core/user';

export class Course {
  key?: string;
  name?: string;
  icon?: string;
  route?: string;
  hour?: string;
  order?: any;
}
export class Sylabus {
  key?: string;
  name?: string;
  description?: string;
  pdf?: string;
  children?: any;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses?: Observable<any>;
  courseFormGroup: FormGroup = this.fb.group({});
  sylabusFormGroup: FormGroup = this.fb.group({});
  percentage?: Observable<any>;
  pdfPercentage?: Observable<any>;
  sylabus?: Observable<any>;
  sylabusData?: Observable<any>;
  jsonChildren?: string;
  courseImage?: string;
  formFields: FormField[] = [
    { formName: 'name', placeHolder: 'Course Name' },
    { formName: 'route', placeHolder: 'Course URL Name' },
    { formName: 'hour', placeHolder: 'Hours' },
    { formName: 'order', placeHolder: 'Course Order Number' },
  ];

  constructor(private courseService: CoursesService, private fb: FormBuilder,
              private http: HttpClient, private snak: MatSnackBar) { }

  ngOnInit() {
    this.courseFormGroup = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      route: ['', Validators.required],
      hour: ['', Validators.required],
      order: ['', Validators.required]
    });

    this.sylabusFormGroup = this.fb.group({
      name: ['', Validators.required],
      pdf: ['', Validators.required],
      description: ['', Validators.required],
      children: ['', Validators.required],
    });

    this.courses = this.courseService.allCourses.pipe(
      map((courses) => {
        return courses.map(c => {
          const payload: any = c.payload.val();
          return { key: c.key, ...payload };
        }).sort((a: Course, b: Course) => {
          return a.order - b.order;
        });
      })
    );

    this.sylabus = this.courseService.sylabus.pipe(
      map(syl => {
        return syl.map(s => {
          const payload: any = s.payload.val();
          return { key: s.key, ...payload };
        });
      })
    );
  }

  getSylabus(sylabus: Sylabus) {
    delete sylabus.key;
    if (!sylabus.description) {
      sylabus.description = '';
    }
    this.sylabusFormGroup?.setValue(sylabus);
    this.jsonChildren = JSON.stringify(sylabus.children, undefined, 2);
  }

  addFile(event: any) {
    const fileList: any = event.target.files;
    this.percentage = this.courseService.imagePercentage(fileList.item(0));
    this.percentage.subscribe(d => { }, err => { }, () => {
      this.courseService.imageURL(fileList.item(0).name).subscribe(s => {
        this.courseFormGroup?.controls.icon.setValue(s);
        this.courseImage = s;
      });
    });
  }

  addPDF(event: any) {
    const fileList: any = event.target.files;
    this.pdfPercentage = this.courseService.addSylabusPDF(fileList.item(0));
    this.pdfPercentage.subscribe(d => { }, err => { }, () => {
      this.courseService.getSylabusPDF(fileList.item(0).name).subscribe(s => {
        this.sylabusFormGroup?.controls.pdf.setValue(s);
      });
    });
  }

  validation(control: any, field: any) {
    return (!control.controls[field.formName].valid) && control.controls[field.formName].touched;
  }

  placeHolder(field: any) {
    return field.placeHolder;
  }
  cotrolerName(field: any) {
    return field.formName;
  }

  removeCourse(key: any) {
    if (confirm('are sure u want to remove course')) {
      this.courseService.removeCourse(key);
    }
  }

  editCard(review: Course) {
    this.courseFormGroup?.setValue({
      name: review.name,
      icon: review.icon,
      route: review.route,
      hour: review.hour,
      order: review.order
    });
    this.courseImage = review.icon;
  }

  onSubmit(course: Course) {
    this.courseService.addAndUpdate(course);
    this.courseFormGroup?.reset();
  }

  addJSON(fileEvent: any) {
    const file = fileEvent.target.files as any;
    const fileReader = new FileReader();
    const self = this;
    fileReader.onload = (event: any) => {
      self.jsonChildren = event.target.result as string;
      self.sylabusFormGroup?.controls.children.setValue(JSON.parse(self.jsonChildren));
    };
    fileReader.readAsText(file.item(0));
  }

  onSubmitSylabus(sylabus: Sylabus) {
    this.courseService.pushSylabus(sylabus);
    this.sylabusFormGroup.reset();
    this.snak.open('Sylabus is Updated Successfully', '', { duration: 2000 });
  }
}
