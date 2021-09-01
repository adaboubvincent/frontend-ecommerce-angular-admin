import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurUser } from '../models/FournisseurUser';
import { Produit } from '../models/Produit';
import { ProduitImage } from '../models/ProduitImage';
import { FournisseurUserService } from '../services/fournisseur_user/fournisseur-user.service';
import { ProductService } from '../services/product/product.service';
import { Image } from '../models/Image';
import { Categorie } from '../models/Categorie';
import { ImageService } from '../services/image/image.service';

@Component({
  selector: 'app-admin-list-produitfournisseur',
  templateUrl: './admin-list-produitfournisseur.component.html',
  styleUrls: ['./admin-list-produitfournisseur.component.css']
})
export class AdminListProduitfournisseurComponent implements OnInit {
  URL_BASE: string = this.productService.URL_BASE;
  idFournisseur = 0;
  fournisseur: FournisseurUser = new FournisseurUser();
  produits: ProduitImage[] = [];
  image: Image = new Image();
  constructor(private fournisseurUserService: FournisseurUserService, private route: Router, 
    private activatedRoute: ActivatedRoute, private productService: ProductService, private imagesService: ImageService) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['id']){
      this.idFournisseur = Number(this.activatedRoute.snapshot.params['id']);
      this.fournisseurUserService.get("fournisseur-user-one/", this.idFournisseur).subscribe((res: FournisseurUser) => {
        this.fournisseur = res;
      });
      this.productService.getProduitFournisseurUser(this.idFournisseur).subscribe((res: ProduitImage[]) => {
        this.produits = res;
        for(let i = 0; i < this.produits.length; i++){
          this.imagesService.imageOfProduit(Number(this.produits[i].id)).subscribe((res: Image) => {
            this.produits[i].image = res;
            this.produits[i].categorie = 	this.produits[i].categories?.find((item, index) => index === 0) ||  new Categorie();
          })
        }
      });
    }
  }

  showPageDetail(id: number | undefined = 0){
    this.route.navigate(['admin/produit/detail', id])
  }

}
