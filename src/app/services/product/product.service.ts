import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from 'src/app/models/Produit';
import { DaoService } from '../dao/dao.service';
import { NotificationsService } from 'angular2-notifications';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends DaoService< Produit> {

  constructor(http: HttpClient, service: NotificationsService) {
    super(http, service);
   }
  searhProduit(nomProduit: string | undefined): Observable<Array<Produit>>{
    return this.http.get<any>(this.url+"recherche-produits/"+nomProduit+"/");
  }

  getProduitFournisseurUser(id_fournisseur: number | undefined): Observable<Array<Produit>>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+localStorage.getItem('token')
      })
    };

    return this.http.get<Array<Produit>>(this.url+"get-all-produits-of-boutique/"+id_fournisseur+"/", options);
   }

}
