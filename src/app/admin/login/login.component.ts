import { Component } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: string;
  password: string;
  
  constructor(private user: UserService, private router: Router){}
  
  login(){
    this.user.login(this.email, this.password);
    this.user.verifyUser();
  }
  
  signUp(){
    this.router.navigate(['/admin/signup']);
  }
  
  cancel(){
    this.router.navigate(['']);
  }
  
}