import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReviewComponent } from './review.component';
import { ShareModule } from '../share.module';
import { CourseService } from '../formservice/course.service';
import { MaterialModule } from '../materila.module';

const routes: Routes = [
  {path: ':id', component: ReviewComponent},
  {path: '', component: ReviewComponent}
];

@NgModule({
  declarations: [ReviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MaterialModule,
    ShareModule
  ],
  providers: [CourseService]
})
export class ReviewModule { }
