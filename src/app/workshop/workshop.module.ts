import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WorkshopComponent } from './workshop.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../materila.module';

const routes: Routes = [
  {path: '', component: WorkshopComponent}
];

@NgModule({
  declarations: [WorkshopComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class WorkshopModule { }
