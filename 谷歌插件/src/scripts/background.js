import ext from "./utils/ext";

ext.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('----------------')
    console.log(request)
    alert(request)
    console.log('----------------')
    if(request.action === "perform-save") {
      console.log("Extension Type: ", "/* @echo extension */");
      console.log("PERFORM AJAX", request.data);

      sendResponse({ action: "saved" });
    }
  }
);


// chrome.tabs.onUpdated.addListener(
//   function(tabId,info,tab){
//     if(info.status==="complete")
//       console.log("complete")
//       chrome.tabs.sendMessage(tabId, {greeting: "inupdate"}, function(response) {
//       console.log(response);
//     });
//   }
// )