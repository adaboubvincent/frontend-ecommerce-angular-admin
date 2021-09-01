import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListfournisseurUserComponent } from './admin-listfournisseur-user.component';

describe('AdminListfournisseurUserComponent', () => {
  let component: AdminListfournisseurUserComponent;
  let fixture: ComponentFixture<AdminListfournisseurUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListfournisseurUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListfournisseurUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
