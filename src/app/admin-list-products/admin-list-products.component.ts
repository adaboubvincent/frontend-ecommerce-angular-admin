import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from '../models/Image';
import { Produit } from '../models/Produit';
import { ProduitImage } from '../models/ProduitImage';
import { ImageService } from '../services/image/image.service';
import { ProductService } from '../services/product/product.service';
import { Categorie } from '../models/Categorie';

@Component({
  selector: 'app-admin-list-products',
  templateUrl: './admin-list-products.component.html',
  styleUrls: ['./admin-list-products.component.css']
})
export class AdminListProductsComponent implements OnInit {

  URL_BASE: string = this.produitService.URL_BASE;
  afficheMessageAlert = false;
  message = "";

  produitChoix: Produit | undefined = new Produit();

  produits: ProduitImage[] = [];
  image: Image = new Image();

  constructor(private produitService: ProductService, private route: Router, private imagesService: ImageService) { }
  
  ngOnInit(): void {
    this.produitService.getAll("produits/").subscribe((pds: Produit[]) => {
      this.produits = pds;
      for(let i = 0; i < this.produits.length; i++){
        this.imagesService.imageOfProduit(Number(this.produits[i].id)).subscribe((res: Image) => {
          this.produits[i].image = res;
          this.produits[i].categorie = 	this.produits[i].categories?.find((item, index) => index === 0) ||  new Categorie();
        })
      }
     

    });
  }


  deleteProduit(id: number | undefined = 0){
    if(confirm("Vous êtes sûr de pouvoir supprimer ce produit ?")){
     
      this.produitService.deletT("produit/"+id+"/", this.produits.find((item) => {
          return item.id === id
        })).subscribe(res =>{
            let etat = res;
            this.ngOnInit();
      });
      
      this.messageAlert("Un produit a été supprimé!");
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
    this.route.navigate(['admin/produit/modifier', id])
  }

  showPageDetail(id: number | undefined = 0){
    this.route.navigate(['admin/produit/detail', id])
  }

  noAction(id: number){
    $('.no-action').click((event) => event.preventDefault());
    
    this.produitChoix = this.produits.find((item) => item.id === Number(id));
  }

  showImage(id: number | undefined){
    this.imagesService.imageOfProduit(Number(id)).subscribe((res: Image) => {
      this.image = res;
    })
  }

}
