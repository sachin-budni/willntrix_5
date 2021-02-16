import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { LoginService } from '../core/login.service';
import { CourseService } from '../formservice/course.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { DemoClassComponent } from '../demo-class/demo-class.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  change: ChangeDetectorRef | undefined;
  break: BreakpointObserver | undefined;
  URL: string | undefined;
  couserDetails: Observable<any> | undefined;
  desciption: string | undefined;
  constructor(private activatedRoute: ActivatedRoute,
              public courseService: CourseService, public dialog: MatDialog,
              private router: Router, private login: LoginService, private seo: SeoService) {
  }
  panelOpenState = false;

  private transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  ngOnInit() {
    const courseName = this.activatedRoute.snapshot.params.id;
    courseName ? this.getData(courseName) : this.Home();
  }


  demoClass() {
    this.dialog.open(DemoClassComponent, { disableClose: true, data: { validate: false } });
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  getData(id: any) {
      this.couserDetails = this.courseService.getCourses(id).pipe(
        map((course: any) => {
          if (course) {
            this.seo.generateTags({
              title: course.name,
              description: 'Willntrix was established in 2016 and running successfully since then. It is an expert training institute in Advanced Excel, VBA, SQL, Data Analytics and Data Science. We have a number of effective trainers and we provide a great deal of flexibility to learners. We have framed our syllabus to match with the real-world requirements for both the beginner level and the advanced level.',
              image: course.icon
            });
            return course;
          } else {
            this.Home();
            return;
          }
        })
      );
      this.courseService.getCourseDetails(id)
        .subscribe((data: any) => {
          if (data) {
            this.URL = data.pdf;
            this.desciption = data.description;
            this.dataSource.data = data.children;
          } else {
            this.Home();
          }
        }, err => console.log(err), () => {});
  }

  Home() {
    this.router.navigate(['/']);
  }
}

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
