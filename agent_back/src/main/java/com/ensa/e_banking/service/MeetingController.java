package com.ensa.e_banking.service;

import com.ensa.e_banking.dao.MeetingRepository;
import com.ensa.e_banking.entities.Client;
import com.ensa.e_banking.entities.Meeting;
import com.ensa.e_banking.entities.Operation;
import com.ensa.e_banking.security.SecurityConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.Date;
import java.util.List;


@RestController
@CrossOrigin("*")
public class MeetingController {

    @Autowired
    private MeetingRepository meetingRepository;

    @RequestMapping(value="/meeting/add",method= RequestMethod.POST)
    public Meeting saveMeeting(@RequestBody Meeting meeting) {
        System.out.println("saave meeting");
        return meetingRepository.save(meeting);
    }

    @RequestMapping(value="/meeting/list/{month}",method= RequestMethod.GET)
    public List<Meeting> getMeeting(@PathVariable int month) {
        System.out.println("list meeting");
        System.out.println(month);
        /*return meetingRepository.findAll();*/
        return meetingRepository.getMeetingByMonth(month);
    }

    @RequestMapping(value="/meeting/delete/{id}",method=RequestMethod.DELETE)
    public Boolean deleteMeeting(@PathVariable long id) {
        System.out.println("delete meeting");
       Meeting meeting=meetingRepository.findById(id).get();
        meetingRepository.delete(meeting);
        return true;
    }

    @RequestMapping(value="/meeting/update/{id}",method=RequestMethod.PUT)
    public Meeting updateMeeting(@PathVariable long id,@RequestBody Meeting meeting){
        System.out.println("edit meeting");
        System.out.println(meeting.getTitle());
        Meeting meet=meetingRepository.findById(id).get();
        if(meet != null ) {
                meeting.setId(id);
            }

        System.out.println(meeting);
        return  meetingRepository.save(meeting);

    }



}
