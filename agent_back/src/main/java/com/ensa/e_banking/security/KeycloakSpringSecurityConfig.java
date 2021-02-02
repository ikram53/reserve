package com.ensa.e_banking.security;

import org.keycloak.adapters.springsecurity.KeycloakConfiguration;
import org.keycloak.adapters.springsecurity.authentication.KeycloakAuthenticationProvider;
import org.keycloak.adapters.springsecurity.config.KeycloakWebSecurityConfigurerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.authentication.session.RegisterSessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;


@KeycloakConfiguration
public class KeycloakSpringSecurityConfig extends KeycloakWebSecurityConfigurerAdapter {


    @Override
    protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
        return new RegisterSessionAuthenticationStrategy(new SessionRegistryImpl());

    }
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
      auth.authenticationProvider(keycloakAuthenticationProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        System.out.println("config");
        super.configure(http);

        http
                .cors().and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/operation/**","/compte/CC/rib/**").hasAuthority("caissier")
                .antMatchers("/compte/**").hasAuthority("compte-manager")
                .antMatchers("/client/**").hasAuthority("charge-clienthele")
                .antMatchers("/portefeuille/**").hasAuthority("manager-agence")
                .antMatchers("/upload/**").permitAll()
                .anyRequest().authenticated();


    }
}
