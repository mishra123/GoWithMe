import {Component} from '@angular/core';
import {LoginService} from '../service/login.service';
import {Router} from '@angular/router';
import { CognitoUtil, CognitoCallBack, LoggedInCallBack} 
from '../service/cognito.service';

@Component({
    templateUrl: './forceChangePassword.component.html',
   //   styleUrls: ['../login/login.component.css']
})
export class ForceChangePassword  implements CognitoCallBack{
    username: string;
    password: string;
    newPassword: string;
    errorMessage: string;
    successMessage:string;

    constructor(private loginService: LoginService, private router: Router){
        console.log("Force Change password Constructor");
    }
    
    forChangePassword(){
       if(this.username==null || this.password==null || this.newPassword==null){
            console.log("Checking if username or password is blank");
            this.errorMessage = "All fields are required";
            return;
        }
        this.errorMessage = null;
        this.loginService.authenticateForceChangePassword(this.username, this.password, this.newPassword, this);
      //  this.loginService.verifyUser();
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
        }
        else{
            this.errorMessage=null;
            this.router.navigate(['/home/deviceregistry']);
        }
    }
    successCallBack(message:string, result:any){
        if(message!=null){
            this.successMessage = message;
            if(this.successMessage==="Password Changed Successfully."){
                console.log("Password Changed successfully");
                this.router.navigate(["/home/deviceregistry"]);
            }
            }
        
        else{
            this.successMessage=null;
        }
    }
}