import {Component, OnInit} from '@angular/core';
import {MonerisService} from "./service/moneris.service";

declare var monerisStart: any;

@Component({
    selector: 'root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'moneris-demo';
    ticket = "";

    constructor(private monerisService:MonerisService) {}

    ngOnInit(): void {}

    makePayment() {
        this.monerisService.getMonerisTicket(3.00).subscribe(result=>{
            console.log("Result: "+JSON.stringify(result));
            this.ticket = result.response.ticket;
            monerisStart(this.ticket);
        });
    }
}
