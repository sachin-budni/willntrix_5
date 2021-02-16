import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplyEnquiryComponent } from '../apply-enquiry/apply-enquiry.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../materila.module';

@NgModule({
  declarations: [ApplyEnquiryComponent],
  exports: [ApplyEnquiryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class ShareModule { }
