import {Component, HostListener, OnInit} from '@angular/core';
import {MonerisService} from "./service/moneris.service";
import {Router} from "@angular/router";

declare var monerisStart: any;

@Component({
    selector: 'root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'moneris-demo';
    ticket = "";
    amount = 5.00;

    constructor(private monerisService:MonerisService) {}

    ngOnInit(): void {}

    makePayment() {
        console.log(this.amount);
        this.monerisService.getMonerisTicket(this.amount).subscribe(result=>{
            this.ticket = result.response.ticket;
            monerisStart(this.ticket);
        });
    }

    @HostListener('window:monerisEvent',['$event.detail'])
    monerisEvent(detail:any){
        const responseObj = JSON.parse(detail);
        //console.log("EventResponseObj: "+JSON.stringify(responseObj));

        switch(responseObj.handler){
            case "cancel_transaction":
                break;
            case "error_event":
                break;
            case "payment_receipt":
                // Send request to server to get payment receipt data
                this.monerisService.receiptRequest(responseObj.ticket).subscribe(result=>{
                    console.log("PaymentReceipt Result: "+JSON.stringify(result));
                });
                break;
            case "payment_complete":
                window.location.reload();
                break;
            case "page_closed":
                break;
            case "payment_submitted":
                break;
            default:
                break;
        }

    }
}
