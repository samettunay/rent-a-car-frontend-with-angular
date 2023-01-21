import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-admin-rental',
  templateUrl: './admin-rental.component.html',
  styleUrls: ['./admin-rental.component.css']
})
export class AdminRentalComponent implements OnInit {

  rentals: Rental[] = [];

  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals(){
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals = response.data
    })
  }

}
