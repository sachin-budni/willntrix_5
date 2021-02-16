import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs';
import { StudentFormService } from './../formservice/student-form.service';
import { Email } from '../core/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  mailtext: string | undefined;
  constructor(private auth: AuthService, private afStore: StudentFormService) { }

  trainers = ['Akash', 'Mahadev', 'Sunil'];

  data: any;
  index = 0;
  instituteUser: Observable<any> | undefined;
  studentInstituteDetails: Observable<any> | undefined;
  studentDailyEntry: Observable<any> | undefined;

  ngOnInit() {
    this.instituteUser = this.auth.getInstituteUserData;
    this.studentInstituteDetails = this.afStore.studentDetails(this.auth.user?.uid);
    this.studentDailyEntry = this.afStore.studentDailyEntry();
  }

  sendMail(body: Email) {
    this.afStore.sendMailNotification(body);
  }

  sendMailToShailu() {
    const mail: Email = {
      form: this.auth.user?.displayName + ' <noreplywxweb@gmail.com>',
      to: 'shrishailr.willntrix@gmail.com',
      subject: 'Escalate issue to the management',
      html: `
        <p>Name : ${this.auth.user?.displayName}</p>
        <p>${this.mailtext}<p>
      `
    };

    this.afStore.sendMailNotification(mail).subscribe(d => {
      this.mailtext = '';
    });
  }
}
