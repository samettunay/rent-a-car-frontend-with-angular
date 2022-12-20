import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User;
  profileForm:FormGroup;
  passwordForm:FormGroup;
  dataLoaded = false;

  constructor(
    private userService:UserService,
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserById();
    this.createProfileForm();
    this.createPasswordForm();
  }

  createProfileForm(){
    this.profileForm = this.formBuilder.group({
      id:[Number(this.authService.getCurrentUserId)],
      firstName: ["",Validators.required],
      lastName:["",Validators.required]
    })
  }

  createPasswordForm(){
    this.passwordForm = this.formBuilder.group({
      userId:[Number(this.authService.getCurrentUserId)],
      oldPassword: ["",Validators.required],
      newPassword:["",Validators.required],
      repeatNewPassword:["",Validators.required]
    })
  }

  getUserById(){
    this.userService.getUserById(this.authService.getCurrentUserId)
      .subscribe(response=>{
        this.user = response.data
        this.dataLoaded = true
      });
  }

  updateUserNames(){
    if (this.profileForm.valid) {
      let userModel = Object.assign({}, this.profileForm.value);
      this.userService.updateUserNames(userModel).subscribe(response=>{
        this.toastrService.info(response.message, "Bilgiler Güncellendi.");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }, responseError=>{
        console.log(responseError);
        
        this.toastrService.error(responseError.error, "Hata!");
      });
      
    } else {
      this.toastrService.error("Lütfen tüm alanları doldurunuz.", "Hata!");
    }
  }

  updatePassword(){
    if (this.passwordForm.valid) {
      let passwordModel = Object.assign({}, this.passwordForm.value);
      console.log(passwordModel);
      this.authService.updatePassword(passwordModel).subscribe(response=>{
        this.toastrService.info(response.message, "Şifre Güncellendi");
      }, responseError=>{
        this.toastrService.error(responseError.error, "Hata!");
      });
    } else {
      this.toastrService.error("Lütfen tüm alanları doldurunuz.", "Hata!");
    }
  }

}
