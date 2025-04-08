// main.js
const firebaseConfig = {
    apiKey: "AIzaSyDN2T8z9fILTmLE7AfIUTEZUZDcJc5lyWo",
    authDomain: "meals-on-wheels-4d406.firebaseapp.com",
    databaseURL: "https://meals-on-wheels-4d406-default-rtdb.firebaseio.com",
    projectId: "meals-on-wheels-4d406",
    storageBucket: "meals-on-wheels-4d406.appspot.com",
    messagingSenderId: "839338162117",
    appId: "1:839338162117:web:32ba607a2f92328d4bfdac",
    measurementId: "G-4CFY6T113P"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  const mealList = document.getElementById("meal-list");
  const cartDiv = document.getElementById("cart");
  const pnrModal = document.getElementById("pnr-modal");
  
  let cart = [];
  let pnrNumber = "";
  let passengerInfo = {};
  
  function renderMeals(meals) {
    mealList.innerHTML = "";
    meals.forEach(meal => {
      const card = document.createElement("div");
      card.className = "bg-white rounded shadow p-4 flex flex-col";
      card.innerHTML = `
        <img src="${meal.image}" class="h-40 object-cover rounded mb-3" />
        <h3 class="text-lg font-semibold">${meal.name}</h3>
        <p>₹${meal.price}</p>
        <button class="bg-blue-600 text-white mt-auto px-3 py-2 rounded hover:bg-blue-700" onclick='addToCart(${JSON.stringify(meal)})'>Add to Cart</button>
      `;
      mealList.appendChild(card);
    });
  }
  
  async function loadMeals() {
    const snapshot = await db.collection("meals").get();
    const meals = snapshot.docs.map(doc => doc.data());
    renderMeals(meals);
  }
  
  function addToCart(meal) {
    const index = cart.findIndex(m => m.name === meal.name);
    if (index > -1) cart[index].qty += 1;
    else cart.push({ ...meal, qty: 1 });
    renderCart();
  }
  
  function updateQty(index, change) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    renderCart();
  }
  
  function renderCart() {
    cartDiv.innerHTML = "";
    let total = 0;
    cart.forEach((item, i) => {
      total += item.price * item.qty;
      const row = document.createElement("div");
      row.className = "flex justify-between items-center border-b pb-2";
      row.innerHTML = `
        <span>${item.name} (₹${item.price})</span>
        <div class="flex items-center">
          <button onclick="updateQty(${i}, -1)" class="px-2">➖</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${i}, 1)" class="px-2">➕</button>
        </div>
      `;
      cartDiv.appendChild(row);
    });
    if (cart.length) {
      const totalDiv = document.createElement("div");
      totalDiv.className = "text-right font-bold mt-2";
      totalDiv.innerText = `Total: ₹${total}`;
      cartDiv.appendChild(totalDiv);
    } else {
      cartDiv.innerHTML = "<p class='text-gray-500'>Cart is empty.</p>";
    }
  }
  
  function openPNRModal() {
    if (!cart.length) return alert("Cart is empty!");
    pnrModal.classList.remove("hidden");
  }
  
  function closePNRModal(e) {
    pnrModal.classList.add("hidden");
  }
  
  window.loadMeals = loadMeals;
  window.openPNRModal = openPNRModal;
  window.closePNRModal = closePNRModal;
  window.addToCart = addToCart;
  window.updateQty = updateQty;
  window.cart = cart;
  window.renderCart = renderCart;
  window.db = db;
  
  loadMeals();
  