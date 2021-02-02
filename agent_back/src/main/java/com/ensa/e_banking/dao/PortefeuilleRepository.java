package com.ensa.e_banking.dao;

import com.ensa.e_banking.entities.Compte;
import com.ensa.e_banking.entities.Operation;
import com.ensa.e_banking.entities.Portefeuille;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface  PortefeuilleRepository extends JpaRepository<Portefeuille, Long> {
    @Query("select porte from Portefeuille porte where porte.agent.id=:x")
    public List<Portefeuille> searchByMc(@Param("x") Long mc);
}
