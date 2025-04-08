// payment.js
async function proceedToPayment() {
    const input = document.getElementById("pnrInput").value.trim();
    if (input.length !== 10) return alert("Enter valid 10-digit PNR");
    const doc = await db.collection("pnrs").doc(input).get();
    if (!doc.exists) return alert("PNR not found");
  
    pnrNumber = input;
    passengerInfo = doc.data();
    showPaymentPage();
    document.getElementById("pnr-modal").classList.add("hidden");
  }
  
  function showPaymentPage() {
    const section = document.createElement("div");
    section.id = "payment-section";
    section.className = "fixed inset-0 bg-white p-8";
    section.innerHTML = `
      <h2 class="text-2xl font-bold mb-4">Passenger Details & Payment</h2>
      <div id="passenger-details" class="mb-4 text-gray-700">
        <p><strong>Name:</strong> ${passengerInfo.name}</p>
        <p><strong>Train:</strong> ${passengerInfo.train}</p>
        <p><strong>Seat:</strong> ${passengerInfo.seat}</p>
      </div>
      <h3 class="font-semibold mb-2">Order Summary</h3>
      <div id="order-summary" class="space-y-2 mb-4">
        ${cart.map(item => `<p>${item.name} x ${item.qty} = ₹${item.qty * item.price}</p>`).join("")}
      </div>
      <button onclick="completePayment()" class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">Simulate Payment ✅</button>
    `;
    document.body.appendChild(section);
  }
  
  function completePayment() {
    document.getElementById("payment-section").remove();
    showReviewPage();
  }
  
  window.proceedToPayment = proceedToPayment;
  