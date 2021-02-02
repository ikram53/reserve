package com.ensa.e_banking.security;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.ensa.e_banking.dao.AgentRepository;
import com.ensa.e_banking.entities.Agent;


@Service
public class AppUserDetailsService implements UserDetailsService {
    
	@Autowired
	AgentRepository agentRepository;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Agent agent = agentRepository.findByUsername(username);
		if(agent==null) throw new UsernameNotFoundException(username);

		
		return new User(agent.getUsername(),agent.getPassword(),new ArrayList<>());
		}
		
		
	

}
