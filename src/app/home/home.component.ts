import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ReferComponent } from '../refer/refer.component';
import { DemoClassComponent } from '../demo-class/demo-class.component';
import { PlacementComponent } from '../placement/placement.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../core/login.service';
import { NguCarouselConfig } from '@ngu/carousel';
import { HttpClient } from '@angular/common/http';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeoService } from '../core/seo.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Users, Sylabus, Review, Course } from './../core/user';

class Models {
  Company?: any;
  // tslint:disable-next-line: variable-name
  Mode_Training?: any;
  AlertMessage?: any;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('scroll', [
      state('on', style({ right: '-400px' })),
      transition('* => *', [
        style({ right: '-400px' }),
        animate(30000, style({ right: '100%' }))
      ])
    ])
  ]
})

export class HomeComponent implements OnInit, AfterViewInit {
  imgList: any;
  modeTrain: any;
  state = 0;
  imageCount = 0;
  AllCourseImages: Observable<any> | undefined;
  reviewData: any;
  instances = [];
  alertMessage = ' ';
  @ViewChild('scroller') scroller: ElementRef | undefined;

  // tslint:disable-next-line: member-ordering
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    interval: { timing: 4000, initialDelay: 1000 },
    loop: true,
    touch: true,
    velocity: 0.2
  };

  data: any;

  constructor(public dialog: MatDialog, private login: LoginService,
              private db: AngularFireDatabase, private cdr: ChangeDetectorRef,
              public http: HttpClient, private seo: SeoService, private route: ActivatedRoute) {
    this.login.prograssFlag = true;
    this.courses();
    this.reviews();
    this.seoTitles();
    this.institute();
  }

  seoTitles() {
    this.seo.generateTags({
      title: 'WillntriX - Skills Training & Consulting',
      image: 'https://www.willntrix.com/assets/Logo_v6.png',
      // tslint:disable-next-line: max-line-length
      description: 'WillntriX is a learning institute organized by well professionalized trainers having rich corporate training skill consulting experience that helps to endure the learning skills for the students.'
    });
  }

  get faqs() {
    return this.seo.fAQContent;
  }

  institute() {
    this.db.list('Institutes').valueChanges().subscribe((data: any) => {
      this.imgList = data[0].Company;
      this.modeTrain = data[0].Mode_Training;
      this.alertMessage = data[0].AlertMessage;
      this.cdr.detectChanges();
      this.login.prograssFlag = false;
      // this.openRefer();
    }, (err: any) => console.error(err));
  }

  courses() {
    this.AllCourseImages = this.db.list('courses').valueChanges().pipe(
      map((course: any) => {
        return course.sort((a: any, b: any) => {
          return a.order - b.order;
        });
      }));
    // this.AllCourseImages = this.http.get('https://sample-e35af.web.app/courses')
    // .pipe(map((c: any) => c.sort((a: any, b: any) => a.order - b.order)));
  }

  reviews() {
    this.db.list('reviews').valueChanges()
    .pipe(map((review: any) => review.filter((d: any) => d.show)))
    .subscribe(d => {
      this.reviewData = d;
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    // this.init();
    this.route.fragment.subscribe(f => {
      // const element = document.querySelector('#' + f);
      // if (element) { element.scrollIntoView(); }
    });
  }

  imageData() {
    this.imageCount++;
  }
  scrollDone() {
    this.state++;
  }

  openRefer() {
    this.dialog.open(ReferComponent, {
      disableClose: true,
      maxWidth: '100vw',
      panelClass: 'my-class'
    });
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  // init() {
  //   this.createElm(undefined);
  //   this.ticker(undefined);
  // }
  // createElm(self) {
  //   let selfs;
  //   if (self) {
  //     selfs = self;
  //   } else {
  //     selfs = this;
  //   }
  //   let elm = document.createElement('div');
  //   elm.dataset.x = this.data != undefined ? this.data.dataset.x : window.innerWidth / 2;
  //   elm.dataset.y = this.data != undefined ? this.data.dataset.y : window.innerHeight / 2;
  //   elm.dataset.dx = (Math.random() * 3).toString();
  //   elm.dataset.dy = (Math.random() * 3).toString();
  //   let dimensions = Math.floor(100 * Math.random());
  //   elm.style.width = dimensions + 'px';
  //   elm.style.height = dimensions + 'px';
  //   elm.style.borderRadius = '50%';
  //   let r = Math.floor(Math.random() * 255);
  //   let g = Math.floor(Math.random() * 255);
  //   let b = Math.floor(Math.random() * 255);
  //   elm.style.background = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + Math.random() + ')';
  //   elm.className = 'ball';
  //   elm.addEventListener('click', () => selfs.createElm(selfs));
  //   const main = document.getElementById('main');
  //   main.appendChild(elm);
  //   selfs.instances.push(document.getElementsByClassName('ball')[selfs.instances.length]);
  // }

  // ticker(instant) {
  //   if (instant) {
  //     this.instances = instant;
  //   }
  //   for (let i = 0; i < this.instances.length; i++) {

  //     const instance = this.instances[i];
  //     let dx = parseFloat(instance.dataset.dx);
  //     let dy = parseFloat(instance.dataset.dy);
  //     let x = parseFloat(instance.dataset.x) + dx;
  //     let y = parseFloat(instance.dataset.y) + dy;

  //     if (x <= 0 || x + instance.offsetWidth >= window.innerWidth) {
  //       dx = -dx;
  //     }
  //     if (y <= 0 || y + instance.offsetHeight >= window.innerHeight) {
  //       dy = -dy;
  //     }

  //     x += dx;
  //     y += dy;

  //     instance.style.WebkitTransform = instance.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  //     instance.dataset.dx = dx;
  //     instance.dataset.dy = dy;
  //     instance.dataset.x = x;
  //     instance.dataset.y = y;
  //   }
  //   window.requestAnimationFrame(() => this.ticker(this.instances));
  // }

}
