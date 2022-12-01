import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})



export class NaviComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
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
