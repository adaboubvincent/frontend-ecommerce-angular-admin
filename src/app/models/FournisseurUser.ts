import { User } from './User';


export class FournisseurUser{
    public id?: number;
    public nom?: string;
    public telephone?: number | string;
    public adresse?: string;
    public email?: string;
    public estPerson?: boolean;
    public activer?: boolean;
    public utilisateur?: User;
}


