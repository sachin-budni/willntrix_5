import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StudentFormService } from './../formservice/student-form.service';
@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  formGroup: FormGroup;
  success: any;
  constructor(private dialogRef: MatDialogRef<DiscountComponent>,
              private fb: FormBuilder, private fService: StudentFormService) {
              }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      mobileNumber: ['', Validators.required],
      dicountCode: ['', Validators.required]
    });
  }
  discount(mobileNumber: any, code : any) {
    return this.fService.getDiscount(mobileNumber, code);
  }
  onSubmit(codeObj: any): void {
    this.discount(codeObj.mobileNumber, codeObj.dicountCode)
    // .subscribe(console.log);
    this.dialogRef.close();
  }

}
