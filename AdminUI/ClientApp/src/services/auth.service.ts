import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';

// const poolData = {
//   UserPoolId: 'us-east-1_f5CYhm9Hw', // Your user pool id here
//   ClientId: '6ff0qksomf8oj5ff8ifj7733tn' // Your client id here  
// };

// const userPool = new CognitoUserPool(poolData);
@Injectable({
    providedIn: 'root'
})
export class AuthService {
cognitoUser: any;

    constructor(private router: Router, private http: HttpClient) {

  }

    get isLogedIn() {
        return parseInt(localStorage.getItem('isLoggedIn'));
    }

    login(email, password): Observable<boolean> {


        // const authenticationData = {
        //     Username : email,
        //     Password : password,
        //   };
        //   const authenticationDetails = new AuthenticationDetails(authenticationData);
      
        //   const userData = {
        //     Username : email,
        //     Pool : userPool
        //   };
        //   const cognitoUser = new CognitoUser(userData);
          
        //   return Observable.create(observer => {
      
        //     cognitoUser.authenticateUser(authenticationDetails, {
        //       onSuccess: function (result) {
                
        //         //console.log(result);
        //         observer.next(result);
        //         observer.complete();
        //       },
        //       onFailure: function(err) {
        //         console.log(err);
        //         observer.error(err);
        //       },
        //     });
        //   });
      var model= {
            "UserName": "aryan",
                "Password": "abc@123"
      }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
                
            })
        };
        this.http.get("/api/account").subscribe(p => { p });
        return Observable.of(true);
        this.http.post("/api/Account/login", model, httpOptions).subscribe(p => {
            console.log(p);
            localStorage.setItem('isLoggedIn', '1');
         return Observable.of(true);
                //if(email == 'admin' && password =='admin'){
          //localStorage.setItem('isLoggedIn','1');
        //  return Observable.of(true);
        //}else{
        //  return Observable.of(false);
        //}
        })
        return Observable.of(false);

    }
    // getAuthenticatedUser() {
    //     // gets the current user from the local storage
    //     return userPool.getCurrentUser();
    //   }
    logout() {
        // this.getAuthenticatedUser().signOut();
        // this.cognitoUser = null;
        localStorage.setItem('isLoggedIn','0')
        this.router.navigate(['/login']);
    }

}
