document.getElementById("save-rate").addEventListener("click", () => {
  const conversionRate = document.getElementById("conversion-rate").value;

  if (conversionRate) {
    chrome.storage.sync.set(
      { conversionRate: parseFloat(conversionRate) },
      () => {
        alert("Conversion rate saved successfully!");
      }
    );
  } else {
    alert("Please enter a valid conversion rate.");
  }
});
