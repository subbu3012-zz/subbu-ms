import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { HotspotMaster, TagMaster } from './dashboard.model';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    // animations: [routerTransition()],
    providers: [DashboardService, { provide: MAT_DATE_LOCALE, useValue: 'en-In' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },]
})
export class DashboardComponent implements OnInit {

    newHotspot: HotspotMaster = new HotspotMaster();

    noteOptionList = ['Personal', 'Professional', 'Social', 'Optional'];
    selectedOptions = "";
    sliderValue: number = 1;
    hotspotList: HotspotMaster[] = [];
    tagList: TagMaster[] = [];
    emailFormControl = new FormControl('', []);
    newNoteField: string;

    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone, private dashServ: DashboardService, public snackBar: MatSnackBar, private adapter: DateAdapter<any>) {
    }


    ngOnInit() {
        var x = this.dashServ.getHotSpotList();
        x.snapshotChanges().subscribe(item => {
            this.hotspotList = [];
            item.forEach(element => {
                var y = element.payload.toJSON();
                y["$key"] = element.key;
                this.hotspotList.push(y as HotspotMaster);
            });
        });

        var y = this.dashServ.getTagList();
        y.snapshotChanges().subscribe(item => {
            this.tagList = [];
            item.forEach(element => {
                var y = element.payload.toJSON();
                y["$key"] = element.key;
                this.tagList.push(y as TagMaster);
            });
        });

        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        //set current position
        this.setCurrentPosition();
    }
    public addHotspot() {
        console.log(this.newHotspot)
        this.dashServ.addHotspot({
            "SSID": this.newHotspot.SSID,
            "latitude": this.newHotspot.latitude,
            "longitude": this.newHotspot.longitude,
            "name": this.newHotspot.name,
            "tag": this.newHotspot.tag
        })
        this.addNewTag(this.newHotspot.tag);
        this.newHotspot = new HotspotMaster();
        this.openSnackBar("Hotspot Succesfully Added", "")
    }

    public addNewTag(tagName: string) {
        if (this.tagList.filter(element => element.name == tagName).length == 0) {
            this.dashServ.addTag(tagName)
        }
    }

    public updateHotspot() {
        this.dashServ.updateHotspot(this.newHotspot)
        this.openSnackBar("Hotspot Succesfully Updated", "")
    }

    public deleteHotspot(noteKey: string) {
        this.dashServ.deleteHotspot(noteKey);
        this.openSnackBar("Hotspot Succesfully Removed", "")
    }

    public openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }
}
