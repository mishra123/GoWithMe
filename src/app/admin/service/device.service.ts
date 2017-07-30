/**
 * @author Anoop Mishra <anoop.mishra@sa.gov.au>
 */
import {Component, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {ApiUtil} from '../service/api.service';
import {Injectable} from '@angular/core';
import {CognitoCallBack} from '../service/cognito.service';
import {Router} from '@angular/router';
declare var ol: any;
var deviceLayer: any;
//import {DeviceCallBack} from '../service/device.service';
import 'rxjs/add/operator/map';
@Component({
  template: '../home/home.component.html'
})
/**
 * @class contains CRUD function on device using REST Api
 */
//@Injectable()
export class DeviceService {
public device : Array<any>;
data
    public constructor(private http: Http,  public router:Router){
       // this.device = [];
    }
    /**
     * @function Add new device using Post API request
     * @param device object
     */
    public addNewDevice(selectedDevice){
      //  console.log("Adding new device: " + JSON.stringify(selectedDevice));
     //   return this.http.post(ApiUtil.API_URL, selectedDevice);

    }
    /**
     * @function delete device with specified id
     * @param id of the device
     */
    public deleteDevice(){

    }
    /**
     * @function Update the device detail with PATCH request. It just updates the fields mentioned in the 
     * parameters, all other fields will remain same.
     * @param device object
     */
    public updateDevice(){

    }
    /**
     * @function return all the devices from DynamoDB using GET request
     */
    public getDeviceMapLayer(map){
      console.log("Inside getDevices function of DeviceComponent::"  +ApiUtil.API_URL+'/api/devices');
       this.http.get(ApiUtil.API_URL+'/api/devices')
        .map(res => res.json()).subscribe(function (res){
          var collection = [];
          for(let f of res){
           var feature = {
              type: "Feature",
              geometry:{
                type: "Point",
                coordinates: ([f.location.longitude, f.location.latitude])
              },
              properties: {
               name: f.agency,
               id: f.id,
               mac: f.mac
              }
            }
            collection.push(feature);
          }
         var geoJsonObject = {
            type: 'FeatureCollection',
            features: collection
          };
       var vectorSource = new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(geoJsonObject,{ featureProjection: 'EPSG:3857' })
         });
          var styles = {
                        'Point': new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 2,
                                stroke: new ol.style.Stroke({color: [255, 71, 26,1], width: 1}),
                                fill: new ol.style.Fill({color: [255, 51, 0,1]})
                            })
                        })
                    };
        var styleFunction = function(feature) {
            return styles[feature.getGeometry().getType()];
          };
         deviceLayer = new ol.layer.Vector({
                        source: vectorSource,
                        projection : 'EPSG:3857',
                        id:'allDevices',
                        minResolution:0,
                        maxResolution:200,
                        style: styleFunction
                    });
         map.addLayer(deviceLayer);  
        })
        
    }
    
    /**
     * @function get device with specified id
     * @param id of the device to be returned
     */
    public getDevice(){
        console.log("Get Device");
    }
    /**
     * @function Returns the list of devices belongs to a particular agency
     * @param name of the agency e.g. DPTI
     */
    public getDevicesOfSpecifiedAgency(){

    }

}
    export interface DeviceCallBack{
    deviceCallBack(message:string, result:any):void;
  //  successCallBack(message:string, result:any):void;
}
