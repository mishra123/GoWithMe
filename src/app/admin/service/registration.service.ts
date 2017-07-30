import {Component} from '@angular/core';
import {Injectable} from '@angular/core';
import {RegistrationUser} from '../register/register.component';
import {CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';
import {CognitoUtil,CognitoCallBack, LoggedInCallBack} from '../service/cognito.service';
import * as AWS from "aws-sdk/global";
@Injectable()
export class UserRegistrationService {
    constructor(public cognitoUtil: CognitoUtil){

    }

    registerUser(user: RegistrationUser, cognitoCallBack: CognitoCallBack){
        console.log("Register the users");

        let registerAttributes = [];

        let attributeDataName = {
            Name: 'name',
            Value: user.name
        };

        let attributeDataEmail = {
            Name: 'email',
            Value: user.username
        };

        let attributeDataAgency = {
            Name: 'custom:agency',
            Value: user.agency
        };

        let attributeDataPhone = {
            Name: 'phone_number',
            Value: user.phone
        };
        registerAttributes.push(new CognitoUserAttribute(attributeDataName));
        registerAttributes.push(new CognitoUserAttribute(attributeDataEmail));
        registerAttributes.push(new CognitoUserAttribute(attributeDataPhone));
        registerAttributes.push(new CognitoUserAttribute(attributeDataAgency));

        this.cognitoUtil.getUserPool().signUp(user.username, user.password, registerAttributes, null, function(err, result){
            if(err){
                cognitoCallBack.callBack(err.message, null);
            }
            else{
                console.log("Sogn Up successful");
                cognitoCallBack.callBack(null, result);
            }
        });
    }

    confirmRegistration(username: string, confirmationCode: string, cognitoCallBack: CognitoCallBack){
        let userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmRegistration(confirmationCode, true, function(err, result){
            if(err){
                cognitoCallBack.callBack(err.message, null);
            }else {
                cognitoCallBack.callBack(null, result);
            }
        });
    }
    resendCode(username: string, cognitoCallBack: CognitoCallBack){
        let userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.resendConfirmationCode(function (err, result){
            if(err){
                cognitoCallBack.callBack(err.message, null);
            } else{
                cognitoCallBack.callBack(null, result);
            }
        });
    }
}