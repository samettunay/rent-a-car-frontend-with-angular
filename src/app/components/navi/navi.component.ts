import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})

export class NaviComponent implements OnInit {

  userName:string;

  constructor(
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService
  ) { }
  
  ngOnInit(): void {
  }

  logout(){
    this.localStorageService.remove("token");
    window.location.reload();
    this.toastrService.info("Çıkış yapıldı");
  }

  isAuthenticated(){
    if (this.authService.isAuthenticated()) {
      this.userName = this.authService.getCurrentUserName;
    }
    return this.authService.isAuthenticated();
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
      let element = document.querySelector('.navbar') as HTMLElement;
      if (window.pageYOffset == 0) {
        element.classList.add('navbar-transparent');
        element.classList.remove('bg-danger');
      } else {
        element.classList.remove('navbar-transparent');
        element.classList.add('bg-danger');
      }
    }
}
