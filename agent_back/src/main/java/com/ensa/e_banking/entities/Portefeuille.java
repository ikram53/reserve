package com.ensa.e_banking.entities;

import javax.persistence.*;

@Entity
@Table
public class Portefeuille {
    @Id
    private  Long id;
    private String description;
    private Integer num_agence;

    @ManyToOne
    @JoinColumn(name="id_agent")
    private Agent agent;

    public Portefeuille(Long id, String description,Integer num_agence) {
        this.id = id;
        this.description = description;
        this.num_agence=num_agence;

    }

    public Portefeuille(Long id, String description, Integer num_agence, Agent agent) {
        this.id = id;
        this.description = description;
        this.num_agence = num_agence;
        this.agent = agent;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getNum_agence() {
        return num_agence;
    }

    public void setNum_agence(Integer num_agence) {
        this.num_agence = num_agence;
    }

    public Agent getAgent() {
        return agent;
    }

    public void setAgent(Agent agent) {
        this.agent = agent;
    }

    public Portefeuille() {
    }

}
