import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailProductComponent } from './admin-detail-product.component';

describe('AdminDetailProductComponent', () => {
  let component: AdminDetailProductComponent;
  let fixture: ComponentFixture<AdminDetailProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetailProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDetailProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
