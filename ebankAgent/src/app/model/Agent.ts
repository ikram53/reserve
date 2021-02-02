import { Agence } from './Agence';

export class Agent{
    public id:number;
     public  nom: string;
     public prenom:string;
     public cin: string;
     public username: string;
     public sexe:string;
     private password: string;
     private agence:Agence
     constructor(){}

    
 }