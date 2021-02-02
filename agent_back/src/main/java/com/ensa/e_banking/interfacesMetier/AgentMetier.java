package com.ensa.e_banking.interfacesMetier;

import com.ensa.e_banking.entities.Agent;

public interface AgentMetier {
	
     public  Agent getAgent(Long id);
     public Agent getAgentByUsername(String username);
}
