import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RentalComponent } from './components/rental/rental.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ToastrModule } from 'ngx-toastr';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ProfileComponent } from './components/profile/profile.component';
import { ColorDirective } from './directives/color.directive';
import { AdminComponent } from './components/admin/admin.component';
import { AdminRentalComponent } from './components/admin-rental/admin-rental.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    CarDetailComponent,
    FilterPipePipe,
    RentalComponent,
    PaymentComponent,
    CarAddComponent,
    ColorAddComponent,
    BrandAddComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ColorDirective,
    AdminComponent,
    AdminRentalComponent
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
