import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StudentFormService } from '../formservice/student-form.service';
import firebase from 'firebase';
@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss']
})
export class WorkshopComponent implements OnInit {
  constructor(private FBuilder: FormBuilder,
    private commonForm: StudentFormService,
    private auth: AngularFireAuth) { }


  gender = ['Male', 'Female'];
  work = ['Fresher', 'Experience'];
  year = ['0 - 2', '2 - 4', '4 - 6', '6 - 8', '8 - 10'];
  workshopFormGroup: FormGroup = this.FBuilder.group({});
  requiredAlert = 'This Field is required';
  phoneAlert = 'Please Enter Valid Contact Number';

  workFieldFlag = false;


  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 1  && day !== 2 && day !== 3 && day !== 4 && day !== 5;
  }

  ngOnInit() {
    const phoneregex: RegExp = /^[6-9]\d{9}$/;
    // tslint:disable-next-line: max-line-length
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.workshopFormGroup = this.FBuilder.group({
      Name: [null, Validators.required],
      Gender: [null, Validators.required],
      WorthyWeekendDate: [new Date('2020-09-16')],
      ContactNo: [null, [Validators.required, Validators.pattern(phoneregex)]],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      Location: [null, Validators.required],
      Native: [null, Validators.required],
      work: [null, Validators.required],
    });
    this.auth.user.subscribe((user: firebase.User | null) => {
      this.workshopFormGroup.get('email')?.setValue(user?.email);
    })
  }
  workData(event: any) {
    switch (event.value) {
      case 'Experience':
        this.workFieldFlag = true;
        this.workshopFormGroup.addControl('year', new FormControl('', Validators.required));
        this.workshopFormGroup.addControl('company', new FormControl(''));
        this.workshopFormGroup.addControl('designation', new FormControl('', Validators.required));
        break;
      case 'Fresher':
        this.workFieldFlag = false;
        this.workshopFormGroup.removeControl('year');
        this.workshopFormGroup.removeControl('company');
        this.workshopFormGroup.removeControl('designation');
        break;
    }
  }
  onSubmit(data: any) {
    if (data.WorthyWeekendDate) {
      this.commonForm.workshop(data).then(() => {
        this.commonForm.snakBar();
        this.workshopFormGroup.reset();
      });
    } else {
      alert('Please add Worthy Weekend Date field');
    }
  }
  getErrorEmail() {
    return this.workshopFormGroup.get('email')?.hasError('required') ? 'Field is required' :
      this.workshopFormGroup.get('email')?.hasError('pattern') ? 'Not a valid emailaddress' : '';
  }

}
