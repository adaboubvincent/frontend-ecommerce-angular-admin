import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categorie } from '../models/Categorie';
import { Image } from '../models/Image';
import { Produit } from '../models/Produit';
import { ProduitImage } from '../models/ProduitImage';
import { Text } from '../models/Text';
import { CategoryService } from '../services/category/category.service';
import { ImageService } from '../services/image/image.service';
import { PanierService } from '../services/panier/panier.service';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  BASE_URL: string = this.produitService.URL_BASE;
  question: string = ""
  listeQuestion: string[] = [];

  produits: ProduitImage[] = [];
  produitsListSearch: ProduitImage[] = [];

  constructor(private panierService: PanierService, private route: ActivatedRoute, private produitService: ProductService
    ,         private imagesService: ImageService, private categorieService: CategoryService) {

     }

  ngOnInit(): void {
    this.search();
    console.log(this.produitsListSearch);


  }
  search(){
    if(this.route.snapshot.params['q']){
      this.question = this.route.snapshot.params['q'];
      if(this.question.includes("---")){
        this.question = this.question.replace("---", "");
        this.categorieService.searhProduitByCategory(this.question).subscribe((pds: Produit[]) => {
          this.produitsListSearch = pds;
          this.question += " (Catégorie)";
          for(let i = 0; i < this.produitsListSearch.length; i++){
            if(this.produitsListSearch[i].quantite > 0 ){
              this.imagesService.imageOfProduit(Number(this.produitsListSearch[i].id)).subscribe((res: Image) => {
                this.produitsListSearch[i].image = res;
                this.produitsListSearch[i].categorie = 	this.produitsListSearch[i].categories?.find((item, index) => index === 0) ||  new Categorie();
              });
            }

          }
        });
      }else{
        this.produitService.searhProduit(this.question).subscribe((pds: Produit[]) => {
          this.produitsListSearch = pds;
          for(let i = 0; i < this.produitsListSearch.length; i++){
            if(this.produitsListSearch[i].quantite > 0 ){
              this.imagesService.imageOfProduit(Number(this.produitsListSearch[i].id)).subscribe((res: Image) => {
                this.produitsListSearch[i].image = res;
                this.produitsListSearch[i].categorie = 	this.produitsListSearch[i].categories?.find((item, index) => index === 0) ||  new Categorie();
              });
            }

          }
        });
      }
    }

  }


  addProductToCart(id: number | undefined){
    this.panierService.ajouterAuPanier(localStorage.getItem('token'), id, 1).subscribe((res: Text) => {
      if(res.text === "produit ajoute avec succes!"){
        this.produitService.notificationAjouter(res.text || "", "success");
      }else{
        this.produitService.notificationAjouter(res.text || "", "warning");
      }

      this.panierService.emitPanierProduitACommander();

    },
    (error) => this.produitService.notificationAjouter("Veuillez vous connecter!" || "", "warning"));
  }


}
