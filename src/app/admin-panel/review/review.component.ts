import { Component, OnInit } from '@angular/core';
import { AdminPanelService } from './../service/admin-panel.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FormField } from 'src/app/core/user';

export class Review {
  image: string | undefined;
  name: string | undefined;
  videoLink: string | undefined;
  desc: string | undefined;
  designation: string | undefined;
  company: string | undefined;
  show: boolean | undefined;
  skills: [] | undefined;
}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  reviews: Observable<any> | undefined;
  reviewFormGroup: FormGroup = this.fb.group({});
  percentage: Observable<any> | undefined;
  $skills: Observable<any> | undefined;
  formFileds: FormField[] = [
    { formName: 'name', placeHolder: 'Name' },
    { formName: 'designation', placeHolder: 'Designation' },
    { formName: 'company', placeHolder: 'Comapny Name' },
    { formName: 'videoLink', placeHolder: 'Video URL' },
    { formName: 'desc', placeHolder: 'Review Description' },
  ];
  constructor(private adminService: AdminPanelService, private fb: FormBuilder) { }

  ngOnInit() {
    this.$skills = this.adminService.getSkills.valueChanges();
    this.reviews = this.adminService.reviews.snapshotChanges().pipe(
      map(d => {
        return d.map(data => {
          const payload: Review = data.payload.val() as Review;
          return { key: data.key, ...payload };
        });
      })
    );
    this.reviewFormGroup = this.fb.group({
      image: [''],
      name: ['', Validators.required],
      designation: [''],
      company: [''],
      videoLink: [''],
      skills: [''],
      desc: ['', Validators.required]
    });
  }
  onSubmit(values: Review) {
    this.adminService.sendReview(values);
    this.reviewFormGroup.reset();
  }

  validation(controller: any, field: any) {
    return (!controller.controls[field?.formName].valid) && controller.controls[field?.formName].touched
  }

  formControl(field: any) {
    return field?.formName;
  }
  
  placeHolder(field: any) {
    return field?.placeHolder;
  }

  addFile(event: any) {
    const fileList: any = event.target['files'];
    this.percentage = this.adminService.videoPercentage(fileList.item(0));
    this.percentage.subscribe(d => { }, err => { }, () => {
      this.adminService.videoURL(fileList.item(0).name).subscribe(s => {
        this.reviewFormGroup.controls['image'].setValue(s);
      });
    });
  }
  deleteReview(review: any) {
    this.adminService.removeReview(review.key);
  }
  updateReview(event: MatSlideToggleChange, review: any) {
    this.adminService.showAndHideReview(event.checked, review);
  }

  editCard(review: Review) {
    this.reviewFormGroup.setValue({
      image: review.image ? review.image : null,
      name: review.name ? review.name : null,
      videoLink: review.videoLink ? review.videoLink : null,
      designation: review.designation ? review.designation : null,
      company: review.company ? review.company : null,
      desc: review.desc ? review.desc : null,
      skills: review.skills?.length !== 0 ? review.skills : []
    });
  }
}
