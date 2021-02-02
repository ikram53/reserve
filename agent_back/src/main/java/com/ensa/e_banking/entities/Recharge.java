package com.ensa.e_banking.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class Recharge {
	
	@Id
	private Long codeRecharge;
	private Double valeur;
	
	
	
	public Recharge() {
		super();
	}


	public Recharge(Long codeRecharge, Double valeur) {
		super();
		this.codeRecharge = codeRecharge;
		this.valeur = valeur;
	}




	public Long getCodeRecharge() {
		return codeRecharge;
	}


	public void setCodeRecharge(Long codeRecharge) {
		this.codeRecharge = codeRecharge;
	}


	public Double getValeur() {
		return valeur;
	}


	public void setValeur(Double valeur) {
		this.valeur = valeur;
	}


	@Override
	public String toString() {
		return "Recharge [codeRecharge=" + codeRecharge + ", valeur=" + valeur + "]";
	}


	
	
	
	

}
