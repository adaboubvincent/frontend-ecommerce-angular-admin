import { Fournisseur } from './Fournisseur';
import { User } from './User';


export class FournisseurUser extends Fournisseur {
    public activer?: boolean;
    public utilisateur?: User;
}


