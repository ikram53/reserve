

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Agent } from '../model/Agent';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode: number;

  public credentials = {
    username: '',
    password: ''
  };

  agent: Agent;
  


  constructor(private router: Router) { }
      ngOnInit(): void {
     
      
  }



}
