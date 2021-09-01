import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SecurityService } from '../services/user/security.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
  '../../assets/css/style.css',
  '../../assets/css/responsive.css',
  '../../assets/css/bootstrap.min.css']
})
export class LoginComponent implements OnInit {

  loadingPage: boolean = false;

  formLogin = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private securityService: SecurityService, private route: Router) {
   }

  ngOnInit(): void {
  }

  submit(){
    let user = new User();
    user.username = this.formLogin.get('username')?.value;
    user.password = this.formLogin.get('password')?.value;
    this.securityService.login(user).subscribe((res) => {
      let dict = res;
      if(res.user?.role != 'ADMIN'){
        //document.getElementById("notFound")?.removeAttribute("hidden");
        this.securityService.notificationAjouter("Vous ne pouvez pas se connecter sur ce site.\nVous devez avoir un accès Admin", "warning");
      }else{
        if(res.user?.is_active == true){
          localStorage.setItem('token', res.token || "");
          localStorage.setItem('username', res.user?.username || "");
          localStorage.setItem('email', res.user?.email || "");
          localStorage.setItem('is_superuser', ""+res.user?.is_superuser || "");
          localStorage.setItem('role', ""+res.user?.role || "");
          localStorage.setItem('pageReload', 'true');
          window.location.replace('/dashboard');
          //this.securityService.notificationAjouter("Vous êtes connecté maintenant!", "success");
        }else{

          this.securityService.notificationAjouter(res?.test || "" , "warning");
        }

        this.route.navigateByUrl('');
        //window.location.reload();
      }
    }, (error) => {
      document.getElementById("invalid")?.removeAttribute('hidden');
      this.securityService.notificationAjouter("Identifiants incorrects", "danger");
    });


  }



}
