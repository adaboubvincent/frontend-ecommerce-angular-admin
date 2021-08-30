import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductService } from './services/product/product.service';
import { FournisseurService } from './services/fournisseur/fournisseur.service';
import { CategoryService } from './services/category/category.service';
import { SecurityService } from './services/user/security.service';
import { AuthGuard } from './services/guard-auth/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/guard-auth/token-interceptor.service';
import { CommandeService } from './services/commande/commande.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminAddCategoryComponent } from './admin-add-category/admin-add-category.component';
import { AdminAddFournisseurComponent } from './admin-add-fournisseur/admin-add-fournisseur.component';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { AdminBaseComponent } from './admin-base/admin-base.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminDetailCategoryComponent } from './admin-detail-category/admin-detail-category.component';
import { AdminDetailProductComponent } from './admin-detail-product/admin-detail-product.component';
import { AdminListCategoriesComponent } from './admin-list-categories/admin-list-categories.component';
import { AdminListFournisseurComponent } from './admin-list-fournisseur/admin-list-fournisseur.component';
import { AdminListProductsComponent } from './admin-list-products/admin-list-products.component';
import { ListeCommandeComponent } from './liste-commande/liste-commande.component';
import { ImageService } from './services/image/image.service';
import { LivraisonService } from './services/livraison/livraison.service';
import { PanierService } from './services/panier/panier.service';
import { ProduitacommanderService } from './services/produitacommander/produitacommander.service';
import {ChartsModule} from "ng2-charts";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminAddCategoryComponent,
    AdminAddFournisseurComponent,
    AdminAddProductComponent,
    AdminBaseComponent,
    AdminDashboardComponent,
    AdminDetailCategoryComponent,
    AdminDetailProductComponent,
    AdminListCategoriesComponent,
    AdminListFournisseurComponent,
    AdminListProductsComponent,
    ListeCommandeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBootstrapIconsModule.pick(allIcons),
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    MatIconModule

  ],
  providers: [
    ProductService,
    FournisseurService,
    CategoryService,
    SecurityService,
    CommandeService,
    AuthGuard,
    ImageService,
    LivraisonService,
    PanierService,
    ProduitacommanderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
