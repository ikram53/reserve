import { Agent } from './Agent';
import { Client } from './client';

export class Compte{
    public typeCompte:string="CC";
    public numCompte:number;
	public rib:string="";
	public  dateCreation:Date;
	public solde:number=0;
	public  etat:number;
    public fraisOuverture:number=0;
    public agent:Agent=new Agent();
    public client:Client=new Client();
    public idClient: number= 0;
    
    constructor(){}
    set agentC(value) {
        this.agent = value;
      }

}