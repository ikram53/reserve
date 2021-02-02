package com.ensa.e_banking.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.ensa.e_banking.entities.Operation;


public interface OperationRepository extends JpaRepository<Operation, Long>{

	@Query(value ="SELECT * FROM operation  where  rib_source=:x or rib_destination=:x",nativeQuery=true)
	List <Operation> findOperationByIdCompte(@Param("x") String rib);

	@Query("select o from Operation o  where  o.typeOperation like :x and (o.compteSource.rib like :y or o.compteDestination.rib like :y)")
    List<Operation> chercherO(@Param("x") String mc,@Param("y") String rib);

	@Query("select o from Operation o  where o.compteSource.rib like :x or o.typeOperation like :x or  o.compteDestination.rib like :x ")
	public List<Operation> chercherOperation(@Param("x") String mc);

	@Modifying
	@Query(value ="delete FROM operation where  rib_source=:x or rib_destination=:x",nativeQuery=true)
	int deleteOperationByCompte(@Param("x") String rib);

	@Query("select o from Operation o  where o.compteSource.rib like :rib and o.typeOperation like 'retrait'")
	public List<Operation> getOperationByMonth(@Param("rib") String rib);







}
