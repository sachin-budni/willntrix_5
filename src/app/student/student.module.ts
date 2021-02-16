import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../materila.module';

const routes: Routes = [
  {path: '', component: StudentComponent}
];

@NgModule({
  declarations: [StudentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
