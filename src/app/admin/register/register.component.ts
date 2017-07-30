import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CognitoCallBack} from '../service/cognito.service';
import {UserRegistrationService} from '../service/registration.service';
export class RegistrationUser{
    name: string;
    username: string;
    password: string;
    agency: string;
    phone: string;
}

/**
 * This component is responsible for displaying and controlling
 * the registration of the user.
 */
@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent implements CognitoCallBack {
    registrationUser: RegistrationUser;
    router: Router;
    errorMessage: string;

    constructor(public userRegistrationService: UserRegistrationService, router: Router){
        this.router = router;
        this.onInit();
    }
    onInit(){
        this.errorMessage = null;
        this.registrationUser = new RegistrationUser();
    }
    register(){
        this.errorMessage = null;
        this.userRegistrationService.registerUser(this.registrationUser, this);
    }

    callBack(message: string, result:any){
        if(message != null){
            this.errorMessage = message;
        }
        else{
            console.log("message seems to be null so confirm user");
            this.router.navigate(['/home/confirmRegistration', result.user.username]);
        }
    }
    successCallBack(message:string, result:any){

    }

}