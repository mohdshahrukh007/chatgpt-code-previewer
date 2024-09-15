// iframeManager.js

export function createIframe() {
    const iframe = document.createElement("iframe");
    iframe.src = "about:blank";
    iframe.width = "400";
    iframe.className = "IframeClass";
    iframe.id = "IframeId";
    iframe.height = "700vh";
    iframe.style.color = "black";
    iframe.style.background = "white";
    return iframe;
  }
  
  export function appendIframeToDOM(iframe) {
    const container = document.querySelector(".relative.z-0.flex.h-full.w-full.overflow-hidden");
    if (container) {
      container.appendChild(iframe);
    }
  }
  
  export function getIframeDocument(iframe) {
    return iframe.contentDocument || iframe.contentWindow.document;
  }
  