import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public email: any;
    public password: any;
    public submitted: boolean = false;
    public error: any;
    constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }
    login(form: NgForm) {
        this.submitted = true;
        if (form.invalid)
            return true;
        this.authSvc.login(this.email, this.password).subscribe((isloggedIn) => {  
                 if(isloggedIn){
                  this.router.navigate(['/']);
                 } else{
                  this.error = 'Invalid user and password!';
                 }     
           
        }) 
    }
}
