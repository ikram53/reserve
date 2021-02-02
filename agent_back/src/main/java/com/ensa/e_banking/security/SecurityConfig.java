package com.ensa.e_banking.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
/*import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {


	@Autowired
	AppUserDetailsService appUserDetailsService;


	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(appUserDetailsService).passwordEncoder(passwordEncoder());
	}


	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring()
				.antMatchers("/agent/list/{keyword}")
				.antMatchers("/agent/deleteagence/{id}")
				.antMatchers("/agent/deleteagent/{id}")
				.antMatchers("/agent/agentsbyagence/{id}")
				.antMatchers("/agent/update/{id}")
				.antMatchers("/agent/add")
				.antMatchers("/agent/list")
				.antMatchers("/operation/list")
				.antMatchers("/agent/listCompteDesactive")
				.antMatchers("/agent/listCompteActive")
		         .antMatchers("/agent/chercherA/{mc}")
				.antMatchers("/agent/chercherD/{mc}")
				 .antMatchers("/operation/recherche/{mc}");

	}


	@Override
	protected void configure(HttpSecurity http) throws Exception {

				http.csrf().disable()
				 .authorizeRequests().anyRequest().authenticated()

						.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		 .and()

		 .addFilter(new JWTAuthenticationFilter(authenticationManager()))
		 .addFilterBefore(new JWTAuthorizationFilter(),
		 UsernamePasswordAuthenticationFilter.class);


		}
	          
	    
	          
		
	            
	    }*/



