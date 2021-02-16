import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentFormService } from '../formservice/student-form.service';


export interface DialogData {
  validate: boolean;
}

@Component({
  selector: 'app-demo-class',
  templateUrl: './demo-class.component.html',
  styleUrls: ['./demo-class.component.scss']
})
export class DemoClassComponent implements OnInit {

  formGroup: FormGroup = this.formBuilder.group({});
  titleAlert = 'This field is required';
  phoneAlert = 'Please Enter Valid Contact Nnumber';
  post: any = '';

  toppingList: Observable<any> | undefined;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<DemoClassComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, private sudentForm: StudentFormService) { }

  ngOnInit() {
    this.createForm();
    this.toppingList = this.sudentForm.$course.valueChanges()
                      .pipe(map((c: any) => c.sort((a: any, b: any) => a.order - b.order)));
  }

  createForm() {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const phoneregex: RegExp = /^[6-9]\d{9}$/;
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      phone: [null, [Validators.required, Validators.pattern(phoneregex)]],
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      course: [null, Validators.required],
      dob: [null, Validators.required]
    });
  }

  getErrorEmail() {
    return this.formGroup.get('email')?.hasError('required') ? 'Field is required' :
      this.formGroup?.get('email')?.hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email')?.hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  onSubmit(post: any) {
    post.dob = post.dob.getTime();

    if (this.formGroup.valid) {
      this.sudentForm.demoClass(post);
      this.dialogRef.close();
    }
  }

  close() {
    this.dialogRef.close();
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

}
