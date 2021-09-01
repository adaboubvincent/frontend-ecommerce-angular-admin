import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurUser } from '../models/FournisseurUser';
import { FournisseurUserService } from '../services/fournisseur_user/fournisseur-user.service';

@Component({
  selector: 'app-admin-modifierfournisseur-user',
  templateUrl: './admin-modifierfournisseur-user.component.html',
  styleUrls: ['./admin-modifierfournisseur-user.component.css']
})
export class AdminModifierfournisseurUserComponent implements OnInit {

  idFournisseur = 0;
  fournisseur: FournisseurUser = new FournisseurUser();
  status = this.fb.control(false, Validators.required);

  constructor(private fournisseurUserService: FournisseurUserService, private route: Router, 
    private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['id']){
      this.idFournisseur = Number(this.activatedRoute.snapshot.params['id']);
      this.fournisseurUserService.get("fournisseur-user-one/", this.idFournisseur).subscribe((res: FournisseurUser) => {
        this.fournisseur = res;
        this.status.setValue(this.fournisseur.activer);
      });
    }
  }

  editFournisseur(){
    this.affecterData();
    this.fournisseurUserService.modifyT("fournisseur-user-one/"+this.fournisseur?.id+"/", this.fournisseur).subscribe(res => {
      let i = res;
      this.fournisseurUserService.notificationAjouter("Le fournisseur est modifié avec succès", "success");
      this.ngOnInit();
    },(error) => {
      this.fournisseurUserService.notificationAjouter(error?.error?.text, "warning")
    });

    this.fournisseur = new FournisseurUser();

    this.resetData();

    this.route.navigate(['admin/fournisseur/inscris/liste'])
  }

  affecterData(){
    this.fournisseur.activer = this.status.value;
  }

  resetData(){
    this.status.setValue(false);
  }


}
