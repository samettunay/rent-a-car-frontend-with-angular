import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName: ["",Validators.required],
      lastName:["",Validators.required],
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  }

  register(){
    if (this.registerForm.valid) { 
      let registerModel = Object.assign({}, this.registerForm.value)
      this.authService.register(registerModel).subscribe(response=>{
        this.toastrService.info(response.message, "Kayıt başarılı");
        localStorage.setItem("token", response.data.token);
      }, responseError=>{
        this.toastrService.error(responseError.error, "Hata!");
      });
    } else {
      this.toastrService.error("Lütfen tüm alanları doldurunuz.", "Hata!");
    }

  }

}
