import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { User } from '../models/User';
import { SecurityService } from '../services/user/security.service';

@Component({
  selector: 'app-admin-base',
  templateUrl: './admin-base.component.html',
  styleUrls: ['./admin-base.component.css']
})
export class AdminBaseComponent implements OnInit {
  adminLogin: User;
  constructor(private route: Router, private securityService: SecurityService) {
    this.adminLogin = new User();
    this.adminLogin.username = "Inconnu";
    this.adminLogin.email = "Inconnue";
  }

  ngOnInit(): void {
    this.securityService.user(localStorage.getItem('token')).subscribe((res: User) => {
      this.adminLogin = res;
    }, (error) => {
      localStorage.setItem('token', "");
      localStorage.setItem('id', "");
      localStorage.setItem('username', "");
      localStorage.setItem('email', "");
      localStorage.setItem('is_superuser', "");
      this.securityService.notificationAjouter("Vous êtes en mode déconnecté !", "danger");
    });
    
  }


  showPageVisiteur(){
	  localStorage.setItem('admin', "false");
		this.route.navigate([''])
	  
  }

  logout(){
	  this.securityService.logout(localStorage.getItem('token')).subscribe((res) => {
		let dict = res;
		this.securityService.notificationAjouter("Vous êtes déconnecté maintenant !", "success");
    localStorage.setItem('token', "");
    localStorage.setItem('id', "");
    localStorage.setItem('username', "");
    localStorage.setItem('email', "");
    localStorage.setItem('is_superuser', "");

   
    if(localStorage.getItem('token') === ""){
      window.location.reload();
    }
	}, (error) => {
    this.securityService.notificationAjouter("Cette action ne peut pas se produire", "danger");
  });

	
	
    
  }

}
/* 
,
    (error) => {
      localStorage.setItem('token', "");
      localStorage.setItem('id', "");
      localStorage.setItem('username', "");
      localStorage.setItem('email', "");
      localStorage.setItem('is_superuser', "");
    } */
