import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotifierService } from 'angular-notifier';
import 'angular2-notifications';
//import * as $ from 'jquery';
//import 'bootstrap-notify';
//declare var $:JQueryStatic;
//declare var $:any;
import * as jQuery from 'jquery';
import 'bootstrap-notify';
import { NotificationsService } from 'angular2-notifications';

let $: any = jQuery;

@Injectable({
    providedIn: 'root'
  })
export class DaoService<T> {
  //private notifier: NotifierService;

    protected liste: Array<T> = Array<T>();
    url: string;
    URL_BASE = environment.APIEndpoint;
    public objectSubject = new Subject<T[]>();
    constructor(protected http: HttpClient,protected service: NotificationsService) {
        const APIEndpoint = environment.APIEndpoint;
        this.url = APIEndpoint + '/api/';
    }
    getAll(url: string): Observable<Array<T>>{
        return this.http.get<Array<T>>(this.url + url);
    }
    addT(url: string, t: T | undefined){
        return this.http.post(this.url + url, t);
    }
    deletT(url: string, t?: T | undefined){
        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          bodey: t
        };
        return this.http.delete(this.url + url, options);
    }
    modifyT(url: string, t: T | undefined){
        return this.http.put(this.url + url, t);
    }

    get(url: string, id: number): Observable<T>{
        return this.http.get<T>(this.url + url + id);
    }

    notificationAjouter(message: string, type: string ="success"){
    
        /* $.notify({
          message: "message",
          
        },
        {
          animate: {
            enter: "animated bounceInRight",
            exit: "animated bounceOutRight"
    
          },
          timer: 10000,
          delay: 10000,
          type: type
        }); */

        //$.notify({message: message, type: type});

        //this.notifier.notify(type, message);
        if(type === "success"){
          this.service.success("Success", message, {
            position: ['top', 'right'],
            timeOut: 4000,
            animate: 'fade',
            showProgressBar: true
          })
        }else if(type === "warning"){
          this.service.warn("Warn", message, {
            position: ['top', 'right'],
            timeOut: 4000,
            animate: 'fade',
            showProgressBar: true
          })
        }else if(type === "danger"){
          this.service.error("Error", message, {
            position: ['top', 'right'],
            timeOut: 4000,
            animate: 'fade',
            showProgressBar: true
          })
        }
    }



}