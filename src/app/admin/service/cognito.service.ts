import {Injectable} from '@angular/core';
import {environment} from '.../../environments/environment';
import * as AWS from "aws-sdk/global";
import {CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';
import * as CognitoIdentity from "aws-sdk/clients/cognitoidentity";

@Injectable()
export class CognitoUtil{
    public static REGION = environment.region;
    public static USER_POOL_ID = environment.userPoolId;
    public static CLIENT_ID = environment.clientId;
    public static IDENTITY_POOL_ID = environment.identityPoolId;
    public USER_POOL;

    public static POOL_DATA = {
        UserPoolId : CognitoUtil.USER_POOL_ID,
        ClientId: CognitoUtil.CLIENT_ID
    };

    getUserPool(){
        return new CognitoUserPool(CognitoUtil.POOL_DATA);
    }

    getCurrentUser(){
        return this.getUserPool().getCurrentUser();
    }


}
export interface CognitoCallBack{
    callBack(message:string, result:any):void;
    successCallBack(message:string, result:any):void;
}

export interface LoggedInCallBack{
    isLoggedIn(message:string, loggedIn:boolean):void;
}

