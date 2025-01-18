chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startAnalysis") {
    // Fetch JSON data (simulate here)
    let jsonData = [
      {
        title: "Missing lang attribute in html element",
        correctedCode: new Function("e",`
          const htmlElement = document.querySelector('html');
          if (!htmlElement.hasAttribute('lang')) {
              htmlElement.setAttribute('lang', 'en'); // Replace 'en' with the appropriate language code
              console.log('Lang attribute added to <html>: en');
          }
        `),
      },
    ];
    sendResponse({ success: true, data: jsonData });
  }
});