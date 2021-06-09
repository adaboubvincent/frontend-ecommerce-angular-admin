import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Categorie } from 'src/app/models/Categorie';
import { DaoService } from '../dao/dao.service';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends DaoService<Categorie> {

  constructor(http: HttpClient, service: NotificationsService) {
    super(http, service);
   }
}
