chrome.tabs.onUpdated.addListener((tabId, changeInfo,tab) => {
  if (changeInfo.status === 'complete') {
    // Re-inject content script
    // chrome.tabs.onUpdated(tabId, { file: 'content.js' });
}

  if (tab.url && tab.url.includes("chatgpt.com")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    });
  }
});

