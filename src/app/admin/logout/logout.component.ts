import {Component} from '@angular/core';
import {LoggedInCallBack} from '../service/cognito.service';
import {LoginService} from '../service/login.service';
import {Router} from '@angular/router';
@Component({
    template: '<h1>Logout</h1>'
})

export class LogoutComponent implements LoggedInCallBack{

constructor(public router: Router, public loginService:LoginService){
    console.log("Logout Component Constructor");
    this.loginService.isAuthenticated(this);
}

    isLoggedIn(message: string, isLoggedIn:boolean){
        if(isLoggedIn){
            this.loginService.logout();
            this.router.navigate(['/home/login']);
        }
        this.router.navigate(['/home/login']);
    }
}
