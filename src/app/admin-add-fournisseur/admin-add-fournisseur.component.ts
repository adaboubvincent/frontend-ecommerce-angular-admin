import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fournisseur } from '../models/Fournisseur';
import { FournisseurService } from '../services/fournisseur/fournisseur.service';

@Component({
  selector: 'app-admin-add-fournisseur',
  templateUrl: './admin-add-fournisseur.component.html',
  styleUrls: ['./admin-add-fournisseur.component.css']
})
export class AdminAddFournisseurComponent implements OnInit {

  afficheMessageAlert = false;
  message = "";
  modeModify: boolean = false;
  idFournisseur: number = 0;

  fournisseurs: Fournisseur[] = [];

  nom = this.fb.control('', Validators.required);
  telephone = this.fb.control(0, Validators.required);
  email = this.fb.control('',[ Validators.required, Validators.email]);
  adresse = this.fb.control('', Validators.required);
  estPerson = this.fb.control(false, Validators.required);
  fournisseur: Fournisseur = new Fournisseur();
  fournisseurEmpty: Fournisseur = new Fournisseur();

  constructor(private fournisseurService: FournisseurService, private fb: FormBuilder, private route: ActivatedRoute, private routeOther: Router) {
    
   }

  ngOnInit(): void {
    this.fournisseurService.getAll("fournisseurs/").subscribe((cats: Fournisseur[]) => {
      this.fournisseurs = cats;
      if(this.route.snapshot.params['id']){
        this.idFournisseur = this.route.snapshot.params['id'];
        this.modeModify = true;
        this.fournisseur = this.findObject();
        this.nom.setValue(this.fournisseur.nom);
        this.telephone.setValue(this.fournisseur.telephone);
        this.email.setValue(this.fournisseur.email);
        this.estPerson.setValue(this.fournisseur.estPerson);
        this.adresse.setValue(this.fournisseur.adresse);
      }
    });
    
  }

  addFournisseur(){
    this.affecterData();
    this.fournisseurService.addT("ajout-fournisseur/",this.fournisseur).subscribe(res => {
      this.fournisseurService.notificationAjouter("Le fournisseur est ajouté avec succès", "success");
      this.ngOnInit();
    },(error) => {
      this.fournisseurService.notificationAjouter(error?.error?.text, "warning")
    });
    this.messageAlert("Le fournisseur "+this.fournisseur?.nom+" est bien ajouté");
    this.fournisseur = new Fournisseur();
    this.resetData();
    
  }

  editFournisseur(id: number){
    this.affecterData();
    this.fournisseurService.modifyT("fournisseur/"+this.fournisseurs.find((item) => {
      return item.id === Number(id)
    })?.id+"/", this.fournisseur).subscribe(res => {
      let i = res;
      this.fournisseurService.notificationAjouter("Le fournisseur est modifié avec succès", "success");
      this.ngOnInit();
    },(error) => {
      this.fournisseurService.notificationAjouter(error?.error?.text, "warning")
    });

    this.fournisseur = new Fournisseur();

    this.resetData();

    this.routeOther.navigate(['admin/fournisseur/liste'])
  }

  findObject(): Fournisseur {
      return this.fournisseurs.find((item) => item.id === Number(this.idFournisseur) ) || new Fournisseur()
  }

  affecterData(){
    this.fournisseur.nom = this.nom.value;
    this.fournisseur.telephone = this.telephone.value;
    this.fournisseur.email = this.email.value;
    this.fournisseur.adresse = this.adresse.value;
    this.fournisseur.estPerson = this.estPerson.value;
  }

  resetData(){
    this.nom.setValue('');
    this.telephone.setValue(0);
    this.email.setValue('');
    this.adresse.setValue('');
    this.estPerson.setValue(false);
  }

  messageAlert(message: string){
    this.afficheMessageAlert = true;
    this.message = message;
    setTimeout(() => {
      this.afficheMessageAlert = false;
      this.message = "";
    }, 3000);
  }

}
