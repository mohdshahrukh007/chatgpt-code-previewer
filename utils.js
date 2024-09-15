function ArrowButton(callback) {
    const parentElement = document.querySelector('[data-testid="profile-button"]');
  
    // Create a container div for proper spacing and hover effect
    const buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'relative'; // For positioning tooltip
    buttonContainer.style.display = 'inline-block'; // Adjusts layout
    buttonContainer.style.cursor = 'pointer';
    buttonContainer.style.padding = '10px 20px'; // Add left-right spacing
    buttonContainer.style.transition = 'transform 0.3s ease'; // For hover effect
  
    // Create the SVG element using the appropriate namespace
    const svgNS = "http://www.w3.org/2000/svg";
    const svgElement = document.createElementNS(svgNS, "svg");
    svgElement.setAttribute("width", "24");
    svgElement.setAttribute("height", "24");
    svgElement.setAttribute("viewBox", "0 0 24 24");
    svgElement.setAttribute("fill", "none");
    svgElement.setAttribute("stroke", "currentColor");
    svgElement.setAttribute("stroke-width", "2");
    svgElement.setAttribute("stroke-linecap", "round");
    svgElement.setAttribute("stroke-linejoin", "round");
  
    // Create the line element (for the arrow body)
    const lineElement = document.createElementNS(svgNS, "line");
    lineElement.setAttribute("x1", "5");
    lineElement.setAttribute("y1", "12");
    lineElement.setAttribute("x2", "19");
    lineElement.setAttribute("y2", "12");
  
    // Create the polyline element (for the arrowhead)
    const polylineElement = document.createElementNS(svgNS, "polyline");
    polylineElement.setAttribute("points", "12 5 19 12 12 19");
  
    // Append the line and polyline elements to the SVG
    svgElement.appendChild(lineElement);
    svgElement.appendChild(polylineElement);
  
    // Append the SVG to the button container
    buttonContainer.appendChild(svgElement);
  
    // Create a text label that appears on hover
    const tooltip = document.createElement('span');
    tooltip.textContent = 'Show Previewer Bar';
    tooltip.style.position = 'absolute';
    tooltip.style.bottom = '100%';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.backgroundColor = '#000';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.fontSize = '12px';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.visibility = 'hidden'; // Hidden by default
    tooltip.style.opacity = '0'; // For smooth fade-in/out effect
    tooltip.style.transition = 'opacity 0.3s ease'; // Smooth transition
  
    // Append the tooltip to the button container
    buttonContainer.appendChild(tooltip);
  
    // Show the tooltip on hover
    buttonContainer.addEventListener('mouseenter', () => {
      tooltip.style.visibility = 'visible';
      tooltip.style.opacity = '1';
    });
  
    // Hide the tooltip when not hovering
    buttonContainer.addEventListener('mouseleave', () => {
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '0';
    });
  
    // Add hover effect to move the arrow to the right
    buttonContainer.addEventListener('mouseenter', () => {
      buttonContainer.style.transform = 'translateX(10px)'; // Move right on hover
    });
  
    buttonContainer.addEventListener('mouseleave', () => {
      buttonContainer.style.transform = 'translateX(0)'; // Reset position
    });
  
    // Make the button clickable
    buttonContainer.addEventListener('click', () => {
        callback();
    });
  
    // Append the button container to the parent element
    parentElement.appendChild(buttonContainer);
  }
  