import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListProduitfournisseurComponent } from './admin-list-produitfournisseur.component';

describe('AdminListProduitfournisseurComponent', () => {
  let component: AdminListProduitfournisseurComponent;
  let fixture: ComponentFixture<AdminListProduitfournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListProduitfournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListProduitfournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
