import {Component, OnInit} from '@angular/core';
import {LoginService} from '../service/login.service';
import {Router} from '@angular/router';
import {CognitoCallBack, LoggedInCallBack} from '../service/cognito.service'

@Component({
    templateUrl: './login.component.html',
   // styleUrls: ['./login.component.css']
})
export class LoginComponent implements CognitoCallBack, LoggedInCallBack, OnInit{
    username: string;
    password: string;
    errorMessage: string;

    constructor(private loginService: LoginService, private router: Router){
        console.log("LoginComponent1 Constructor");
    }
       ngOnInit() {
        this.errorMessage = null;
        console.log("Checking if the user is already authenticated. If so, then redirect to the secure site");
        this.loginService.isAuthenticated(this);
    }

    login(){
        if(this.username==null || this.password==null){
            console.log("Checking if username or password is blank");
            this.errorMessage = "Username and Password are required."
            return;
        }
        this.errorMessage = null;
      //  this.loginService.checkUserPasswordRequirements(this.username, this);
      
        this.loginService.authenticate(this.username, this.password, this);
        //this.loginService.verifyUser();
    }
    cancel(){
        this.router.navigate(['']);
    }
    callBack(message: string, result:any){
        if(message!=null){
            this.errorMessage = message;
            console.log("The error message is: " + this.errorMessage);
            if(this.errorMessage === "Admin user is forced to change the password."){
                console.log("Navigate to change password");
                this.router.navigate(['/home/newpassword']);
            }
            else if(this.errorMessage === "Password reset required for the user"){
                console.log("Password needs to be changed");
                this.router.navigate(['/home/resetpassword']);
            }

        }
        else{
            this.errorMessage=null;
            console.log("Redirecting to device registry");
            this.router.navigate(['/home/deviceregistry']);
        }
    }
    successCallBack(message:string, result:any){

    }

    isLoggedIn(message: string, isLoggedIn: boolean){
        if(isLoggedIn){
            this.router.navigate(['/home/deviceregistry'])
        }
    }
}