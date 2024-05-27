
(() => {
  
  var newDiv = null
  var CodeBoxlength = null
  var CodeSnippetLength = null
  var Last_CodeSnippet = null
  var  isOpen = true;
  var iframeDocument =null
  

  const closeDialoguesfn=()=>{
    const iframe = document.getElementById('IframeId');
    iframe.width = isOpen ? '60px' : '400px';
    isOpen = !isOpen;
  }

  // order2
  function AllinOneConverter(languages){
    let combinedHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ChatGPT code previewer</title>
     <style> ${languages.CSS}</style>
    </head>
    <body>
    ${languages.HTML}
    <script type="text/javascript" >
    ${languages.JS}</script>
    </body>
    </html>`;
    Last_CodeSnippet = combinedHTML
    showLatestUI(Last_CodeSnippet);
   }

  function makecontentEditable(){
  }
  //  order1
  function prepareUiBox(){
    if(!document.getElementById('MydivContainer')){
      newDiv = document.createElement('div');
      newDiv.id="MydivContainer"
    }
     CodeSnippetLength = document.getElementsByClassName('!whitespace-pre')?.length
     let hL = document.getElementsByClassName('!whitespace-pre hljs language-html').length
     let cssL = document.getElementsByClassName('!whitespace-pre hljs language-css').length
     let jsL = document.getElementsByClassName('!whitespace-pre hljs language-js').length
     var HTML  = document.getElementsByClassName('!whitespace-pre hljs language-html')[hL-1]?.innerHTML || document.getElementsByClassName('!whitespace-pre language-html')[hL]?.innerHTML
      var CSS =  document.getElementsByClassName('!whitespace-pre hljs language-css')[cssL-1]?.innerHTML || document.getElementsByClassName('!whitespace-pre language-css ')[cssL]?.innerHTML 
     var JS =    document.getElementsByClassName('!whitespace-pre hljs language-js')[jsL-1]?.innerHTML || document.getElementsByClassName('!whitespace-pre language-javascript')[jsL]?.innerHTML 
     HTML=  (CSS || JS)? getBodyWithoutScript(HTMLbodyParser(HTML)):HTMLbodyParser(HTML);
     if(HTML==undefined || !HTML ){
      HTML =  'No HTML code Preview Available. Please add ALL In HTML Code in the prompt.';
  }
     CSS= HTMLbodyParser(CSS);
      JS= HTMLbodyParser(JS);
     AllinOneConverter({HTML , CSS ,JS})
    } 
    function getBodyWithoutScript(html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const body = doc.body;
      const scripts = body.querySelectorAll('script') || [];
      scripts.forEach(script => script.remove());
      return body.innerHTML;
  }
  
 function HTMLbodyParser(data){
      let preHTML =  new DOMParser().parseFromString(data, 'text/html')?.body?.innerHTML.replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')?.replace(/<span[^>]*>|<\/span>/g, '');
   return preHTML=="undefined"?undefined:preHTML;
    }
  
    // order3
  function showLatestUI(){
    // getAgentBox();
    newDiv.textContent = Last_CodeSnippet?.replace('/&gt/g','');
    if (CodeSnippetLength!=0) {
     
    var newCode = Last_CodeSnippet
      try {
        var doc = document.getElementById('IframeId')?.contentWindow.document.getElementById('uiShowDiv');
          doc.innerHTML = newCode;
      } catch (error) {
        var doc = document.getElementById('IframeId')?.contentWindow.document.getElementById('uiShowDiv');
          doc.innerHTML = 'No code Preview Available. Please add ALL In HTML Code in the prompt.';
      }
    }else{
      var doc = document.getElementById('IframeId')?.contentWindow.document.getElementById('uiShowDiv');
    doc.innerHTML = `<div style="max-width: 800px; margin: 50px auto; text-align: center;">
    <h3> No code Preview Available. Please  prompt </h3>
    <h1 style="font-size: 36px; color: #333; background-color: #f8f8f8; 
    padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    
    HTML / CSS / CODE
    </h1>
  </div>`;
    }
  }
  const CustomListnerForEnter = () =>{
  var sendButton = document.querySelector('[data-testid="send-button"]') || document.getElementsByClassName('mb-1 mr-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary')[0];
  if(sendButton){
    sendButton.addEventListener('click', function(event) {
      showLatestUI();
    });
    }
  }
  var iframe;
  var closeDialogues=null
  var fullscreenWindow=null
var isfullscreen=false;
    const iframeDiv=()=>{
      // created frame
       iframe = document.createElement('iframe');
      iframe.src = "about:blank";
      iframe.width = '400';
      iframe.className = 'IframeClass';
      iframe.id = 'IframeId';
      iframe.height = '700vh';
      iframe.style.color = 'black';
      // Find the container element in the DOM where you want to inject the iframe
      if (document.querySelector('.relative.z-0.flex.h-full.w-full.overflow-hidden')) {
        document.querySelector('.relative.z-0.flex.h-full.w-full.overflow-hidden').appendChild(iframe);
       } else {
       }
       iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

       //aadding close icon 
        closeDialogues = document.createElement("button");
       closeDialogues.setAttribute("id", "closeDialogues");
       closeDialogues.setAttribute("class", "close-button");
       closeDialogues.innerHTML = "&times;"; // Add the cross mark as button content
       closeDialogues.addEventListener('click', ()=>{closeDialoguesfn();})
       closeDialogues.style = `
       background-color: black;
       color:white;
       z-index:2;
       border-radius: 500px;
       cursor: pointer;
       padding: 10px 15px;
       position: absolute;
       top: 10px;
       right: 1px;`
 
       let middleSpan   = document.createElement("span")
       middleSpan.style =`
       color:white;
       top:25px;
        background:#333;
        position: absolute;
        top: 5%;
        text-align:center; 
        width:70%;
        left: 50%;
        padding:9px;
        transform: translate(-50%, -50%);
        `;
middleSpan.innerHTML='HTML/CSS/JS Preview '

       // add full screen btn which will increase frame.width on click
       fullscreenWindow = document.createElement('button');
       fullscreenWindow.innerHTML ='&#x26F6;'
       fullscreenWindow.style=`
       background-color: black;
       color:white;
       border-radius: 500px;
       cursor: pointer;
       padding: 10px 15px;
       position: absolute;
       top: 10px;
       left:0;
       font-size:'23';`
       fullscreenWindow.addEventListener('click',()=>{
        isfullscreen?iframe.width='1024':iframe.width='400';
        isfullscreen=!isfullscreen

       })
 
  // div inside frames
      var div = iframeDocument.createElement('div');
      div.className = 'uiShowDiv';
      div.id = 'uiShowDiv'; 
      div.style.padding = '20px';
      div.style.color='black'
      div.style.marginTop='46px'
      // Append the div to the iframe's document body
      iframeDocument.body.append(closeDialogues);
      iframeDocument.body.append(middleSpan);
      iframeDocument.body.append(fullscreenWindow);
      iframeDocument.body.appendChild(div);
    } 

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
      CustomListnerForEnter();
      if(!document.getElementsByClassName('IframeClass').length || !document.getElementsByClassName('IframeClass')){
        iframeDiv()
      }
      setInterval(prepareUiBox,5000)
  
    });
  })();
   