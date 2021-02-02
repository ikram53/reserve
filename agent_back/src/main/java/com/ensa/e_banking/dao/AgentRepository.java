package com.ensa.e_banking.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ensa.e_banking.entities.Agent;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface AgentRepository extends JpaRepository<Agent,Long> ,  PagingAndSortingRepository<Agent, Long> {
	
	Agent findByUsername(String username);
	Optional<Agent> findById(Long id);
	Agent findByPassword(String password);
	@Query(value="SELECT id from agent order by num_contrat desc LIMIT 1",nativeQuery=true)
	public Long last_suffix();
	List<Agent> findAllByNumAgence(Integer id);
	@Query(value="select * from agent a where a.nom like %:keyword% or a.prenom like %:keyword% or a.username like %:keyword%",nativeQuery=true)
	List<Agent> findByKeyword(@Param("keyword") String keyword);

	List<Agent> findByNumAgence(@Param("num_agence") Long numAgence);


}
