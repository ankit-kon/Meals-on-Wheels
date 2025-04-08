// review.js
function showReviewPage() {
    const section = document.createElement("div");
    section.id = "review-section";
    section.className = "fixed inset-0 bg-white flex items-center justify-center";
    section.innerHTML = `
      <div class="p-6 max-w-md w-full text-center">
        <h2 class="text-xl font-bold mb-3">Leave a Review</h2>
        <textarea id="reviewText" class="w-full p-2 border rounded mb-3" rows="4" placeholder="How was your meal?"></textarea>
        <button onclick="submitReview()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit Review</button>
      </div>
    `;
    document.body.appendChild(section);
  }
  
  async function submitReview() {
    const review = document.getElementById("reviewText").value.trim();
    await db.collection("transactions").add({
      pnr: pnrNumber,
      items: cart,
      passenger: passengerInfo,
      review: review,
      total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      timestamp: new Date()
    });
  
    document.getElementById("review-section").remove();
    const thanks = document.createElement("div");
    thanks.className = "fixed inset-0 bg-white flex items-center justify-center";
    thanks.innerHTML = `<h1 class="text-3xl font-bold text-green-600">🎉 Thank You for Your Order!</h1>`;
    document.body.appendChild(thanks);
    setTimeout(() => thanks.remove(), 4000);
    cart.length = 0;
    renderCart();
  }
  
  window.showReviewPage = showReviewPage;
  