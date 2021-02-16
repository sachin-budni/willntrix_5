import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentFormService } from '../formservice/student-form.service';
import { SeoService } from '../core/seo.service';
import { FormField } from '../core/user';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {

  contactFormGroup: FormGroup = this.fBuilder.group({});
  formFields: FormField[] = [
    { formName: 'name', placeHolder: 'Name' },
    { formName: 'contact', placeHolder: 'Contact' },
    { formName: 'email', placeHolder: 'Email' }
  ];
  constructor(private fBuilder: FormBuilder, private studentFormService: StudentFormService, private seo: SeoService) {
    this.seo.generateTags({
      title: 'Willntrix - ContactUs',
      // tslint:disable-next-line: max-line-length
      description: 'Email us with any questions related to career guidance or call us at 9164808121 we would be happy to answer you questions and setup a meeting with you',
      image: 'https://www.willntrix.com/assets/contact_social.svg'
    });
  }

  ngOnInit() {
    const phoneregex: RegExp = /^[6-9]\d{9}$/;
    // tslint:disable-next-line: max-line-length
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.contactFormGroup = this.fBuilder.group({
      name: [null, Validators.required],
      contact: [null, [Validators.required, Validators.pattern(phoneregex)]],
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      message: [null, Validators.required]
    });
  }
  Save(data: any) {
    this.studentFormService.contactData(data).then(() => {
      this.contactFormGroup.reset();
      this.studentFormService.snakBar();
    }).catch(err => console.log(err));
  }

}
