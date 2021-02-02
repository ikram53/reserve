package com.ensa.e_banking.entities;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@Entity
public class Operation {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long numOperation;
	private String typeOperation;
	@Temporal(TemporalType.DATE)
	private Date dateOperation;
	private double montant;
  
	@ManyToOne
	@JoinColumn(name="Rib_Source")
	private Compte compteSource;
	
	
	@ManyToOne
	@JoinColumn(name="Rib_Destination")
	private Compte compteDestination;
	//dans la banque c'est l'agent qui effectue les operation
   
	@ManyToOne
	@JoinColumn(name="id_agent")
	private Agent agent;


	
	public Long getNumOperation() {
		return numOperation;
	}

	public void setNumOperation(Long numOperation) {
		this.numOperation = numOperation;
	}

	public Date getDateOperation() {
		return dateOperation;
	}


	public void setDateOperation(Date dateOperation) {
		this.dateOperation = dateOperation;
	}


	public double getMontant() {
		return montant;
	}

	
	public void setMontant(double montant) {
		this.montant= montant;
	}
   

	
	public Agent getAgent() {
		return agent;
	}

	public void setAgent(Agent agent) {
		this.agent = agent;
	}

	
	public Operation() {
		super();
		
	}

	
	public String getTypeOperation() {
		return typeOperation;
	}

	
	public void setTypeOperation(String typeOperation) {
		this.typeOperation = typeOperation;
	}

	public Compte getCompteSource() {
		return compteSource;
	}

	
	public void setCompteSource(Compte compteSource) {
		this.compteSource = compteSource;
	}

	
	public Compte getCompteDestination() {
		return compteDestination;
	}

	
	public void setCompteDestination(Compte compteDestination) {
		this.compteDestination = compteDestination;
	}


	

	public Operation(Long numOperation, Date dateOperation, double montant, Compte compteSource,
			Compte compteDestination, Agent agent) {
		super();
		this.numOperation = numOperation;
		this.dateOperation = dateOperation;
		this.montant = montant;
		this.compteSource = compteSource;
		this.compteDestination = compteDestination;
		this.agent = agent;
		
	}

	

	
	
	
   
}
