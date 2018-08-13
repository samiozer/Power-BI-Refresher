
var activeTabId = null;



var func = function (timer, tabid1, test) {
    if (test != 1) {
        activeTabId = tabid1;
        var obj = {};
        localStorage["" + activeTabId] = timer;

    }
    var refresh = document.getElementsByClassName('refresh'); 
    if (!refresh === false)
        $(refresh).click();

    var moreOptionsItem = document.getElementById('moreOptionsItem'); 
    if (!moreOptionsItem === false) {
        var refreshDashboard = $(moreOptionsItem).children()[3];
        if (!refreshDashboard === false)
            $(refreshDashboard).click();
    }

    setTimeout(function () {

        if (!localStorage["" + activeTabId] === false && localStorage["" + activeTabId] != "null")
            func(timer, tabid1, 1);

    }, timer * 1000);
};

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        debugger;
        if (request.msg == "timeron") func(request.timer, request.tabid);
        if (request.msg == "timeroff") { localStorage["" + activeTabId] = null; };
        if (request.msg == "iamready") {
            debugger;
            var refresh = document.getElementsByClassName('refresh');
            var moreOptionsItem = document.getElementById('moreOptionsItem'); 
            if (!moreOptionsItem === false) {
                var refreshDashboard = $(moreOptionsItem).children()[3];
                
            }
            if ((!refresh || refresh.length < 1) && (!refreshDashboard)) sendResponse(false); else sendResponse(true);
        } else sendResponse(null);
    }
);

chrome.runtime.sendMessage({});
