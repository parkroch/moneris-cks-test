import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

export interface MonerisResponse{
    response: ResponseModel;
}

export interface ResponseModel{
    success:boolean,
    ticket:string
}

@Injectable({
    providedIn: 'root'
})
export class MonerisService {

    private readonly MAIN_URL = "http://localhost:8087";

    private readonly MONERIS_URL = this.MAIN_URL + "/api/moneris/pre-load"

    constructor(private http:HttpClient) {
    }

    getMonerisTicket(amount:number):Observable<MonerisResponse>{
        const params = new HttpParams().append('amount', amount);
        return this.http.get<MonerisResponse>(this.MONERIS_URL,{params:params});
    }
}
