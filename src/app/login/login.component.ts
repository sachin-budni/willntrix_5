import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../core/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string | undefined;
  loginFormGroup: FormGroup = this.fBuilder.group({});
  forgetEmail: string | undefined;
  forgetPassword: FormGroup = this.fBuilder.group({});
  flag: boolean = true;
  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  constructor(private fBuilder: FormBuilder, private authService: LoginService, private activeRoute: ActivatedRoute, private seo: SeoService) {
    this.seo.generateTags({
      title: 'WillntriX - Login',
      description: 'Willntrix is a learning institute Organized by well professionalized trainers having rich corporate training skills and consulting experience that helps to endure the learning skills for the student.',
      image: 'https://www.willntrix.com/assets/login.svg'
    });
  }

  ngOnInit() {
    this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || '/';
    this.loginFormGroup = this.fBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailregex)]],
      password: [null, [Validators.required]]
    });

    this.forgetPassword = this.fBuilder.group({
      forgotEmail: [null, [Validators.required, Validators.pattern(this.emailregex)]]
    });
  }

  getErrorPassword() {
    return this.loginFormGroup.get('password')?.hasError('required') ? 'Field is required' :
      this.loginFormGroup.get('password')?.hasError('pattern') ? 'Not a valid password' : '';
  }

  getErrorEmail(mail: any) {
    if (mail === 'email') {
      return this.loginFormGroup.get(mail)?.hasError('required') ? 'Field is required' :
        this.loginFormGroup.get(mail)?.hasError('pattern') ? 'Not a valid emailaddress' :'';
    } else {
      return this.forgetPassword.get(mail)?.hasError('required') ? 'Field is required' :
        this.forgetPassword.get(mail)?.hasError('pattern') ? 'Not a valid emailaddress' :'';
    }
  }

  onSubmit(data: any){
    this.authService.logIn(data).catch(err => {
      alert(err.message);
    });
  }
  GoogleLogin(){
    this.authService.googleLogin();
  }

  resetPassword(){
    this.flag = false;
  }
  forgetPasswordSubmit(email: any){
    this.authService.resetPassword(email).then(()=>{
      alert('mail has been sent');
      this.flag = true;
    }).catch(err=>{
      alert(err['message'])
    })
  }  
}
