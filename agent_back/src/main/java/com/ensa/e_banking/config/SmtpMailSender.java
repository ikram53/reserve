package com.ensa.e_banking.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;


@Component
public class SmtpMailSender {
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	 public void sendMail(String to, String subject, String body)
	    {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(to);
	        message.setSubject(subject);
	        message.setText(body);
	        javaMailSender.send(message);
	    }

}
