package com.ensa.e_banking.service;

import java.text.ParseException;
import java.util.List;
import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import com.ensa.e_banking.dao.CompteRepository;
import com.ensa.e_banking.dao.OperationRepository;
import com.ensa.e_banking.entities.Compte;
import com.ensa.e_banking.security.SecurityConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ensa.e_banking.config.SmtpMailSender;
import com.ensa.e_banking.entities.Client;
import com.ensa.e_banking.interfacesMetier.ClientMetier;
import org.springframework.web.client.RestTemplate;


@RestController
@CrossOrigin("*")
public class ClientService {



    @Autowired
    RestTemplate restTemplate;

    private String url = "http://localhost:8082";
	//private  String  url="https://afoih-client.herokuapp.com";

	private String urla="http://localhost:8083";
	//private  String urla="https://afoih-admin.herokuapp.com";

	HttpHeaders headers=new HttpHeaders();


	@Autowired
	private SmtpMailSender smtpMailSender;

	@Autowired
	private CompteRepository compteRepository;

	@Autowired
	private OperationRepository operationRepository;

	@Autowired
	private  HomeController homeController;

	@Autowired
	private  ClientMetier clientMetier;



	@RequestMapping(value="/client/ajoutClient",method=RequestMethod.POST)
	public Client saveClient(@RequestBody Client client,HttpServletRequest request) {


		headers.set(SecurityConstants.HEADER_STRING,
				SecurityConstants.TOKEN_PREFIX+request.getHeader(SecurityConstants.HEADER_STRING));
		HttpEntity<Client> req = new HttpEntity<>(client,headers);
		return restTemplate.postForObject(url+"/client/ajoutClient", req, Client.class);
	}

/*@Autowired
BCryptPasswordEncoder bCryptPasswordEncoder=new  BCryptPasswordEncoder();*/
	@RequestMapping("/agent/send-email")
	public void sendMail(@RequestBody Client client,HttpServletRequest request) throws MessagingException {


	String body="Votre mot de passe est "+client.getPassword()+" Bienvenue chez nous";
	this.smtpMailSender.sendMail(client.getUsername(), "Your Password", body);
	client.setPassword(clientMetier.genererPassword());
	updateClient(client.getId(),client,request);


	}

	@RequestMapping(value="/client/update/{id}",method=RequestMethod.PUT)
	public Boolean updateClient(@PathVariable long id,@RequestBody Client client,HttpServletRequest request){
		System.out.println("edit-back");
		headers.set(SecurityConstants.HEADER_STRING,
				SecurityConstants.TOKEN_PREFIX+request.getHeader(SecurityConstants.HEADER_STRING));
		HttpEntity<Client> entity = new HttpEntity<Client>(client,headers);

		restTemplate.put(url+"/client/update/"+id, entity);
		System.out.println("edit-agent");
		return true;
	}





//
	@RequestMapping(value="/client/{id}",method=RequestMethod.GET)
	public Client getClientById(@PathVariable Long id,HttpServletRequest request) throws ParseException {


		List<Client> list = getClients(request);
		for(Client cl : list){

			if(cl.getId() == id) {
				return cl;
			}
		}
		return null;
	}


	@Transactional
	@RequestMapping(value="/client/delete/{id}",method=RequestMethod.DELETE)
	public boolean supprimer(@PathVariable long id,HttpServletRequest request){

		Compte compte=compteRepository.findCompteByIdClient(id);

     if(operationRepository.findOperationByIdCompte(compte.getRib()) !=null){
		operationRepository.deleteOperationByCompte(compte.getRib());
		 compteRepository.deleteCompteByIdClient(id);
     }
     else{  compteRepository.deleteCompteByIdClient(id);}



		headers.set(SecurityConstants.HEADER_STRING,
				SecurityConstants.TOKEN_PREFIX+request.getHeader(SecurityConstants.HEADER_STRING));
		HttpEntity<Client> entity = new HttpEntity<Client>(headers);

		restTemplate.exchange(url+"/client/delete/"+id, HttpMethod.DELETE,entity, Boolean.class);
		String act= "l'agent ID : "/*+ homeController.currentAgent().getId() + " a supprimé le client ID : "+ id +
				" ainsi que son compte RIB : " + compte.getRib()*/;

		restTemplate.postForObject(urla + "/supprimerClient", act, String.class);
	    return true;
	}

	@RequestMapping(value="/agent/chercher/{mc}",method=RequestMethod.GET)
	public List<Client> chercher(@PathVariable String mc,HttpServletRequest request){
		headers.set(SecurityConstants.HEADER_STRING,
				SecurityConstants.TOKEN_PREFIX+request.getHeader(SecurityConstants.HEADER_STRING));
		HttpEntity<Client> entity = new HttpEntity<Client>(headers);
			ResponseEntity<List<Client>> response = restTemplate.exchange(
					url+"/client/recherche/"+mc, HttpMethod.GET, entity, new ParameterizedTypeReference<List<Client>>() {}
			);

			List<Client> list = response.getBody();
			return  list;
		}


    @RequestMapping(value="/client/list",method = RequestMethod.GET)
    public List<Client> getClients(HttpServletRequest request){
		headers.set(SecurityConstants.HEADER_STRING,
				SecurityConstants.TOKEN_PREFIX+request.getHeader(SecurityConstants.HEADER_STRING));
		HttpEntity<Client> entity = new HttpEntity<Client>(headers);
		ResponseEntity<List<Client>> response = restTemplate.exchange(
				url+"/client/list", HttpMethod.GET, entity, new ParameterizedTypeReference<List<Client>>() {}
		);
		List<Client> list = response.getBody();
		return list;


    }
			
}
