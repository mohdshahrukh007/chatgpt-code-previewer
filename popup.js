let radioFlag=true;
document.getElementById("triggerMethodBtn").addEventListener("click", function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "activeMode" }, function(response) {
          radioFlag = response.reply
      });
  });
});
