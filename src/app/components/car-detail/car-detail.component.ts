import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CarDetailDto } from 'src/app/models/car-detail-dto';
import { CarImage } from 'src/app/models/carImage';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { CarImagesService } from 'src/app/services/car-images.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})

export class CarDetailComponent implements OnInit {
  car: CarDetailDto;
  carImages: CarImage[] = [];
  dataLoaded = false;

  constructor(private carService: CarService,
    private activatedRoute:ActivatedRoute,
    private carImagesService:CarImagesService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarById(params["carId"])
        this.getCarImagesByCarId(params["carId"]);
      }
    })
  }

  getCarById(carId:number) {
    this.carService.getCarById(carId).subscribe(response=>{
      this.car = response.data
      this.dataLoaded = true;
    })   
  }

  getCarImagesByCarId(carId:number) {
    this.carImagesService.getCarImagesByCarId(carId).subscribe(response => {
      this.carImages = response.data;
    })
  }

  getImagePath(carImage:CarImage):string {
    let url: string ="https://localhost:44327/uploads/images/" + carImage.imagePath
    return url;
  }

  getImagesClass(carImage:CarImage){
    if (this.carImages[0] == carImage) {
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }
}
