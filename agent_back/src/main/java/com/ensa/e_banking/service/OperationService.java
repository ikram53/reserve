package com.ensa.e_banking.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ensa.e_banking.entities.Operation;
import com.ensa.e_banking.interfacesMetier.OperationMetier;
import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("*")
public class OperationService {
	@Autowired
	OperationMetier operationMetier;

	
	@RequestMapping(value="/operation/versement",method=RequestMethod.POST)
	public int verser(@RequestBody Operation operation) {
		System.out.println(operation.getCompteSource());
		operationMetier.verser(operation);
		return 0;
	}
	
	@RequestMapping(value="/operation/retrait",method=RequestMethod.POST)
	public boolean retirer(@RequestBody Operation operation) {
		return operationMetier.retirer(operation);
	}
	
	@RequestMapping(value="/operation/virement",method=RequestMethod.POST)
	 public boolean virement(@RequestBody Operation operation, HttpServletRequest req) {
		return operationMetier.virement(operation);
	}
	
	@RequestMapping(value="/operation/recharge/{codeRecharge}",method=RequestMethod.POST)
	 public boolean recharge(@RequestBody Operation operation, @PathVariable Long codeRecharge, HttpServletRequest req) {

		return operationMetier.recharge(operation, codeRecharge);
	}
	
	@RequestMapping(value="/operation/listOperation/{rib}",method=RequestMethod.GET)
	public List<Operation> getOperationsByClient(@PathVariable String rib, HttpServletRequest req){
		return operationMetier.getOperationByIdCompte(rib);
	}

	@RequestMapping(value="/operation/list",method=RequestMethod.GET)
	public List<Operation> getList(){
	return  operationMetier.getOperations();
	}

	@RequestMapping(value="/operation/recherche",method=RequestMethod.GET)
	public List<Operation> rechercheOperation(@RequestParam(name="mc",defaultValue="") String mc){
		return  operationMetier.chercherOperation(mc);
	}


   @RequestMapping(value ="/operation/chercheO/{mc}/{rib}",method = RequestMethod.GET)
   public List<Operation> chercheOperation (@PathVariable(name = "mc") String mc, @PathVariable(name = "rib") String rib)
   {
		return operationMetier. getOperationByCompte(mc,rib);}

	@RequestMapping(value="/operation/recherche/{mc}",method=RequestMethod.GET)
	public List<Operation> rechercheOperationk(@PathVariable String mc){
		return  operationMetier.chercherOperation(mc);
	}


}
