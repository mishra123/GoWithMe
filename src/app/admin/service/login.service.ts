import {Component} from '@angular/core';
import {Injectable} from '@angular/core';
import {CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';
import {CognitoUtil,CognitoCallBack, LoggedInCallBack} from '../service/cognito.service';
import * as AWS from "aws-sdk/global";
@Injectable()
export class LoginService {
  
    constructor(public cognitoUtil: CognitoUtil){

    }
   authenticate(username:string, password:string, cognitoCallBack: CognitoCallBack){
     var authenticationData = {
        Username : username,
        Password : password,
        //NewPassword: newPassword
    }; 
    var authenticationDetails = new AuthenticationDetails(authenticationData);
    var userData = {
        Username:username,
        Pool: this.cognitoUtil.getUserPool(),
    };
    console.log("Authenticating the user in Login service" + CognitoUtil.USER_POOL_ID);
    let cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
         newPasswordRequired:function(userAttributes, requiredAttributes){
             console.log("New Password Required, Navigating to the New password screen");
             cognitoCallBack.callBack("Admin user is forced to change the password.", null);
        }, 
        onSuccess:function (result){
            console.log("User is authenticated, access token is: " + result.getAccessToken().getJwtToken());  
            var url ='cognito-idp.' + CognitoUtil.REGION.toLowerCase() + '.amazonaws.com/' + CognitoUtil.USER_POOL_ID;
             AWS.config.region =  CognitoUtil.REGION;
             AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                 IdentityPoolId: CognitoUtil.IDENTITY_POOL_ID,
              Logins : {
                    url : result.getIdToken().getJwtToken() 
                 }
             }); 
             cognitoCallBack.callBack(null, result);       
        },
        onFailure: function(err){
            console.log(err);
            cognitoCallBack.callBack(err.message, null);
        }
    });

}
//New password
    authenticateForceChangePassword(username:string, password:string, newPassword:string, cognitoCallBack: CognitoCallBack){
     var authenticationData = {
        Username : username,
        Password : password
    }; 
    var authenticationDetails = new AuthenticationDetails(authenticationData);
    var userData = {
        Username:username,
        Pool: this.cognitoUtil.getUserPool()
    };
    
    console.log("Authenticating the user in Login service");
    let cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        newPasswordRequired:function(userAttributes, requiredAttributes){
            delete userAttributes.email_verified;
            cognitoUser.completeNewPasswordChallenge(newPassword, requiredAttributes,{
                onSuccess:function(result){
                   cognitoCallBack.successCallBack("Password Changed Successfully.", null);
                },
                onFailure:function(err){
                    cognitoCallBack.callBack(err.message, null);
                }
            })
        },
        onSuccess:function (result){
            console.log("User is authenticated, access token is: " + result.getAccessToken().getJwtToken());  
            var url ='cognito-idp.' + CognitoUtil.REGION.toLowerCase() + '.amazonaws.com/' + CognitoUtil.USER_POOL_ID;
             AWS.config.region =  CognitoUtil.REGION;
             AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                 IdentityPoolId: CognitoUtil.IDENTITY_POOL_ID,
                 Logins : {
                    url : result.getIdToken().getJwtToken() 
                 }
             });        
        },
        onFailure: function(err){
            console.log("Error occured: " + err.message);
            cognitoCallBack.callBack(err.message, null);
        }
    });

}
    //Reset Password
    resetPassword(email:string,  cognitoCallBack: CognitoCallBack){
         let userData = {
             Username: email,
             Pool: this.cognitoUtil.getUserPool()
        };
        let cognitoUser = new CognitoUser(userData);
         cognitoUser.forgotPassword({
            onSuccess:function(){
                console.log("On succcess: ");
            },
            onFailure: function(err){

            },
            inputVerificationCode(){
                cognitoCallBack.callBack(null, null);
            }
        }); 
    }
    //Confirm New password
    confirmNewPassword(email:string, verificationCode: string, password: string, cognitoCallBack: CognitoCallBack){
         let userData = {
            Username: email,
             Pool: this.cognitoUtil.getUserPool(),
        };
        let cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmPassword(verificationCode, password, {
            onSuccess: function(){
                console.log("Password confirmed successfully");
                cognitoCallBack.callBack(null, null);
            },
            onFailure: function(err){
                console.log("Password confirmation failed");
                cognitoCallBack.callBack(err.message, null);
            }
        });
    }
    //Logout function
    logout() {
        console.log("Signing out");
       this.cognitoUtil.getCurrentUser().signOut();
    }
    isAuthenticated(callBack : LoggedInCallBack){
        if(callBack==null){
            throw("User login service call cannot be null");
        }
        console.log("Is authneticated");
       var cognitoUser = this.cognitoUtil.getCurrentUser();
       console.log("Is cognito user empty? " + cognitoUser);
       if(cognitoUser!=null){
           cognitoUser.getSession(function (err, session){
               if(err){
                   console.log("Couldn't get session:" + err);
                   callBack.isLoggedIn(err, false);
               }
               else{
                   console.log("Session is: " +session);
                   callBack.isLoggedIn(err, true);
               }
           })
       }
       else{
           callBack.isLoggedIn("Cannot retrieve the current user", false);
       }
    }
   // LoggedInCallBack(){

  //  }
    verifyUser(){
        console.log("I am verifying user");
    }
}