import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HotspotMaster } from './dashboard.model';


@Injectable()
export class DashboardService {

    hotspotList: AngularFireList<any>
    tagList: AngularFireList<any>

    constructor(private http: HttpClient, private firebase: AngularFireDatabase) {

    }

    getHotSpotList() {
        this.hotspotList = this.firebase.list('hotspotList/');
        return this.hotspotList;
    }

    addHotspot(hotspot: HotspotMaster) {
        this.hotspotList.push({
            SSID: hotspot.SSID,
            latitude: hotspot.latitude,
            longitude: hotspot.longitude,
            name: hotspot.name,
            tag: hotspot.tag
        });
    }

    getTagList() {
        this.tagList = this.firebase.list('tagList/');
        return this.tagList;
    }

    addTag(tagName: string) {
        this.tagList.push({ name: tagName });
    }

    updateHotspot(hotspot: HotspotMaster) {
        this.hotspotList.update(hotspot.$key, hotspot);
    }

    deleteHotspot($key: string) {
        this.hotspotList.remove($key);
    }
}
