import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review/review.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelService } from './service/admin-panel.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../share.module';
import { CoursesComponent } from './courses/courses.component';
import { CoursesService } from './service/courses.service';
import { MaterialModule } from '../materila.module';
const routes: Routes = [
  {
    path: '', component: AdminPanelComponent
  },
  {
    path: 'review', component: ReviewComponent
  },
  {
    path: 'courses', component: CoursesComponent
  },
];

@NgModule({
  declarations: [ReviewComponent, AdminPanelComponent, CoursesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ShareModule
  ],
  providers: [AdminPanelService, CoursesService]
})
export class AdminPanelModule { }
