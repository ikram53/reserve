import { Agent } from './Agent';
import { Compte } from './compte';

export class Operation{
    
    public numOperation: number;
    public typeOperation: string="";
    public dateOperation: Date;
    public montant: number;
    public compteSource: Compte;
    public compteDestination: Compte;
    public agent: Agent;

    constructor(){}
    
}