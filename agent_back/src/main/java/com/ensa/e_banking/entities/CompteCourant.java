package com.ensa.e_banking.entities;

import java.util.Date;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import com.fasterxml.jackson.annotation.JsonTypeName;

@Entity
@DiscriminatorValue("CC")
@JsonTypeName("CC")
public class CompteCourant extends Compte{

	public CompteCourant() {
		super();
		
	}

	

	public CompteCourant(String rib, Date dateCreation, int etat, Double fraisOuverture) {
		super(rib, dateCreation, etat, fraisOuverture);
		// TODO Auto-generated constructor stub
	}

	
	

	

	
	

}
