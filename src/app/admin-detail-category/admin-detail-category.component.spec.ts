import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailCategoryComponent } from './admin-detail-category.component';

describe('AdminDetailCategoryComponent', () => {
  let component: AdminDetailCategoryComponent;
  let fixture: ComponentFixture<AdminDetailCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetailCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDetailCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
