import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StudentFormService } from '../formservice/student-form.service';

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.scss']
})
export class PlacementComponent implements OnInit {

  formGroup: FormGroup = this.formBuilder.group({});
  titleAlert: string = 'This field is required';
  phoneAlert: string = 'Please Enter Valid Contact Nnumber';
  post: any = '';

  constructor(private formBuilder: FormBuilder,private dialogRef: MatDialogRef<PlacementComponent>,
              private studentService:StudentFormService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let phoneregex: RegExp = /^[6-9]\d{9}$/
    this.formGroup = this.formBuilder.group({
      'name': [null, [Validators.required,Validators.minLength(4)]],
      'phone' :[null, [Validators.required, Validators.pattern(phoneregex)]],
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'gender':['',Validators.required],
      'quil':[null,Validators.required],
      'work':[null,Validators.required],
    });
  }

  workFieldFlag:boolean = false;
  
  workField(event: any){
    switch (event.value) {
      case "Expirence":{
        this.workFieldFlag = true;
        this.formGroup?.addControl('year', new FormControl('', Validators.required));
        this.formGroup?.addControl('deg', new FormControl('', Validators.required));
      }
                       break;
      case "Fresher":{
        this.workFieldFlag = false;
        this.formGroup?.removeControl("year")
        this.formGroup?.removeControl("deg")
      }
                     break;
    }
  }

  getErrorEmail() {
    return this.formGroup?.get('email')?.hasError('required') ? 'Field is required' :
      this.formGroup?.get('email')?.hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup?.get('email')?.hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  onSubmit(post: any) {
      this.studentService.placementdata(post).then(()=>{
        this.studentService.snakBar();
        this.onKeyUp();
      });
  }

  close(){
    this.dialogRef.close();
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

}
