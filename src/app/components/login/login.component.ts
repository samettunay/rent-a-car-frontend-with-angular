import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.localStorageService.setItem("token",response.data.token);
        window.location.href = "/";
        this.toastrService.info(response.message, "Giriş başarılı");
      }, responseError=>{
        this.toastrService.error(responseError.error, "Hata!");
      });
    } else {
      this.toastrService.error("Lütfen tüm alanları doldurunuz.", "Hata!");
    }
  }

}
