// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/* chrome.tabs.executeScript(null,
{code:"document.body.style.backgroundColor='" + e.target.id + "'"});*/

function doInCurrentTab(tabCallback) {
  chrome.tabs.query(
    { currentWindow: true, active: true },
    function (tabArray) { tabCallback(tabArray[0]); }
  );
}
var activeTabId;
doInCurrentTab(function (tab) { activeTabId = tab.id });

function start(e) {
  

  var startBtn = document.getElementById('startBtn');
  var stopBtn = document.getElementById('stopBtn');
  var timer = 0;

  var timerInput = document.getElementById('timerInput');
  timer = !timerInput.value ? 60 : parseInt(timerInput.value);
  timerInput.value = !timerInput.value ? 60 : parseInt(timerInput.value);

  if (timer < 1)
    timer = 60;

  localStorage[activeTabId] = timer;
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { msg: "timeron", timer: timer, tabid: tabs[0].id },
      function (response) {
        chrome.browserAction.setIcon({path: 'iconactive.png'});
        window.close();
      });
  });

  
}


function stop(e) {
  var startBtn = document.getElementById('startBtn');
  var stopBtn = document.getElementById('stopBtn');
  localStorage[activeTabId] = null;
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { msg: "timeroff" },
      function (response) {
        chrome.browserAction.setIcon({path: 'icon.png'});
      window.close();
      });
  });

  
}



document.addEventListener('DOMContentLoaded', function () {


  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    activeTabId = tabs[0].id
    var tableForm = document.getElementById('tableForm');
    var message = document.getElementById('message');

    chrome.tabs.sendMessage(
      activeTabId,
      { msg: "iamready" },
      function (response) {
        if (response) {
          $(tableForm).show();
          $(message).hide();
          $(message).val("");

          var startBtn = document.getElementById('startBtn');
          var stopBtn = document.getElementById('stopBtn');
          startBtn.addEventListener('click', start);
          stopBtn.addEventListener('click', stop);

          var timerInput = document.getElementById('timerInput');
          $(timerInput).jStepper({ minValue: 1, maxValue: 2700000, minLength: 1 });
          if (!localStorage[activeTabId] || localStorage[activeTabId] === "null") {

            $(startBtn).prop("disabled", false);
            $(stopBtn).prop("disabled", true);
            
          } else {

            timerInput.value = localStorage[activeTabId];
            $(startBtn).prop("disabled", true);
            $(stopBtn).prop("disabled", false);
            
          }

        } else {
          $(tableForm).hide();
          $(message).show();
          $(message).val("Power BI refresh button not found!!");
          // alert("Power bi refresh button not found!!");
        }
      });
  });
});



