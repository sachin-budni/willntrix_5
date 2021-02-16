import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResetPasswordComponent } from './reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../materila.module';

const routes: Routes = [
  {path: '', component: ResetPasswordComponent}
];

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ResetPasswordModule { }
