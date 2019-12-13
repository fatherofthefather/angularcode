import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  id: string;
  pwd: string;
  validateUserReq: any = {};
  validateUserRes: any = {};
  validateUserURL: string = "http://192.168.0.145:10010/user";
  loginReq: any = {};
  loginRes: any = {};
  loginURL: string = "http://192.168.0.145:10010/login";
  showID: boolean = true;
  showPassword: boolean = false;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }
  showSuccess(message) {
    this.toastr.success('success', message);
  }
  showError(tempStatus) {
    this.toastr.error(tempStatus, 'Error');
  }
  validateUserVal() {
    this.spinner.show();
    this.validateUserReq.id = this.id;
    this.http.post(this.validateUserURL, this.validateUserReq)
      .subscribe(res => {
        this.spinner.hide();
        this.validateUserRes = res;
        if (this.validateUserRes.status == "success") {
          this.showSuccess('User Exists');
          this.showID = false;
          this.showPassword = true;
        }
        else {
          this.showError(this.validateUserRes.status);
        }
      }), (err) => {
        console.log("err is" + err);
      }
  }

  login() {
    this.spinner.show();
    this.loginReq.id = this.id;
    this.loginReq.pwd = this.pwd;
    this.http.post(this.loginURL, this.loginReq)
      .subscribe(res => {
        this.loginRes = res;
        this.spinner.hide();
        if (this.loginRes.status == "success") {
          this.showID = false;
          this.showPassword = true;
          this.showSuccess('User Validated, Redirecting to Register Page');
          this.router.navigate(['/register']);
        }
        else {
          this.showError(this.loginRes.status);
        }
      }), (err) => {
        console.log("err is" + err);
      }
  }

}
