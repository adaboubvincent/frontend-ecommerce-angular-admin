import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FournisseurUser } from '../models/FournisseurUser';
import { FournisseurUserService } from '../services/fournisseur_user/fournisseur-user.service';

@Component({
  selector: 'app-admin-listfournisseur-user',
  templateUrl: './admin-listfournisseur-user.component.html',
  styleUrls: ['./admin-listfournisseur-user.component.css']
})
export class AdminListfournisseurUserComponent implements OnInit {

  fournisseurs: FournisseurUser[] = [];
  fournisseurss: FournisseurUser[] = [];
  checked = true;

  constructor(private fournisseurUserService: FournisseurUserService, private route: Router) { }

  ngOnInit(): void {
    this.fournisseurUserService.getAll("get-all-fournisseur-user/").subscribe((fns: FournisseurUser[]) => {
      this.fournisseurs = fns;
      this.fournisseurss = fns;
    });
  }

  showPageEdit(id: number | undefined = 0){
    this.route.navigate(['admin/fournisseur/inscris/modifier', id]);
  }

  showPageListProduit(id: number | undefined = 0){
    this.route.navigate(['admin/produit/liste/fournisseur', id]);
  }

  boutique(){
    this.checked = false;
    this.fournisseurs = this.fournisseurss.filter((item) => item.estPerson === false);
  }
  personne(){
    this.checked = false;
    this.fournisseurs = this.fournisseurss.filter((item) => item.estPerson === true);
  }

  tous(){
    this.ngOnInit();
  }

}
