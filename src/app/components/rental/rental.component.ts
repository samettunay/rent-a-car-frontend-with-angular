import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  addFormGroup: FormGroup;
  currentCarId: number;
  constructor(
    private formBuilder: FormBuilder,
    private rentalService:RentalService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createAddFormGroup();
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
      this.currentCarId = Number(params["carId"]);
    }
  })
  }

  createAddFormGroup() {
    this.addFormGroup = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: [null],
    });
  }

  rentInfoSave(){
    if (this.addFormGroup.valid) {
      let rental: Rental = Object.assign({}, this.addFormGroup.value);
      rental.carId = this.currentCarId;
      rental.customerId = 1;
      rental.returnDate = rental.returnDate ? rental.returnDate : null;
      
      this.rentalService.addRental(rental).subscribe(
        (response) => {
          this.toastrService.success(response.message);
        }, (response) => this.toastrService.error(response.error.message)
      );
    } else {
      this.toastrService.error('Kiralanacak tarihi seçiniz.');
    }
  }
}
