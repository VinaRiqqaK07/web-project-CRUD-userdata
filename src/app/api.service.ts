import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private _http: HttpClient) { }
    apiUrl = 'http://localhost:3000/user';

    //Get all data
    getAllData():Observable<any>{
        return this._http.get(`${this.apiUrl}`);
    }

    getSingleUser(id: number):Observable<any>{
        return this._http.get(`${this.apiUrl}/${id}`);
    }

    //Create New User
    createNewUser(data: any):Observable<any>{
        return this._http.post(`${this.apiUrl}`, data)
    }

    //Edit user
    editUser(id: number, value: any):Observable<Object>{
        return this._http.put(`${this.apiUrl}/${id}`, value);
    }

    //Delete user
    deleteUser(id: number):Observable<any>{
        return this._http.delete(`${this.apiUrl}/${id}`);
    }

}
