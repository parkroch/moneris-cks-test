function monerisStart(ticket){
    var myCheckout = new monerisCheckout();
    myCheckout.setMode("qa");
    myCheckout.setCheckoutDiv("monerisCheckout");

    myCheckout.setCallback("page_loaded", myPageLoad);
    myCheckout.setCallback("cancel_transaction", myCancelTransaction);
    myCheckout.setCallback("error_event", myErrorEvent);
    myCheckout.setCallback("payment_receipt", myPaymentReceipt);
    myCheckout.setCallback("payment_complete", myPaymentComplete);

    myCheckout.startCheckout(ticket);

    function myPageLoad(result){
        console.log("myPageLoad "+result);
    }

    function myCancelTransaction(result){
        console.log("myCancelTransaction "+result);
    }

    function myErrorEvent(result){
        console.log("myErrorEvent "+result);
    }

    function myPaymentReceipt(result){
        console.log("myPaymentReceipt "+result);
    }

    function myPaymentComplete(result){
        console.log("myPaymentComplete "+result);
        location.reload();
    }
}
