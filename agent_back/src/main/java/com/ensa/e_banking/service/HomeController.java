package com.ensa.e_banking.service;

import com.ensa.e_banking.interfacesMetier.ClientMetier;
import org.keycloak.KeycloakPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.ensa.e_banking.entities.Agent;
import com.ensa.e_banking.interfacesMetier.AgentMetier;

import java.util.Optional;

@RestController
@CrossOrigin("*")
public class HomeController{

	@Autowired
	AgentMetier agentMetier;

	@Autowired
	ClientMetier clientMetier;
	
	//@CrossOrigin(origins="http://localhost:4200")
	@RequestMapping("/agent/currentAgent")
	public String currentAgent() {
		System.out.println("****************************");
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		/*System.out.println(auth);
	    if(!auth.getPrincipal().equals("anonymousUser")) {
	    	Agent agent = agentMetier.getAgentByUsername(auth.getName());
	         return agent;
	    }
	    return null;*/
		if (auth.getPrincipal() instanceof KeycloakPrincipal) {
			KeycloakPrincipal principal = (KeycloakPrincipal) auth.getPrincipal();
			System.out.println("authentifie");
			System.out.println(principal.getKeycloakSecurityContext().getToken().getAuthorization());
			System.out.println(principal.getKeycloakSecurityContext().getToken().getRealmAccess().getRoles());
			return principal.getName();
		}
		return null;
	}

}
	
	


