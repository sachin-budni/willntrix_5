import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormField } from '../core/user';
import { StudentFormService } from '../formservice/student-form.service';

@Component({
  selector: 'app-apply-enquiry',
  templateUrl: './apply-enquiry.component.html',
  styleUrls: ['./apply-enquiry.component.scss']
})
export class ApplyEnquiryComponent implements OnInit {
  enquiryNow: FormGroup = this.fb.group({});
  requiredAlert: any = 'field is required';
  formFields: FormField[] = [
    {formName: 'name', placeHolder: 'Name'},
    {formName: 'mobileNo', placeHolder: 'Mobile Number'},
    {formName: 'subject', placeHolder: 'Subject'},
  ];
  constructor(private fb: FormBuilder, private formService: StudentFormService) { }
  ngOnInit() {
    this.enquiryNow = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      mobileNo: ['', [Validators.required, Validators.minLength(3)]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['']
    });
  }

  onSubmit(values: any) {
    if (this.enquiryNow.valid) {
      Object.assign(values, { date: new Date().getTime() });
      this.formService.enquiry(values);
      this.enquiryNow.reset();
    }
  }

}
