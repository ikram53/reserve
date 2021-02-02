package com.ensa.e_banking.interfacesImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ensa.e_banking.dao.AgentRepository;
import com.ensa.e_banking.entities.Agent;
import com.ensa.e_banking.interfacesMetier.AgentMetier;
@Service
public class AgentMetierImp implements AgentMetier {

	@Autowired
	AgentRepository agentRepository;

	@Override
	public Agent getAgent(Long id) {
		return  agentRepository.findById(id).get();
	}

	@Override
	public Agent getAgentByUsername(String username) {
		
		return agentRepository.findByUsername(username);
	}
	
	

}
