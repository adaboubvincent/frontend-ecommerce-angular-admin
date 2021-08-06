import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Image } from '../models/Image';
import { Produit } from '../models/Produit';
import { ImageService } from '../services/image/image.service';
import { ProductService } from '../services/product/product.service';
import * as $ from 'jquery';
import { Categorie } from '../models/Categorie';

@Component({
  selector: 'app-admin-detail-product',
  templateUrl: './admin-detail-product.component.html',
  styleUrls: ['./admin-detail-product.component.css']
})
export class AdminDetailProductComponent implements OnInit {
  afficheMessageAlert = false;
  message = "";
  idProduit: number = 0;
  produits: Produit[] = [];
  produit: Produit = new Produit();
  images: Image[] = [];
  imageChoice: Image = new Image();
  URL_BASE: string = this.produitService.URL_BASE;
  categorie: Categorie = new Categorie();

  constructor(private produitService: ProductService, private route: ActivatedRoute,private routee: Router, private imagesService: ImageService,) { }

  ngOnInit(): void {

    this.produitService.getAll("produits/").subscribe((prots: Produit[]) => {
      this.produits = prots;
      if(this.route.snapshot.params['id']){
        this.idProduit = this.route.snapshot.params['id'];
        this.produit = this.findObject();

        this.categorie = this.produit.categories?.find((item, index) => index === 0) || new Categorie();

        this.imagesService.imagesOfProduit(Number(this.idProduit)).subscribe((res: Image[]) => {
          this.images = res;
          this.imageChoice = this.images[0] || new Image();

        })
      }
    });
  }

  findObject(): Produit {
    return this.produits.find((item) => item.id === Number(this.idProduit) ) || new Produit()
  }

  showOnImageClick(id: number | undefined){
    let img = new Image();
    img.image = "/media/default.jpg";

    this.imageChoice = this.images.find((item) => item.id === Number(id)) || img;


  }


  deleteImage(id: number | undefined = 0){
    if(confirm("Vous êtes sûr de supprimer cette image ?")){

      this.imagesService.deletT("image/"+id+"/", this.images.find((item) => {
          return item.id === id
        })).subscribe(res =>{
            let etat = res;
            this.ngOnInit();
      });

      this.messageAlert("Une image a été supprimée!");
    }

  }

  showPageEdit(id: number | undefined = 0){
    this.routee.navigate(['admin/produit/modifier', id])
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
