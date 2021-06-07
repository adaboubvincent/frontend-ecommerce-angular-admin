import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddFournisseurComponent } from './admin-add-fournisseur.component';

describe('AdminAddFournisseurComponent', () => {
  let component: AdminAddFournisseurComponent;
  let fixture: ComponentFixture<AdminAddFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddFournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
