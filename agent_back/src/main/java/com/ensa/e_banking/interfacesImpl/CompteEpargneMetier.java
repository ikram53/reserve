package com.ensa.e_banking.interfacesImpl;

import org.springframework.stereotype.Service;

import com.ensa.e_banking.interfacesMetier.CompteEpargneMetierImp;

@Service
public class CompteEpargneMetier implements CompteEpargneMetierImp {

	@Override
	public Double calculRemuneration(double compte, double taux) {
		return (compte*(1+(taux/100)));
	}

	

}
