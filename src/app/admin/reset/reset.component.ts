import {Component, OnInit, OnDestroy} from "@angular/core";
import {CognitoCallBack, LoggedInCallBack} from '../service/cognito.service';
import {Router, ActivatedRoute} from "@angular/router";
import {LoginService} from '../service/login.service';

@Component({
    templateUrl: './reset.component.html'
})
export class ResetPasswordComponent1 implements CognitoCallBack {
    username: string;
    errorMessage: string;

    constructor(public router: Router, public loginService: LoginService){
        console.log("Reset Password Component");
        this.errorMessage = null;
    }
    onNext(){
        this.errorMessage = null;
        this.loginService.resetPassword(this.username, this);
    }
    callBack(message: string, result:any){
        if(message==null && result==null){
            console.log("Comes here");
            this.router.navigate(['/home/resetpassword', this.username]);
        }
        else{

        this.errorMessage = message;
        }
    }
    successCallBack(message:string, result:any){
    console.log("Inside the success call back");
    //No success call
    }
}

@Component({
    templateUrl: './resetStep2.component.html'
})
export class ResetPasswordComponent2 implements CognitoCallBack, OnInit, OnDestroy{
    verificationCode: string;
    username: string;
    password: string;
    errorMessage: string;
    private sub: any;

    constructor(public router: Router, public route: ActivatedRoute, public loginService: LoginService){
        console.log("Inside Reset Password Component 2");
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

    onNext(){
        this.errorMessage = null;
        this.loginService.confirmNewPassword(this.username, this.verificationCode, this.password, this);
    }
    callBack(message:string){
       if (message != null) { //error
            this.errorMessage = message;
            console.log("result: " + this.errorMessage);
        }
        else{
            this.router.navigate(['/home/login']);
        }
    }
    successCallBack(message:string){
        //No success call
    }
}