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

    private readonly MAIN_URL = "http://localhost:8087/api/moneris";

    private readonly MONERIS_PRE_LOAD_URL = this.MAIN_URL + "/pre-load";
    private readonly MONERIS_RECEIPT_URL = this.MAIN_URL + "/receipt";

    constructor(private http:HttpClient) {
    }

    getMonerisTicket(amount:number):Observable<MonerisResponse>{
        const params = new HttpParams().append('amount', amount);
        return this.http.get<MonerisResponse>(this.MONERIS_PRE_LOAD_URL,{params:params});
    }

    receiptRequest(ticket:string):Observable<any>{
        const params = new HttpParams().append('ticket', ticket);
        return this.http.get<any>(this.MONERIS_RECEIPT_URL,{params:params});
    }
}
