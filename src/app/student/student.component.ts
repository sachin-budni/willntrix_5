import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentFormService } from '../formservice/student-form.service';
import { AuthService } from './../core/auth.service';
import { Email } from '../core/user';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  studentData: Observable<{}> | undefined;
  studentFormGroup: FormGroup = this.FBuilder.group({});
  data: any;
  requiredAlert = 'This Field is required';
  phoneAlert = 'Please Enter Valid Contact Number';

  constructor(private FBuilder: FormBuilder,
    private allFormService: StudentFormService,
    private auth: AuthService) { }

  ngOnInit() {
    this.createFormControlls();
  }
  createFormControlls() {
    const phoneregex: RegExp = /^[6-9]\d{9}$/;

    this.studentFormGroup = this.FBuilder.group({
      CandidateName: [null, Validators.required],
      ContactNo: [null, [Validators.required, Validators.pattern(phoneregex)]],
      WhatsappNo: [null],
      projectCourse: [null, Validators.required],
      attendenceDate: [new Date()],
      startTime: [null, Validators.required],
      entTime: [null, Validators.required],
      trainerConsultant: [null, Validators.required],
      reminder: [null],
      remOn: [new Date()],
      aboutClass: [null, Validators.required],
      complaints: [null],
      suggestions: [null]
    });
    this.studentFormGroup.disable();
  }

  onSubmit(formData: any) {
    if (this.studentFormGroup.valid) {
      this.allFormService.DailyEntry(formData);
      if (formData.complaints) {
        this.sendMailToShailu(formData.complaints);
      }
      this.studentFormGroup.reset();
      this.studentFormGroup.controls.attendenceDate.setValue(new Date());
      this.studentFormGroup.controls.remOn.setValue(new Date());
    }
  }

  sendMailToShailu(message: any) {
    const mail: Email = {
      form: this.auth.user?.displayName + ' <noreplywxweb@gmail.com>',
      to: 'shrishailr.willntrix@gmail.com',
      subject: 'Escalate issue to the management',
      html: `
        <p>Name : ${this.auth.user?.displayName}</p>
        <p>${message}<p>
      `
    };

    this.allFormService.sendMailNotification(mail).subscribe(console.log);
  }

  Search(id: any) {
    this.allFormService.getAllData(id).subscribe((data: any) => {
      const d = data[0];
      this.allFormService.setWxid(d.wxid);
      if (d) {
        this.studentFormGroup.controls.CandidateName.setValue(d.CandidateName);
        this.studentFormGroup.controls.ContactNo.setValue(d.ContactDetails);
        this.studentFormGroup.controls.WhatsappNo.setValue(d.WhatsappNo);
        this.studentFormGroup.controls.projectCourse.setValue(d.ProjectCourse);
        this.studentFormGroup.enable();
      } else {
        this.allFormService.SnackBarError('Please Enter Valid ID');
      }
    });
  }

}
