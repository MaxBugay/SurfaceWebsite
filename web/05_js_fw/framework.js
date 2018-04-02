/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function makeFramework(contentID, snip, success, error) {
    
    var contentObj = {};
    contentObj.divID = contentID;
    contentObj.placeContent = function(snip) {
        document.getElementById(contentObj.divID).innerHTML = snip;
    };
    
    function ajaxCall(url, successFn, errorFn) {

        var httpReq;
        if (window.XMLHttpRequest) {
            httpReq = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            httpReq = new ActiveXObject("Microsoft.XMLHTTP");         //For IE 5+
        } else {
            alert('ajax not supported');
        }

        function sendRequest() {
            httpReq.open("GET", url);
            httpReq.onreadystatechange = handleResponse;
            httpReq.send(null);
        }

        function handleResponse() {
        if (httpReq.readyState === 4) {
            if (httpReq.status === 200) {
                var response = httpReq.responseText;
                successFn(response);
            } else {
                errorFn(httpReq);
            }
        }
    }
        sendRequest();
    };
    ajaxCall(snip, success, error);
    return contentObj;
}

