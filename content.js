// Function to convert and update prices
function convertPrices(conversionRate) {
  const priceElements = document.querySelectorAll(".chakra-text.css-tw2jx4");

  if (priceElements.length > 0) {
    for (let element of priceElements) {
      const bdtText = element.textContent.match(/(\d+(\.\d{1,2})?)\s*BDT/);
      if (bdtText && bdtText[1]) {
        const bdtAmount = parseFloat(bdtText[1]);
        if (!isNaN(bdtAmount)) {
          const qarAmount = (bdtAmount * conversionRate).toFixed(2);
          element.textContent = element.textContent.replace(
            bdtText[0],
            `${bdtText[0]} # ${qarAmount} QAR`
          );
        } else {
          console.error("Invalid BDT amount found.");
        }
      } else {
        console.error("BDT amount not found.");
      }
    }
  } else {
    console.error("Ticket prices elements not found.");
  }
}

// Get the conversion rate from storage
chrome.storage.sync.get("conversionRate", ({ conversionRate }) => {
  if (!conversionRate) {
    console.error("Conversion rate not set.");
    return;
  }

  // Initial conversion on page load
  convertPrices(conversionRate);

  // Create a MutationObserver to watch for changes in the DOM
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      convertPrices(conversionRate);
    });
  });

  // Start observing the document body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
