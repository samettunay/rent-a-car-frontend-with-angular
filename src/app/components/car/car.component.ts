import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetailDto } from 'src/app/models/car-detail-dto';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImagesService } from 'src/app/services/car-images.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: CarDetailDto[] = [];
  carImages: CarImage[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  filterText = "";
  brandFilter: number = 0;
  colorFilter: number = 0;
  dataLoaded = false;
  
  constructor(private carService: CarService,
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private colorService:ColorService,
    private carImagesService:CarImagesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      } else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"])
      } else {
        this.getCars()
        this.getBrands()
        this.getColors()
        this.getAllCarImages();
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })   
  }

  getAllCarImages(){
    this.carImagesService.getAllCarImages().subscribe(response => {
      this.carImages = response.data;
    })
  }

  getCarImagePath(carId:number):string {
    let url: string;
    this.carImages.forEach(carImage => {
      if (carImage.carId == carId) {
        url = "https://localhost:44327/uploads/images/" + carImage.imagePath;
      } else {
        url = "https://localhost:44327/uploads/images/defaultimage.png";
      }
    });
    return url;
  }
  
  getCarsByColor(colorId:number) {
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })   
  }
  getCarsByColorAndBrand(brandId:number, colorId:number){
    this.carService.getCarsByColorAndBrand(brandId, colorId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    });
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    });
  }
}
