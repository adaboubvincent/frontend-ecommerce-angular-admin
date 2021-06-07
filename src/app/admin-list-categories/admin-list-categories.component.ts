import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from '../models/Categorie';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-admin-list-categories',
  templateUrl: './admin-list-categories.component.html',
  styleUrls: ['./admin-list-categories.component.css']
})
export class AdminListCategoriesComponent implements OnInit {

  afficheMessageAlert = false;
  message = "";

  categories: Categorie[] = [];

  constructor(private categoryService: CategoryService, private route: Router) { }

  ngOnInit(): void {
    this.categoryService.getAll("categories/").subscribe((cats: Categorie[]) => {
      this.categories = cats;
    });
  }

  deletecategorie(id: number | undefined = 0){
    if(confirm("Vous êtes sûr de pouvoir supprimer cette catégorie ?\nUne fois supprimée cette catégorie tous ses produits séront indisponibles.")){
     
      this.categoryService.deletT("categorie/"+id+"/", this.categories.find((item) => {
          return item.id === id
        })).subscribe(res =>{
            let etat = res;
            this.ngOnInit();
      });
      
      this.messageAlert("Une catégorie a été supprimée");
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
    this.route.navigate(['admin/categorie/modifier', id])
  }

}
