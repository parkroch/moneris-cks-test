function monerisStart(ticket){
    var myCheckout = new monerisCheckout();
    myCheckout.setMode("qa");
    myCheckout.setCheckoutDiv("monerisCheckout");

    myCheckout.setCallback("page_loaded", myPageLoad);
    myCheckout.setCallback("cancel_transaction", myCancelTransaction);
    myCheckout.setCallback("error_event", myErrorEvent);
    myCheckout.setCallback("payment_receipt", myPaymentReceipt);
    myCheckout.setCallback("payment_complete", myPaymentComplete);
    myCheckout.setCallback("page_closed", myPageClosed);
    myCheckout.setCallback("payment_submitted", myPaymentSubmitted);

    myCheckout.startCheckout(ticket);

    function myPageLoad(result){
        console.log("myPageLoad "+result);
    }

    function myCancelTransaction(result){
        console.log("myCancelTransaction "+result);
        monerisEventCall(result);
    }

    function myErrorEvent(result){
        console.log("myErrorEvent "+result);
        monerisEventCall(result);
    }

    function myPaymentReceipt(result){
        console.log("myPaymentReceipt "+result);
        monerisEventCall(result);
    }

    function myPaymentComplete(result){
        console.log("myPaymentComplete "+result);
        monerisEventCall(result);
        closeCheckout(result);
    }

    function myPageClosed(result){
        console.log("myPageClosed "+result);
        monerisEventCall(result);
    }

    function myPaymentSubmitted(result){
        console.log("myPaymentSubmitted "+result);
        monerisEventCall(result);
    }

    function monerisEventCall(result){
        var event = new CustomEvent('monerisEvent',{
            detail: result
        });
        window.dispatchEvent(event);
    }

    function closeCheckout(result){
        var detail = JSON.parse(result);
        myCheckout.closeCheckout(detail.ticket);
    }
}