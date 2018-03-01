import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Employee, Note } from './dashboard.model';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

// declare var firebase: any;

export class Customer {
    $key: string;
    name: string;
    age: number;
    active: boolean = true;
}

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

    noteOptionList = ['Personal', 'Professional', 'Social', 'Optional'];
    selectedOptions = "";
    sliderValue: number = 1;
    employeeList: Employee[] = [];
    noteList: Note[] = [];
    emailFormControl = new FormControl('', []);
    newNoteField: string;

    constructor(private dashServ: DashboardService, public snackBar: MatSnackBar, private adapter: DateAdapter<any>) {
    }

    ngOnInit() {
        // this.dashServ.getFirebaseData().subscribe(data => {
        //     console.log(data);
        // })
        var x = this.dashServ.getNoteList();
        x.snapshotChanges().subscribe(item => {
            this.noteList = [];
            item.forEach(element => {
                var y = element.payload.toJSON();
                y["$key"] = element.key;
                this.noteList.push(y as Note);
            });
            console.log(this.noteList)
            // this.dashServ.deleteEmployee(this.employeeList[0].$key);
        });
    }

    public addNote(noteDesc: string) {
        this.dashServ.addNote({ "$key": null, "noteDesc": noteDesc, "updatedTime": new Date() })
        this.newNoteField = "";
        this.openSnackBar("Note Succesfully Added", "")
    }

    public updateNote(noteKey: string, noteDesc: string) {
        this.dashServ.updateNote({ "$key": noteKey, "noteDesc": noteDesc, "updatedTime": new Date() })
        this.openSnackBar("Note Succesfully Updated", "")
    }

    public deleteNote(noteKey: string) {
        this.dashServ.deleteNote(noteKey);
        this.openSnackBar("Note Succesfully Removed", "")
    }

    public openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}
