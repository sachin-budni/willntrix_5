import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRegisterComponent } from './student-register.component';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../materila.module';

const routes: Routes = [
  {path: '', component: StudentRegisterComponent}
];

@NgModule({
  declarations: [StudentRegisterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class StudentRegisterModule { }
