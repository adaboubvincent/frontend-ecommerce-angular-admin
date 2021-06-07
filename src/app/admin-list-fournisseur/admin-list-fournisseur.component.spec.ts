import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListFournisseurComponent } from './admin-list-fournisseur.component';

describe('AdminListFournisseurComponent', () => {
  let component: AdminListFournisseurComponent;
  let fixture: ComponentFixture<AdminListFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListFournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
