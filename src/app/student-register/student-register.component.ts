import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StudentFormService } from '../formservice/student-form.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.scss']
})
export class StudentRegisterComponent implements OnInit {

  date = new Date();
  studentData : Observable<{}> | undefined;   
  instituteFormGroup : FormGroup = this.Fbuilder.group({});
  data : any;
  requiredAlert:string = "This Field is required";
  phoneAlert:string = "Please Enter Valid Contact Number"; 
  knowBy = ["hiremaadi.com","Google","Facebook","LinkedIn"];
  wxId:string="";
  typesOfShoes: string[] = ['hiremaaDi.com', 'Google', 'Facebook', 'linked In'];
  gender : string[] = ['Male','Female'];
  work : string[] = ["Fresher","Experience"]

  constructor(private Fbuilder : FormBuilder,private commonForm:StudentFormService) { }

  ngOnInit() {
    this.createForm();
  }

createForm(){
  let phoneregex: RegExp = /^[6-9]\d{9}$/;
  let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  this.instituteFormGroup = this.Fbuilder.group({
      "Date":[new Date(),Validators.required],
      "ProjectCourse":[null,Validators.required],
      "CandidateName":[null,Validators.required],
      "Gender":[null,Validators.required],
      "ContactDetails":[null,[Validators.required,Validators.pattern(phoneregex)]],
      "WhatsappNo":[null],
      "email":[null,[Validators.required,Validators.pattern(emailregex)]],
      "joiningDate":[new Date(),Validators.required],
      "address":[null,Validators.required],
      "education":[null],
      "work":[null,Validators.required],
      "knowBy":[null,Validators.required],
      "refferedBy":[null],
      "careerObject":[null],
      "reminder":[null],
      "remOn":[null],
      "aboutClass":[null],
      "complaints":[null],
      "suggestions":[null]
    });
  }
  
  workFieldFlag:boolean = false;
  workData(event: any){
    switch (event.value) {
      case "Experience":
        this.workFieldFlag = true;
        this.instituteFormGroup.addControl('year',new FormControl('',Validators.required));
        this.instituteFormGroup.addControl('company',new FormControl(''));
        this.instituteFormGroup.addControl('designation',new FormControl('',Validators.required));
        break;
      case "Fresher":
        this.workFieldFlag = false;
        this.instituteFormGroup.removeControl('year');
        this.instituteFormGroup.removeControl('company');
        this.instituteFormGroup.removeControl('designation');         
        break;
    }
  }

  search(id: any){
    this.commonForm.getAllData(id)
  }
  onSubmit(data: any){
    this.commonForm.StudentDataPush(data);
    this.instituteFormGroup.reset();
  }

}
