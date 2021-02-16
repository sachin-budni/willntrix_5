import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CourseService } from '../formservice/course.service';
import { ShareModule } from '../share/share.module';
import { MaterialModule } from '../materila.module';

const routes: Routes = [
  {path: ':id', component: CourseComponent}
];

@NgModule({
  declarations: [CourseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    ShareModule
  ],
  providers: [CourseService]
})
export class CourseModule { }
