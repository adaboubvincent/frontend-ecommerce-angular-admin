import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Categorie } from '../models/Categorie';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html',
  styleUrls: ['./admin-add-category.component.css']
})
export class AdminAddCategoryComponent implements OnInit {

  afficheMessageAlert = false;
  message = "";
  modeModify: boolean = false;
  idCategorie: number = 0;

  categories: Categorie[] = [];

  nom = this.fb.control('', Validators.required);
  description = this.fb.control('', Validators.required);
  categorieMere = this.fb.control(new Categorie(), Validators.required);
  categorie: Categorie = new Categorie();
  categorieEmpty: Categorie = new Categorie();

  constructor(private categoryService: CategoryService, private fb: FormBuilder, private route: ActivatedRoute, private routeOther: Router) {
    
   }

  ngOnInit(): void {
    this.categoryService.getAll("categories/").subscribe((cats: Categorie[]) => {
      this.categories = cats;
      if(this.route.snapshot.params['id']){
        this.idCategorie = this.route.snapshot.params['id'];
        this.modeModify = true;
        this.categorie = this.findObject();
        this.nom.setValue(this.categorie.nom);
        this.description.setValue(this.categorie.description);
        this.categorieMere.setValue(this.categorie.categorieMere);
      }
    });
    
  }

  addCategorie(){
    this.affecterData();
    this.categoryService.addT("ajout-categorie/",this.categorie).subscribe(res => {
      this.categoryService.notificationAjouter("La categorie est ajoutée avec succès", "success");
      this.ngOnInit();
    },(error) => {
      this.categoryService.notificationAjouter(error?.error?.text, "warning")
    });
    this.messageAlert("La categorie "+this.categorie?.nom+" est bien ajoutée");
    this.categorie = new Categorie();
    this.resetData();
    
  }

  editCategorie(id: number){
    this.affecterData();
    this.categoryService.modifyT("categorie/"+this.categories.find((item) => {
      return item.id === Number(id)
    })?.id+"/", this.categorie).subscribe(res => {
      let i = res;
      this.categoryService.notificationAjouter("La categorie est modifiée avec succès", "success");
      this.ngOnInit();
    },(error) => {
      this.categoryService.notificationAjouter(error?.error?.text, "warning")
    });

    this.categorie = new Categorie();

    this.resetData();

    this.routeOther.navigate(['admin/categorie/liste'])
  }

  findObject(): Categorie {
      return this.categories.find((item) => item.id === Number(this.idCategorie) ) || new Categorie()
  }

  affecterData(){
    this.categorie.nom = this.nom.value;
    this.categorie.description = this.description.value;
    this.categorie.categorieMere = this.categorieMere.value;
  }

  resetData(){
    this.nom.setValue('');
    this.description.setValue('');
    this.categorieMere.setValue(new Categorie());
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
