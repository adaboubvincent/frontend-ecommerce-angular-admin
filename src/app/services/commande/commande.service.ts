import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
import { Commande } from 'src/app/models/Commande';
import { DaoService } from '../dao/dao.service';

@Injectable({
  providedIn: 'root'
})
export class CommandeService extends DaoService<Commande> {
  commandes = new Subject<Array<Commande>>();
  constructor(http: HttpClient, service: NotificationsService) {
    super(http, service);
   }

   emitGetCommandes(){
    this.getAll("commandes/").subscribe((res: Commande[]) => {
      this.commandes.next(res);
    });
  }
}
