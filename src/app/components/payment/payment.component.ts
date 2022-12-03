import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CarImagesService } from 'src/app/services/car-images.service';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {
  car: Car;
  carImages: CarImage[] = [];
  cardOwner:string = "";
  cardNumber:string = "";
  expiryMonthAndYear:string = "";
  cvv:string = "";
  datesDiff:number;
  total:any;
  rentDate:string;
  returnDate:string;
  carDataUpdated = false;
  carImagesUpdated = false;
  currentCarId:number;
  
  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private carImagesService:CarImagesService,
    private paymentService:PaymentService,
    private toastrService:ToastrService,
    private rentalService:RentalService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarById(params["carId"]);
        this.getCarImagesByCarId(params["carId"]);
        this.datesDiff = Number(params["datesDiff"]);
        this.currentCarId = Number(params["carId"]);
        this.rentDate = params["rentDate"];
        this.returnDate = params["returnDate"];
      }
    })
  }

  getCarById(carId:number) {
    this.carService.getCarById(carId).subscribe(response=>{
      this.car = response.data
      this.total = this.datesDiff * this.car.dailyPrice;
      this.carDataUpdated = true;
    })   
  }
  getCarImagesByCarId(carId:number) {
    this.carImagesService.getCarImagesByCarId(carId).subscribe(response => {
      this.carImagesUpdated = true;
      this.carImages = response.data;
    })
  }
  getImagePath(carImage:CarImage):string {
    let url: string ="https://localhost:44327/uploads/images/" + carImage.imagePath
    return url;
  }

  addRental(){
    let rental:Rental = Object.assign({});
    rental.customerId = 1;
    rental.carId = this.currentCarId;
    rental.rentDate = new Date(this.rentDate);
    rental.returnDate = new Date(this.returnDate);
    
    this.rentalService.addRental(rental).subscribe(response=> {
      this.toastrService.success(response.message);
    })
  }

  pay(){
    if( this.expiryMonthAndYear && this.cardNumber
      && this.cardOwner && this.cvv) {
      let payment: Payment = Object.assign({});

      let expiryies = this.expiryMonthAndYear.split("/");
      let replaceCardNumber = this.cardNumber.split(' ').join('');
      payment.customerId = 1;
      payment.fullName = this.cardOwner;
      payment.cardNumber = replaceCardNumber;
      payment.expiryMonth = Number(expiryies[0]);
      payment.expiryYear = Number(expiryies[1]);
      payment.cvv = this.cvv;

      this.paymentService.pay(payment).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.addRental();
          setTimeout(() => 
          {
              this.router.navigate(['/']);
          },
          1000);
        }, (response) => {
          this.toastrService.error(response.error.message);
        }
      ); 
    } else {
      this.toastrService.error("Lütfen boş alan bırakmayınız!");
    }
  }
}

