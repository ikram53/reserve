package com.ensa.e_banking.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.ensa.e_banking.entities.Compte;

public interface CompteRepository extends JpaRepository<Compte,Long> {

	@Query("select c from Compte c  where c.rib like :x  and c.etat =1")
	 public List<Compte> chercherA(@Param("x") String mc);
	
	@Query("select c from Compte c  where c.rib like :x  and c.etat =0")
	 public List<Compte> chercherD(@Param("x") String mc);
	
	@Query(value ="SELECT num_compte FROM Compte ORDER BY num_compte DESC LIMIT 1",nativeQuery=true)
	public Long dernierEnregistrement();
	
	@Query(value ="SELECT * FROM compte where etat =1",nativeQuery=true)
	List <Compte> findCompteActive();
	
	@Query(value ="SELECT * FROM compte where etat =0",nativeQuery=true)
	List <Compte> findCompteDesactive();

	@Query(value ="SELECT * FROM compte where rib like :x",nativeQuery=true)
	public Compte findCompteByRib(@Param("x") String rib);

	@Query(value ="SELECT * FROM compte where (id_client=:x and type_compte like 'CC')",nativeQuery=true)
	Compte findCompteByIdClient(@Param("x") Long id_client);

	@Query(value ="SELECT * FROM compte where id_client=:x",nativeQuery=true)
	List<Compte> trouverComptesByIdClient(@Param("x") Long id_client);

	@Modifying
	@Query(value ="delete FROM compte where id_client=:x",nativeQuery=true)
	int deleteCompteByIdClient(@Param("x") Long id_client);

	@Query(value ="SELECT * FROM compte where type_compte like 'CE'",nativeQuery=true)
	List<Compte> getCompteEpargne();

}
