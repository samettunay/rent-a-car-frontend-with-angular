import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User;
  profileForm:FormGroup;
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
  }

  createProfileForm(){
    this.profileForm = this.formBuilder.group({
      id:[Number(this.authService.getCurrentUserId)],
      firstName: ["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required]
    })
  }

  updateUser(){
    if (this.profileForm.valid) {
      let userModel = Object.assign({}, this.profileForm.value);
      console.log(userModel);
      
      this.userService.updateUser(userModel).subscribe(response=>{
        window.location.reload();
        this.toastrService.info(response.message, "Bilgiler Güncellendi.");
      }, responseError=>{
        console.log(responseError);
        
        this.toastrService.error(responseError.error, "Hata!");
      });
      
    } else {
      this.toastrService.error("Lütfen tüm alanları doldurunuz.", "Hata!");
    }
  }

  getUserById(){
    this.userService.getUserById(this.authService.getCurrentUserId)
      .subscribe(response=>{
        this.user = response.data
        this.dataLoaded = true
      });
  }

}
