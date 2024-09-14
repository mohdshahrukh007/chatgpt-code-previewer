export async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });
  
    return tabs[0];
}


export function waitForElement(selector, callback) {
    const observer = new MutationObserver((mutationsList, observer) => {
        const targetElement = document.querySelector(selector);
        if (targetElement) {
            observer.disconnect();
            callback(targetElement);
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
