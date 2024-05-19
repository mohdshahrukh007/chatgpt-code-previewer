import { getActiveTabURL } from "./utils.js";
 

document.addEventListener("DOMContentLoaded", async () => {
  checkURL();
});
function checkURL() {
  const activeTab = getActiveTabURL();
  if (activeTab.url.includes("chatgpt")) {
  } else {
    const container = document.body
    if (container) {
      container.innerHTML = '<div class="title">This is not a ChatGPT page.</div>';
    }
  }
}
 
// setInterval(checkURL, 1000); // Adjust the interval as needed


