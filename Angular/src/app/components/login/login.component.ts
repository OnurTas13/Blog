import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/login';
import { loginRes } from 'src/app/models/loginRes';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  login:Login = new Login()
  submitted:boolean

  constructor(private fb:FormBuilder, private accountService:AccountsService, private toastr:ToastrService, private route:Router) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm = this.fb.group({
      userName:["",Validators.required],
      password:["", Validators.required]
    })
  }

  onSubmit(){
    this.submitted = true
   if (this.loginForm.valid) {
     this.mapLogin()
     this.accountService.login(this.login).subscribe(x => {
       localStorage.setItem("token", x.token)
       this.route.navigate(["admin/home/1"])
       this.onReset()
     },e =>{
       console.log(e.error)
     })
     
   }
  }

  onReset(){
    this.submitted = false
    this.loginForm.reset()
  }

  mapLogin(){
    this.login.userName = this.loginForm.value.userName
    this.login.password = this.loginForm.value.password
  }



}
