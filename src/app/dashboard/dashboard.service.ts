import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Customer, Employee, Note } from './dashboard.model';


@Injectable()
export class DashboardService {

    noteList: AngularFireList<any>;
    // noteList: AngularFireList<any>;
    selectedEmployee: Employee = new Employee();

    constructor(private http: HttpClient, private firebase: AngularFireDatabase) {

    }

    getCourses(listPath): Observable<any[]> {
        return this.firebase.list('noteList/').valueChanges();
    }

    getNoteList() {
        this.noteList = this.firebase.list('noteList/');
        return this.noteList;
    }

    addNote(note: Note) {
        this.noteList.push({ noteDesc: note.noteDesc, updatedTime: note.updatedTime });
    }

    updateNote(note: Note) {
        this.noteList.update(note.$key, note);
    }

    deleteNote($key: string) {
        this.noteList.remove($key);
    }
}
