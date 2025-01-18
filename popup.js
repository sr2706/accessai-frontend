document.addEventListener("DOMContentLoaded", () => {
  const startAnalysisButton = document.getElementById("start-analysis-button");

  if (startAnalysisButton) {
    startAnalysisButton.addEventListener("click", () => {
      // Request JSON data from the background script
      chrome.runtime.sendMessage({ action: "startAnalysis" }, (response) => {
        if (response.success && response.data) {
          createButtons(response.data);
        } else {
          console.error("Failed to fetch analysis data.");
        }
      });
    });
  }

  // Function to create buttons dynamically
  function createButtons(jsonData) {
    jsonData.forEach((item, index) => {
      const button = document.createElement("button");
      button.textContent = item.title;
      button.id = `button-${index}`;
      document.body.appendChild(button);

      // Add click event listener to each button
      button.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: executeCodeInTab,
            args: [item.correctedCode], // Pass the corrected code
          });
        });
      });
    });
  }

  // Function to execute code in the active tab
  function executeCodeInTab(code) {
    try {
      // Directly execute the code in the context of the tab
      code();  // This works here because it's within the content script context
    } catch (error) {
      console.error("Error executing code:", error);
    }
  }
});
