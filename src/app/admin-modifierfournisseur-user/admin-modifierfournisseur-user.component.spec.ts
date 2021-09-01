import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModifierfournisseurUserComponent } from './admin-modifierfournisseur-user.component';

describe('AdminModifierfournisseurUserComponent', () => {
  let component: AdminModifierfournisseurUserComponent;
  let fixture: ComponentFixture<AdminModifierfournisseurUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModifierfournisseurUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModifierfournisseurUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
