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
        element.classList.add('bg-dark');
        element.classList.remove('bg-warning');
      } else {
        element.classList.remove('bg-dark');
        element.classList.add('bg-warning');
      }
    }
}
