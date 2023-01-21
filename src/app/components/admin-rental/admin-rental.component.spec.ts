import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRentalComponent } from './admin-rental.component';

describe('AdminRentalComponent', () => {
  let component: AdminRentalComponent;
  let fixture: ComponentFixture<AdminRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRentalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
