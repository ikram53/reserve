package com.ensa.e_banking.service;

import com.ensa.e_banking.dao.AgentRepository;
import com.ensa.e_banking.dao.PortefeuilleRepository;
import com.ensa.e_banking.entities.Agent;
import com.ensa.e_banking.entities.Meeting;
import com.ensa.e_banking.entities.Portefeuille;
import com.ensa.e_banking.interfacesMetier.OperationMetier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class PortefeuilleController {

    @Autowired
    PortefeuilleRepository portefeuilleRepository;

    @Autowired
    AgentRepository agentRepository;

    @RequestMapping(value="/portefeuille/list",method= RequestMethod.GET)
    public List<Portefeuille> getPortefeuille() {
        return  portefeuilleRepository.findAll();
    }

    @RequestMapping(value="/portefeuille/affectation/{id}",method= RequestMethod.GET)
    public List<Agent> getAgent(@PathVariable int id) {
        return  agentRepository.findAllByNumAgence(id);
    }

    @RequestMapping(value="/portefeuille/reaffectation/{id}",method= RequestMethod.PUT)
    public Portefeuille affecteAgent(@PathVariable Long id,@RequestBody Portefeuille portefeuille){
        Portefeuille portef=portefeuilleRepository.findById(id).get();
        if(portef != null ) {
            portefeuille.setId(id);
        }
        return  portefeuilleRepository.save(portefeuille);

    }
    @RequestMapping(value="/portefeuille/search/{id}",method= RequestMethod.GET)
    public List<Portefeuille> getPortefeuilleByMotCle(@PathVariable Long id) {
        return  portefeuilleRepository.searchByMc(id);
    }


}
