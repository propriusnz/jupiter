import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatchService } from 'src/app/service/match.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token = ""
  baseUrl = environment.baseUrl;
  resetPasswordForm: FormGroup;
  hide = true;
  errorMessage = '';
  resetFailed = false;
  user = {
    Password: ''
  }
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private matchservice: MatchService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {

    console.log(this.router.url)
    var res = this.router.url.split('=')
    this.token = res[1]
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern('(?!^[0-9 ]*$)(?!^[a-zA-Z ]*$)^([a-zA-Z0-9 ]{8,20})$')]],
      confirmpassword: ['', [Validators.required]],
    }, {
      validator: this.matchservice.MustMatch('password', 'confirmpassword')
    });
  }

  get password() {
    return this.resetPasswordForm.get('password')
  };
  get confirmpassword() {
    return this.resetPasswordForm.get('confirmpassword')
  };

  getErrorMessage2() {
    return this.password.hasError('required') ? 'Please enter a value' :
      this.password.hasError('minlength') ? 'Please enter at least 8 characters' :
        this.password.hasError('maxlength') ? 'Please enter no more than 20 characters' :
          this.password.hasError('pattern') ? 'Please use combination of letters and characters' : ''
  }

  getErrorMessage3() {
    return this.confirmpassword.hasError('required') ? 'Please enter a value' : this.confirmpassword.hasError('notSame') ? 'Password does not match' : ''
  }
  resetpassword(newpassword) {
    return this.http.put(this.baseUrl + '/user/resetpassword', newpassword, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) })
  }
  update() {
    this.resetFailed = false;
  }
  onSubmit() {
    this.user = {
      Password: this.resetPasswordForm.value.password
    }
    this.resetpassword(this.user).subscribe(
      res => {
        console.log(res);
        this.resetFailed = false;
        this.router.navigateByUrl("home");
        alert("Password Reset Successful!")
      },
      err => {
        this.resetFailed = true
        console.log(err)
        //if (err['status'] === 401) {
        this.errorMessage = 'This link has expired.';
        //}
      }
    );
  }
}