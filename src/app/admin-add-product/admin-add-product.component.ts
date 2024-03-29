import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/Produit';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product/product.service';
import { Categorie } from '../models/Categorie';
import { Fournisseur } from '../models/Fournisseur';
import { FournisseurService } from '../services/fournisseur/fournisseur.service';
import { CategoryService } from '../services/category/category.service';
import { ImageService } from '../services/image/image.service';
import { Image } from '../models/Image';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {

  lengthFiles:number = 0;

  afficheMessageAlert = false;
  message = "";
  modeModify: boolean = false;
  idProduit: number = 0;

  categ: Categorie = new Categorie();

  produits: Produit[] = [];
  fournisseurs: Fournisseur[] = [];
  categoriesListe: Categorie[] = [];
  categorieEmpty: Categorie = new Categorie();
  fournisseurEmpty: Fournisseur = new Fournisseur();

  
  nom = this.fb.control('', Validators.required);
  prix = this.fb.control(0, Validators.required);
  diminu_price = this.fb.control(0, Validators.required);
  caracteristique = this.fb.control('', Validators.required);
  quantite = this.fb.control(1, [Validators.required]);
  categories = this.fb.control([], Validators.required);
  categorie = this.fb.control(new Categorie, Validators.required);
  fournisseur = this.fb.control(new Fournisseur, Validators.required);
  produit: Produit = new Produit();
  produitEmpty: Produit = new Produit();


  //image
  response: any;
  imageURL: string = "";
  images = this.fb.control("", Validators.required);

  constructor(private produitService: ProductService, private categoryService: CategoryService, 
    private fournisseurService: FournisseurService, private fb: FormBuilder, private route: ActivatedRoute, 
    private routeOther: Router, private imageService: ImageService) { }

  ngOnInit(): void {
    this.produitService.getAll("produits/").subscribe((prots: Produit[]) => {
      this.produits = prots;
      if(this.route.snapshot.params['id']){
        this.idProduit = this.route.snapshot.params['id'];
        this.modeModify = true;
        this.produit = this.findObject();
        this.nom.setValue(this.produit.nom);
        this.prix.setValue(this.produit.prix);
        this.diminu_price.setValue(this.produit.diminu_price);
        this.quantite.setValue(this.produit.quantite);
        this.caracteristique.setValue(this.produit.caracteristique);
        this.categories.setValue(this.produit.categories);
        this.fournisseur.setValue(this.produit.fournisseur);
        
        if(this.produit.categories?.length === 1){
          this.categ = this.produit.categories[0]
        }
      }
    });

    this.fournisseurService.getAll("fournisseurs/").subscribe((fns: Fournisseur[]) => {
      this.fournisseurs = fns;
    });

    this.categoryService.getAll("categories/").subscribe((cats: Categorie[]) => {
      this.categoriesListe = cats;
    });
  }

  addProduit(){
    this.affecterData();
    this.produitService.addT("ajout-produit/",this.produit).subscribe(res => {
      this.produit = res;

     if(this.lengthFiles !== 0 ){
       for(let i = 0; i < this.lengthFiles; i++){
        this.onSubmit(this.produit.id, this.images.value[i]);
       }
     }
     
      this.produitService.notificationAjouter("Le produit est ajouté avec succès", "success");
      this.ngOnInit();

    },(error) => {
      this.produitService.notificationAjouter(error?.error?.text, "warning")
    });
    this.messageAlert("Le produit "+this.produit?.nom+" est bien ajouté");
    this.produit = new Produit();
    this.resetData();
    
  }

  editProduit(id: number){
    this.affecterData();
    this.produitService.modifyT("produit/"+this.produits.find((item) => {
      return item.id === Number(id)
    })?.id+"/", this.produit).subscribe(res => {
      this.produit = res;

      if(this.lengthFiles !== 0 ){
        for(let i = 0; i < this.lengthFiles; i++){
         this.onSubmit(id, this.images.value[i]);
        }
      }

      this.produitService.notificationAjouter("Le produit est modifié avec succès", "success");
      this.ngOnInit();
    },(error) => {
      this.produitService.notificationAjouter(error?.error?.text, "warning")
    });

    

    this.produit = new Produit();

    this.resetData();

    //this.routeOther.navigate(['admin/produit/liste'])
  }


  affecterData(){
    this.produit.nom = this.nom.value;
    this.produit.prix = this.prix.value;
    this.produit.diminu_price = this.diminu_price.value;
    this.produit.quantite = this.quantite.value;
    this.produit.caracteristique = this.caracteristique.value;
    this.produit.categories = [this.categories.value];
    
    this.produit.fournisseur = this.fournisseur.value;
  }

  resetData(){
    this.nom.setValue('');
    this.prix.setValue(0);
    this.diminu_price.setValue(0);
    this.quantite.setValue(1);
    this.caracteristique.setValue('');
    this.categories.setValue([]);
    this.fournisseur.setValue(new Fournisseur());
  }

  messageAlert(message: string){
    this.afficheMessageAlert = true;
    this.message = message;
    setTimeout(() => {
      this.afficheMessageAlert = false;
      this.message = "";
    }, 3000);
  }

  findObject(): Produit {
    return this.produits.find((item) => item.id === Number(this.idProduit) ) || new Produit()
}


//image
onChange(event: any) {
  if (event.target.files.length > 0) {
    const file = [];
    this.lengthFiles = event.target.files.length
    for(let i = 0; i < this.lengthFiles ; i++){
      file.push(event.target.files[i]);
    }
    this.images.setValue(file);
    
  }
  
}

onSubmit(id: number | undefined, file: File) {
  //this.addProduit();

  var formData: FormData = new FormData();

  formData.append('image',file);

  this.imageService.postImage(id, formData).subscribe(
    (res) => {
      this.response = res;
      this.imageURL = `${this.imageService.URL_BASE}${res}`;
      console.log(res);
      console.log(this.imageURL);
    },
    (err) => {  
      console.log(err);
    }
  );
}

}
