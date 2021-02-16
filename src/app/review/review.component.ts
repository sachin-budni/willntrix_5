import { Component, OnInit } from '@angular/core';
import { CourseService } from '../formservice/course.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  $reviews: Observable<any> | undefined;
  constructor(private reviewService: CourseService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.$reviews = this.reviewService.getReviews.snapshotChanges().pipe(
      map(d => {
        return d.map(data => {
          const payloadReview: any = data.payload.val();
          setTimeout(() => {
            this.scrollMove();
          }, 1000);
          return { key: data.key, ...payloadReview };
        });
      })
    );
  }

  scrollMove() {
    this.activeRoute.fragment.subscribe(f => {
      console.log(f);
      console.log('hello to all');
      // if (f) {
      //   document.getElementById('-M10xSjBNSphCaQogZwt').scrollIntoView();
      // }
    });

  }
}
