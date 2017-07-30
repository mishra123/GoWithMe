import {Injectable} from '@angular/core';
import {Component} from '@angular/core';
import {environment} from '.../../environments/environment';

@Injectable()
export class ApiUtil {
    public static API_URL = environment.apiUrl;
} 