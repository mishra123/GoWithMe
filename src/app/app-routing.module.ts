import {NgModule} from '@angular/core';
import { CommonModule }   from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';


import {ErrorFoundComponent} from './error/error.component';
import {HomePageComponent, HomeComponent} from './home/home.component';
import {AppComponent} from './app.component'
import { LoginComponent }    from './admin/login/login.component';

import {ModuleWithProviders} from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { ForceChangePassword } from './admin/forceChangePassword/forceChangePassword.component';
import { LoginService } from './admin/service/login.service';
import {LogoutComponent} from './admin/logout/logout.component';
import {HttpModule, Http} from '@angular/http';
import {BrowserXhr } from '@angular/http';
import {CognitoUtil} from './admin/service/cognito.service';
import {RegisterComponent} from './admin/register/register.component';
import {ResetPasswordComponent1, ResetPasswordComponent2} from './admin/reset/reset.component';
import {RegistrationConfirmationComponent} from './admin/confirmReg/confirmReg.Component';
import {UserRegistrationService} from './admin/service/registration.service';
import {DeviceService} from './admin/service/device.service';
const AdminRoutes: Routes = [
    {
        path:'',
        redirectTo:'/home/login',
        pathMatch: 'full'
    },
    
    { 
        path: 'home',  
        component: AdminComponent, 
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'newpassword', component: ForceChangePassword },
            {path: 'resetpassword', component:ResetPasswordComponent1},
            {path:'resetpassword/:username', component:ResetPasswordComponent2},
            { path: 'deviceregistry', component:HomePageComponent},
            {path: 'registration', component: RegisterComponent},
            {path: 'confirmRegistration/:username', component: RegistrationConfirmationComponent},
            { path: '', component: LoginComponent }
        ]
    }
];
const HomeRoutes: Routes = [
     {

        path: '',
        redirectTo: '/home/deviceregistry',
        pathMatch: 'full'
    },
    {
        path: 'home/deviceregistry', 
        component: AdminComponent, 
        children: [
        {path: 'logout', component: LogoutComponent},
        {path: 'save', component: HomePageComponent},
        //{path: 'myprofile', component: MyProfileComponent},
        //{path: 'useractivity', component: UseractivityComponent},
        {path: '', component: HomePageComponent}
        ]
    }
];
const routes: Routes = [
    {
        path:'',
        children:[
            ...AdminRoutes,
            ...HomeRoutes,
            {
                path:'',
                component: HomeComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule.forChild(AdminRoutes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        AdminComponent,
        LoginComponent,
        ForceChangePassword,
        HomePageComponent,
        LogoutComponent,
        HomeComponent,
        ResetPasswordComponent1, 
        ResetPasswordComponent2,
       RegistrationConfirmationComponent,
        RegisterComponent
          ],
    providers: [
        LoginService,
        DeviceService,
        CognitoUtil,
        BrowserXhr,
        UserRegistrationService
    ]
})
export class AdminModule {}
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

