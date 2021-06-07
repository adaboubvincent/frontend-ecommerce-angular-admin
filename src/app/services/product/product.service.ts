import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Produit } from 'src/app/models/Produit';
import { DaoService } from '../dao/dao.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends DaoService< Produit> {

  constructor(http: HttpClient) {
    super(http);
   }
}
