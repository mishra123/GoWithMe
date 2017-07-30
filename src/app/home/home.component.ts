import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import {LoggedInCallBack, CognitoCallBack} from '../admin/service/cognito.service';
import {Router} from "@angular/router";
import {LoginService} from '../admin/service/login.service';
import {Observable} from 'rxjs/Rx';
import {DeviceService} from '../admin/service/device.service';
import {DeviceTypes} from './deviceTypes.component';
declare var ol: any;
//import 'rxjs/Rx';
@Component({
  templateUrl: './home.component.html'
})

export class HomePageComponent implements LoggedInCallBack, CognitoCallBack, AfterViewInit{
     @ViewChild("mapElement") mapElement: ElementRef;
    errorMessage:string;
    deviceReturned:string;
    devices: Observable<any[]>;
    public map:any;
    constructor(public router: Router, public loginService: LoginService, public deviceService: DeviceService) {
      console.log("Home Page Component");
      var map_layer = new ol.layer.Tile({
            source: new ol.source.XYZ({
              url: 'https://stamen-tiles-b.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
            })
          });
        this.map = new ol.Map({
         layers: [
          map_layer
        ],
         view: new ol.View({
          center: ol.proj.fromLonLat([138.59863, -34.92866]),
          zoom:10
        })
      });
     this.deviceService.getDeviceMapLayer(this.map);
     this.loginService.isAuthenticated(this);
    }
  //  device1:any[];

    ngAfterViewInit(){
    this.map.setTarget(this.mapElement.nativeElement.id);
   // this.devices =  this.deviceService.getDevices();
    for(let device in this.devices){
    console.log("Devices: " + JSON.stringify(device));
    var pos = ol.proj.fromLonLat([138.600022, -34.928584]);
    }
    var marker = new ol.Overlay({
    position: pos,
    positioning: 'center-center',
    element: document.getElementById('marker'),
    stopEvent: false
          });
    this.map.addOverlay(marker);
    
    }
    ngOnInit() {
      //  this.devices = this.deviceComponent.getDevices();
    }

    deviceTypes = [
        new DeviceTypes("Classic"),
        new DeviceTypes("BLE"),
        new DeviceTypes("BLE Eddestone"),
        new DeviceTypes("BLE iBeacon"),
        new DeviceTypes("BLE AltBeacon"),
        new DeviceTypes("BLE URIBeacon"),
        new DeviceTypes("Dual Classic BLE"),
        new DeviceTypes("BLE5")
    ];
    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        }
    }
    showDevices(){
      // this.devices =  this.deviceService.getDevices();
       //this.deviceReturned = "val";
    }
    callBack(message: string, result:any){
       if(message!=null){
            this.errorMessage = message;
            if(this.errorMessage === "Api is called"){
                console.log("Api is successful");
                this.router.navigate(['/home/deviceregistry/save'])
            }

        }
        else{
            this.errorMessage=null;
            console.log("Redirecting to device registry");
            this.router.navigate(['/home/deviceregistry']);
        }
    }
    successCallBack(){

    }
}
@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    constructor() {
        console.log("HomeComponent constructor");
    }

    ngOnInit() {

    }
}

export interface Device{
    agency: string;
    battery_life: string;
    date_battery_installed: Date;
    device_type: string;
    floor: number;
    is_dynamic: boolean;
    latitude: string;
    longitude: string;
    mac:string;
    major_value: number;
    minor_value: number;
    power: number;
    power_source: string;
    range: number;
}