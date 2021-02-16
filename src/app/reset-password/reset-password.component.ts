import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  frmSetNewPassword: FormGroup = this.fb.group({});
  erro: string | undefined;
  constructor(private auth: AngularFireAuth,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    let passwordRegex: RegExp = /((?=.*\d)(?=.*[a-zA-Z]).{8,20})/;
    this.frmSetNewPassword = this.fb.group({
      password: [null, [Validators.required, Validators.pattern(passwordRegex)]],
      confirmPassword: [null, [Validators.required, Validators.pattern(passwordRegex)]]
    });
  }

  onSubmit(value: any) {
    const code = this.route.snapshot.queryParams['oobCode'];

    if (value.password !== value.confirmPassword) {
      alert('passwords are not same');
      return;
    }
    if (!this.frmSetNewPassword.valid) {
      alert('needed numbers');
      return ;
    }
    if (!code) {
      alert('code is invalid');
      return;
    }
    this.auth
            .confirmPasswordReset(code, value.password)
            .then(() => this.router.navigate(['login']))
            .catch((err: any) => {
              console.log(err);
            });
  }

}
