import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../models/Fournisseur';
import { FournisseurService } from '../services/fournisseur/fournisseur.service';
import { Router } from '@angular/router';

import * as $ from 'jquery';

@Component({
  selector: 'app-admin-list-fournisseur',
  templateUrl: './admin-list-fournisseur.component.html',
  styleUrls: ['./admin-list-fournisseur.component.css']
})
export class AdminListFournisseurComponent implements OnInit {

  afficheMessageAlert = false;
  message = "";

  fournisseurChoix: Fournisseur | undefined = new Fournisseur();

  fournisseurs: Fournisseur[] = [];
  fournisseurss: Fournisseur[] = [];
  checked = true;

  constructor(private fournisseurService: FournisseurService, private route: Router) { }

  ngOnInit(): void {
    this.fournisseurService.getAll("fournisseurs/").subscribe((fns: Fournisseur[]) => {
      this.fournisseurs = fns;
      this.fournisseurss = fns;
    });
  }


  deleteFournisseur(id: number | undefined = 0){
    if(confirm("Vous êtes sûr de pouvoir supprimer ce fournisseur ?\nUne fois supprimée ce fournisseur tous ses produits séront indisponibles.")){
     
      this.fournisseurService.deletT("fournisseur/"+id+"/", this.fournisseurs.find((item) => {
          return item.id === id
        })).subscribe(res =>{
            let etat = res;
            this.ngOnInit();
      });
      
      this.messageAlert("Un fournisseur a été supprimé!");
    }
    
  }

  messageAlert(message: string){
    this.afficheMessageAlert = true;
    this.message = message;
    setTimeout(() => {
      this.afficheMessageAlert = false;
      this.message = "";
    }, 3000);
  }

  showPageEdit(id: number | undefined = 0){
    this.route.navigate(['admin/fournisseur/modifier', id])
  }

  noAction(id: number){
    $('.no-action').click((event) => event.preventDefault());
    
    this.fournisseurChoix = this.fournisseurs.find((item) => item.id === Number(id));
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
