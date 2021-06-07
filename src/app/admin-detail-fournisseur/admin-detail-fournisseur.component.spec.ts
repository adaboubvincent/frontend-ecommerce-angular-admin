import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailFournisseurComponent } from './admin-detail-fournisseur.component';

describe('AdminDetailFournisseurComponent', () => {
  let component: AdminDetailFournisseurComponent;
  let fixture: ComponentFixture<AdminDetailFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetailFournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDetailFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
