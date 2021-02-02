package com.ensa.e_banking.entities;


import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
import java.util.Collection;

public class Agence {
	//il faut avoir des taux predefini comme pour le taux de virement

	private Integer numAgence;//code guichet


	private String nomAgence;
	// 5 chiffre
	private int code_banque=30045;



	private String adresse;
	private String ville;
	private String tel;


	@OneToMany(mappedBy="agence",cascade = CascadeType.ALL)
	private Collection<Portefeuille> portefeuille;

	public Integer getNumAgence() {
		return numAgence;
	}

	public void setNumAgence(Integer numAgence) {
		this.numAgence = numAgence;
	}

	public String getNomAgence() {
		return nomAgence;
	}

	public void setNomAgence(String nomAgence) {
		this.nomAgence = nomAgence;
	}

	public int getCode_banque() {
		return code_banque;
	}

	public void setCode_banque(int code_banque) {
		this.code_banque = code_banque;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getVille() {
		return ville;
	}

	public void setVille(String ville) {
		this.ville = ville;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public Agence(Integer numAgence, String nomAgence, int code_banque, String adresse, String ville, String tel) {
		this.numAgence = numAgence;
		this.nomAgence = nomAgence;
		this.code_banque = code_banque;
		this.adresse = adresse;
		this.ville = ville;
		this.tel = tel;
	}

	public Agence() {

	}

	public Collection<Portefeuille> getPortefeuille() {
		return portefeuille;
	}

	public void setPortefeuille(Collection<Portefeuille> portefeuille) {
		this.portefeuille = portefeuille;
	}
}
