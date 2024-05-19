
(() => {
  
var newDiv = null
var CodeBoxlength = null
var CodeSnippetLength = null
var Last_CodeSnippet = null
var  isOpen = true;
var iframeDocument =null

var closeDialogues=null
const closeDialoguesfn=()=>{
  const iframe = document.getElementById('IframeId');
  iframe.style.width = isOpen ? '60px' : '400px';
  isOpen = !isOpen;
}
 
function prepareUiBox(){
  if(!document.getElementById('MydivContainer')){
    newDiv = document.createElement('div');
    newDiv.id="MydivContainer"
  }
  //  CodeBoxlength = document.getElementsByClassName('!whitespace-pre')
   CodeSnippetLength = document.getElementsByClassName('!whitespace-pre')?.length
   Last_CodeSnippet = document.getElementsByClassName('!whitespace-pre')[CodeSnippetLength-1]?.innerHTML || document.getElementsByClassName('!whitespace-pre ')[CodeSnippetLength]?.innerHTML 
   showLatestUI();
  }

function showLatestUI(){
  newDiv.textContent = Last_CodeSnippet?.replace('/&gt/g','');
  var newCode = new DOMParser().parseFromString(Last_CodeSnippet, 'text/html')?.body?.innerHTML.replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&amp;/g, '&')?.replace(/<span[^>]*>|<\/span>/g, '');
  try {
    var doc = document.getElementById('IframeId')?.contentWindow.document.getElementById('uiShowDiv');
  } catch (error) {
      doc.innerHTML = 'No code Preview Available Please add  in prompt ALL In HTML Code ';
  }
  doc.innerHTML = newCode||'no Preview';
} 
const CustomListnerForEnter = () =>{
var sendButton = document.querySelector('[data-testid="send-button"]') || document.getElementsByClassName('mb-1 mr-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary')[0];
if(sendButton){
  sendButton.addEventListener('click', function(event) {
    console.log("shwoUI called");
    showLatestUI();
  });
  }
}
  const iframeDiv=()=>{
    // created frame
    var iframe = document.createElement('iframe');
    iframe.src = "about:blank";
    iframe.width = '400';
    iframe.className = 'IframeClass';
    iframe.style='margin-top:40px'
    iframe.style='overflow-y:scroll'
    iframe.id = 'IframeId';
    iframe.height = '700vh';

    // Find the container element in the DOM where you want to inject the iframe
    if (document.querySelector('.relative.z-0.flex.h-full.w-full.overflow-hidden')) {
      document.querySelector('.relative.z-0.flex.h-full.w-full.overflow-hidden').appendChild(iframe);
     } else {
       console.error('Target element not found!');
     }
     iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    //aadding close icon 
      closeDialogues = document.createElement("button");
     closeDialogues.setAttribute("id", "closeDialogues");
     closeDialogues.setAttribute("class", "close-button");
     closeDialogues.innerHTML = "&times;"; // Add the cross mark as button content
     closeDialogues.addEventListener('click', ()=>{closeDialoguesfn()})
     closeDialogues.style = ` style="
     background-color: black;
     border: none;
     color:'white'
     border-radius: 50%;
     cursor: pointer;
     padding: 10px 15px;
     position: absolute;
     top: 10px;
     right: 10px;`
    //end

// div inside frames
    var div = iframeDocument.createElement('div');
    div.className = 'uiShowDiv';
    div.id = 'uiShowDiv'; 
    div.style.padding = '20px';
     
    // Append the div to the iframe's document body
    iframeDocument.body.append(closeDialogues);
    iframeDocument.body.appendChild(div);
  } 

document.addEventListener("DOMContentLoaded", async () => {
});
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    CustomListnerForEnter();
    if(!document.getElementsByClassName('IframeClass').length || !document.getElementsByClassName('IframeClass')){
      iframeDiv()
    }
    setInterval(prepareUiBox,5000)

  });
})();
 