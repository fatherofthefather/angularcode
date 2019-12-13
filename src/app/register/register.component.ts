import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient,private toastr: ToastrService, private spinner:NgxSpinnerService,private router:Router) { }
  registerReq: any = {};
  registerRes: any = {};
  registerUrl: string = "http://192.168.0.25:10010/register";
  ngOnInit() {
  }
  showSuccess() {
    this.toastr.success(this.registerReq.id,'Registered Successfully');
  }
  showError(tempStatus) {
    this.toastr.error(tempStatus,'Error');
  }
  register() {
    console.log("this.registerReq->"+ JSON.stringify(this.registerReq));
    this.spinner.show();
    this.http.post(this.registerUrl, this.registerReq)
    .subscribe(res=>{
      this.registerRes=res;
      if(this.registerRes.status == "success"){
        setTimeout(() => {
          this.spinner.hide();
          this.showSuccess();
        }, 2000);
        this.router.navigate(['/login']);
      }
      else{
        setTimeout(() => {
          this.spinner.hide();
          this.showError(this.registerRes.status);
        }, 2000);
      }
    }, () => {
      this.toastr.error('Bad/Slow Internet Connection, Please check your internet connection', 'Error!', {
        timeOut: 10000,
        closeButton:true
      });

    });

    }
  }
