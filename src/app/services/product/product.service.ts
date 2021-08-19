import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
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
}
