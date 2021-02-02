package com.ensa.e_banking.interfacesImpl;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ensa.e_banking.dao.AgentRepository;
import com.ensa.e_banking.dao.CompteRepository;
import com.ensa.e_banking.dao.OperationRepository;
import com.ensa.e_banking.dao.RechargeRepository;
import com.ensa.e_banking.entities.Compte;
import com.ensa.e_banking.entities.Operation;
import com.ensa.e_banking.entities.Recharge;
import com.ensa.e_banking.interfacesMetier.OperationMetier;

@Service
public class OperationMetierImp implements OperationMetier{

	@Autowired
	private OperationRepository operationRepository;
	@Autowired
	private CompteRepository compteRepository;

	@Autowired
	private RechargeRepository rechargeRepository;
	
	
	    @Override
		@Transactional
		public boolean retirer(Operation operation) {

			Compte compte=compteRepository.findCompteByRib(operation.getCompteSource().getRib());
			if(compte == null || compte.isEtat() == 0) throw new RuntimeException("Compte n'existe pas");
			
			if(compte.getSolde() < operation.getMontant())  throw new RuntimeException("Solde insuffisant");
			
			compte.setSolde(compte.getSolde()-operation.getMontant());
			operationRepository.save(operation);
		    
			
			return true;		
		}
	 

		@Override
		@Transactional
		public Boolean verser(Operation operation) {
			Compte compteDestination = compteRepository.findCompteByRib(operation.getCompteDestination().getRib());



			if(compteDestination ==null){
				System.out.println("compte n'existe pas");
				throw new RuntimeException("Compte n'existe pas ");

			}
			if(compteDestination.isEtat() == 0){

				System.out.println("compte desactive");
				throw new RuntimeException("Compte désactivé");}
			operation.setCompteDestination(compteDestination);
			compteDestination.setSolde(compteDestination.getSolde()+operation.getMontant());
			operationRepository.save(operation);

			return true;
		}
		

        @Transactional
		@Override
		public boolean virement(Operation operation) {

			Compte compteSource=compteRepository.findCompteByRib(operation.getCompteSource().getRib());

			Compte compteDestination=compteRepository.findCompteByRib(operation.getCompteDestination().getRib());

			if(compteSource == null || compteDestination == null) throw new RuntimeException("Compte source ou destination n'existe pas");
			System.out.println(compteDestination.getTypeCompte());
			System.out.println(compteSource.getTypeCompte());
			if(compteSource.getTypeCompte().equals("CE") || compteDestination.getTypeCompte().equals("CE")) {
				System.out.println("c'est un compte epargne");
				throw new RuntimeException("Compte source ou destination est un compte eparge");
			}
			if(compteSource.isEtat() == 0|| compteDestination.isEtat()==0) throw  new RuntimeException("Compte source ou destination désactivé");
			
			
			if(compteSource.getSolde() < operation.getMontant())  throw new RuntimeException("Solde insuffisant");

			operation.setCompteDestination(compteDestination);
			operation.setCompteSource(compteSource);
			
			
			compteSource.setSolde(compteSource.getSolde()-operation.getMontant());
		    compteDestination.setSolde(compteDestination.getSolde()+operation.getMontant());
			operationRepository.save(operation);
		    
		    
		    return true;
		}

	@Override
	public List<Operation> getOperationByCompte(String mc, String rib) {
	 	System.out.println(mc);
		return operationRepository.chercherO("%"+mc+"%",rib);
	}

	@Override
		@Transactional
		public boolean recharge(Operation operation, Long codeRecharge) {
			
			Recharge recharge = rechargeRepository.findById(codeRecharge).orElse(null);
			if(recharge == null ) throw new RuntimeException("Code recharge Invalide"); 
			
			operation.setMontant(operation.getMontant()+recharge.getValeur());
			
			Compte compte=compteRepository.findCompteByRib(operation.getCompteDestination().getRib());
			//if(compte==null || compte.isEtat() == false)  throw new RuntimeException("Compte n'existe pas");
		if( compte.getTypeCompte().equals("CE")) {
			System.out.println("c'est un compte epargne");
			throw new RuntimeException("Compte source  est un compte eparge");
		}
			compte.setSolde(compte.getSolde()+operation.getMontant());
			operationRepository.save(operation);
		    
			
			return true;
		}

	@Override
	public List<Operation> chercherOperation(String mc) {
		return operationRepository.chercherOperation("%"+mc+"%");
	}


	@Override
	public double fraisVirement(double montant) {
		double taux=1/100;
		return taux*montant;
	}


	@Override
	public List<Operation> getOperationByIdCompte(String rib) {
		return operationRepository.findOperationByIdCompte(rib);
	}


	@Override
	public List<Operation> getOperations() {
		return operationRepository.findAll();
	}


}
