import { Component, OnInit } from '@angular/core';
import { Commande } from '../models/Commande';
import { ProduitACommander } from '../models/ProduitACommander';
import { CommandeService } from '../services/commande/commande.service';
import { LivraisonService } from '../services/livraison/livraison.service';
import { PanierService } from '../services/panier/panier.service';
import { Livraison } from '../models/Livraison';

@Component({
  selector: 'app-liste-commande',
  templateUrl: './liste-commande.component.html',
  styleUrls: ['./liste-commande.component.css']
})
export class ListeCommandeComponent implements OnInit {
  afficheMessageAlert = false;
  message = "";
  valeurChoose: string = "";

  commandes: Commande[] = [];

  constructor(private commandeService: CommandeService, private panierService: PanierService,
    private livraisonService: LivraisonService) { }

  ngOnInit(): void {
    this.commandeService.commandes.subscribe((cats: Commande[]) => {
      this.commandes = cats;
      this.commandes.forEach((item, index) => {
        this.panierService.getProduitACommandeByPanier(item.panier?.id).subscribe((resP: ProduitACommander[]) => {
          this.commandes[index].produitAcommandes = resP;
        });
        this.panierService.getPrixTotalPanier(item.panier?.id).subscribe((resP: any) => {
          this.commandes[index].get_prix_total_panier = resP?.get_prix_total_panier;
          this.commandes[index].get_prix_total_final_panier = resP?.get_prix_total_final_panier;
        });
      })
    });
    this.commandeService.emitGetCommandes();
  }

  messageAlert(message: string){
    this.afficheMessageAlert = true;
    this.message = message;
    setTimeout(() => {
      this.afficheMessageAlert = false;
      this.message = "";
    }, 3000);
  }

  estLivrer(id: number | undefined){
    console.log("click", id);
    let livraison = new Livraison();
    livraison.estLivrer = true;
    this.livraisonService.modifyT("livraison/"+id+"/", livraison).subscribe((res) => {
      this.commandeService.emitGetCommandes();
    });
  }

  nonLivrer(id: number | undefined){
    console.log("click", id);
    let livraison = new Livraison();
    livraison.estLivrer = false;
    this.livraisonService.modifyT("livraison/"+id+"/", livraison).subscribe((res) => {
      this.commandeService.emitGetCommandes();
    });
  }

  deleteCommade(id: number | undefined = 0){
    if(confirm("Vous êtes sûr de pouvoir supprimer cette commande ?")){
     
      this.commandeService.deletT("supprimer-commande/"+id+"/", this.commandes.find((item) => {
          return item.id === id
        })).subscribe(res =>{
            let etat = res;
            this.ngOnInit();
      });
      
      this.messageAlert("Une commande a été supprimée !");
    }
    
  }

}
