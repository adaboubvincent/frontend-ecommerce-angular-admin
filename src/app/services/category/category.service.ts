import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Categorie } from 'src/app/models/Categorie';
import { DaoService } from '../dao/dao.service';
import { NotificationsService } from 'angular2-notifications';
import {Observable} from "rxjs";
import {Produit} from "../../models/Produit";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends DaoService<Categorie> {

  constructor(http: HttpClient, service: NotificationsService) {
    super(http, service);
   }
  searhProduitByCategory(nomCategorie: string | undefined): Observable<Array<Produit>>{
    return this.http.get<any>(this.url+"recherche-produits-par-categorie/"+nomCategorie+"/");
  }
}
