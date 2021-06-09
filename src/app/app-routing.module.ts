import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { AdminDetailProductComponent } from './admin-detail-product/admin-detail-product.component';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { AdminDetailFournisseurComponent } from './admin-detail-fournisseur/admin-detail-fournisseur.component';
import { AdminAddFournisseurComponent } from './admin-add-fournisseur/admin-add-fournisseur.component';
import { AdminDetailCategoryComponent } from './admin-detail-category/admin-detail-category.component';
import { AdminAddCategoryComponent } from './admin-add-category/admin-add-category.component';
import { AuthGuard } from './services/guard-auth/auth.guard';
import { ListeCommandeComponent } from './liste-commande/liste-commande.component';
import { AdminListCategoriesComponent } from './admin-list-categories/admin-list-categories.component';
import { AdminListFournisseurComponent } from './admin-list-fournisseur/admin-list-fournisseur.component';
import { AdminListProductsComponent } from './admin-list-products/admin-list-products.component';

const routes: Routes = [
  {path: '', component: AdminDashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},

  {path: 'admin', children: [
    {path: 'produit', children: [
      {path: 'detail/:id', component: AdminDetailProductComponent},
      {path: 'modifier/:id', component: AdminAddProductComponent},
      {path: 'ajouter', component: AdminAddProductComponent},
      {path: 'liste', component: AdminListProductsComponent}
    ]},
    {path: 'fournisseur', children: [
      {path: 'detail/:id', component: AdminDetailFournisseurComponent},
      {path: 'modifier/:id', component: AdminAddFournisseurComponent},
      {path: 'ajouter', component: AdminAddFournisseurComponent},
      {path: 'liste', component: AdminListFournisseurComponent}
    ]},
    {path: 'categorie', children: [
      {path: 'detail/:id', component: AdminDetailCategoryComponent},
      {path: 'modifier/:id', component: AdminAddCategoryComponent},
      {path: 'ajouter', component: AdminAddCategoryComponent},
      {path: 'liste', component: AdminListCategoriesComponent}
    ]},
    {path: 'commandes', component: ListeCommandeComponent, canActivate: [AuthGuard]},
  ], canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
