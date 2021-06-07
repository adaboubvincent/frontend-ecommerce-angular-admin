import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Categorie } from 'src/app/models/Categorie';
import { DaoService } from '../dao/dao.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends DaoService<Categorie> {

  constructor(http: HttpClient) {
    super(http);
   }
}
