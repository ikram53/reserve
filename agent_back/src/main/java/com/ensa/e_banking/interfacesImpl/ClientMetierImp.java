package com.ensa.e_banking.interfacesImpl;

import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.springframework.stereotype.Service;
import com.ensa.e_banking.interfacesMetier.ClientMetier;



@Service
public class ClientMetierImp implements ClientMetier{
    

	 final String letterLower = "abcdefghijklmnopqrstuvwxyz";
     final String letterUpper= letterLower.toUpperCase();
     final String number = "0123456789";
     final String caractereSpeciaux = "!@#$%&*_?";
     final String passworwdCombinaison= letterLower+ letterUpper + number + caractereSpeciaux;

	@Override
	public String genererPassword() {

		   List<String> letters = Arrays.asList(caractereSpeciaux.split(""));
           Collections.shuffle(letters);

		     SecureRandom random = new SecureRandom();
		     String password="";

		     password+=letterLower.charAt(random.nextInt(letterLower.length()));
		     password+=letterUpper.charAt(random.nextInt(letterUpper.length()));
		     password+=number.charAt(random.nextInt(number.length()));
             password+=caractereSpeciaux.charAt(random.nextInt(caractereSpeciaux.length()));
		     for(int i=0;i<4;i++) {
		    	 password+=passworwdCombinaison.charAt(random.nextInt(passworwdCombinaison.length()));
		     }

		return password;
	}

	

}

