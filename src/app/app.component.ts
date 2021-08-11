import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {SecurityService} from "./services/user/security.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontendEcommerceAdmin';

  username: string | null = "";
  is_superuser: string | null = "";
  role: string | null = "";

  public constructor(private titleService: Title,private route: Router, private securityService: SecurityService) {
    this.securityService.user(localStorage.getItem('token')).subscribe((res) => {
        let r = res;
      },
      (error) => {
        localStorage.setItem('token', "");
        localStorage.setItem('id', "");
        localStorage.setItem('username', "");
        localStorage.setItem('email', "");
        localStorage.setItem('is_superuser', "");
        localStorage.setItem('role', "");
      });

    this.username = localStorage.getItem('username');
    this.is_superuser = localStorage.getItem('is_superuser');
    this.role = localStorage.getItem('role');
  }
  ngOnInit(): void {
    this.titleService.setTitle('MAYAKI');
  }


}
