

chrome.tabs.onActiveChanged.addListener(function (tabId, info) {runTabActivate(tabId);});

var runTabActivate = function (tabId) {
    var activeTabId = tabId;
    debugger;
    chrome.tabs.sendMessage(
        activeTabId,
        { msg: "iamready", tabid: activeTabId },
        function (response) {
            if (response) {
                debugger;

                if (!localStorage[activeTabId] || localStorage[activeTabId] === "null") {
                    chrome.browserAction.setIcon({ path: 'icon.png' });
                    //chrome.browserAction.enable(activeTabId);
                } else {
                    chrome.browserAction.setIcon({ path: 'iconactive.png' });
                    //chrome.browserAction.enable(activeTabId);
                }
            } else {
                //chrome.browserAction.disable(activeTabId);
                chrome.browserAction.setIcon({ path: 'icon.png' });
            }
        });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {runTabActivate(sender.tab.id);});



