import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListCategoriesComponent } from './admin-list-categories.component';

describe('AdminListCategoriesComponent', () => {
  let component: AdminListCategoriesComponent;
  let fixture: ComponentFixture<AdminListCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
