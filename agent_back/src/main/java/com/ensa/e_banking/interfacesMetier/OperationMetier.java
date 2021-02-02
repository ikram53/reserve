package com.ensa.e_banking.interfacesMetier;

import java.util.List;
import com.ensa.e_banking.entities.Operation;

public interface OperationMetier {
	   
       public Boolean verser(Operation operation);
       public boolean retirer(Operation operation);
       public boolean virement(Operation operation);
       public List<Operation> getOperationByCompte(String mc,String rib);
       public boolean recharge(Operation operation, Long codeRecharge);
       public List<Operation> chercherOperation(String mc);

       public double fraisVirement(double montant);
       public List<Operation> getOperationByIdCompte(String rib);
       public List<Operation> getOperations();

}
