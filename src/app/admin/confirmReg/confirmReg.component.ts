import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserRegistrationService} from '../service/registration.service';
import {Router, ActivatedRoute} from '@angular/router';
import {CognitoCallBack} from '../service/cognito.service'

@Component({
    template:'./confirmReg.component.html'
})
export class RegistrationConfirmationComponent implements OnInit, OnDestroy{
    confirmationCode: string;
    username: string;
    errorMessage: string;

    private sub: any;
    constructor(public registrationService: UserRegistrationService, public router: Router, 
    public route: ActivatedRoute){
        console.log("Reg Confirmation Component");
    }
    ngOnInit(){
        this.sub = this.route.params.subscribe(params => {
            this.username = params['username'];
        });
        this.errorMessage = null;
    }
    ngOnDestroy(){
        this.sub.unsubscribe();
    }

    confirmRegistration(){
        this.errorMessage = null;
        this.registrationService.confirmRegistration(this.username, this.confirmationCode, this);
    }

     callBack(message: string, result: any) {
        if (message != null) { //error
            this.errorMessage = message;
            console.log("message: " + this.errorMessage);
        } else { //success
            //move to the next step
            console.log("Moving to securehome");
            // this.configs.curUser = result.user;
            this.router.navigate(['/securehome']);
        }
    }
    successCallBack(message: string, result: any){

    }

}  