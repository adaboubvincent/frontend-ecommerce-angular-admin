import { Injectable } from '@angular/core';
import { FournisseurUser } from '../../models/FournisseurUser';
import { HttpClient } from '@angular/common/http';
import { DaoService } from '../dao/dao.service';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class FournisseurUserService extends DaoService<FournisseurUser> {

  constructor(http: HttpClient, service: NotificationsService) {
    super(http, service);
   }


   
   
}
