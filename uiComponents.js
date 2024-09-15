// uiComponents.js

export function createCloseButton(closeHandler) {
    const button = document.createElement("button");
    button.id = "closeDialogues";
    button.className = "close-button";
    button.innerHTML = "&times;";
    button.style.cssText = `
      background-color: black;
      color: white;
      z-index: 2;
      border-radius: 50%;
      cursor: pointer;
      padding: 10px 15px;
      position: absolute;
      top: 10px;
      right: 1px;
    `;
    button.addEventListener("click", closeHandler);
    return button;
  }
  
  export function createFullscreenButton(toggleFullscreen) {
    const button = document.createElement("button");
    button.innerHTML = "&#x26F6;";
    button.style.cssText = `
      background-color: black;
      color: white;
      border-radius: 50%;
      cursor: pointer;
      padding: 10px 15px;
      position: absolute;
      top: 10px;
      left: 0;
      font-size: 23px;
    `;
    button.addEventListener("click", toggleFullscreen);
    return button;
  }
  
  export function createMiddleSpan(text) {
    const span = document.createElement("span");
    span.style.cssText = `
      color: white;
      background: #333;
      position: absolute;
      top: 5%;
      text-align: center;
      width: 70%;
      left: 50%;
      padding: 9px;
      transform: translate(-50%, -50%);
    `;
    span.textContent = text;
    return span;
  }
  
  export function ArrowButton(clickHandler) {
    const button = document.createElement("button");
    button.id = "arrowButton";
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: black;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 35px;
      cursor: pointer;
      transition: transform 0.3s ease;
    `;
  
    // Add the arrow SVG
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
  
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", "5");
    line.setAttribute("y1", "12");
    line.setAttribute("x2", "19");
    line.setAttribute("y2", "12");
  
    const polyline = document.createElementNS(svgNS, "polyline");
    polyline.setAttribute("points", "12 5 19 12 12 19");
  
    svg.appendChild(line);
    svg.appendChild(polyline);
  
    button.appendChild(svg);
    button.addEventListener("click", clickHandler);
  
    // Hover effect
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateX(10px)";
    });
    button.addEventListener("mouseleave", () => {
      button.style.transform = "translateX(0)";
    });
  
    return button;
  }
  