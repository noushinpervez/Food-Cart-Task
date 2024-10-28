// Select the mobile menu button
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

// Add event listener to the button
btn.addEventListener("click", () => {
  // Toggle the 'hidden' class on the mobile menu
  menu.classList.toggle("hidden");
});

// Dropdown functionality
const dropdownButton = document.getElementById("dropdown-button");
const dropdownMenu = document.getElementById("dropdown-menu");

dropdownButton.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
});

// Sidebar and cart management
const cartSidebar = document.getElementById("cartSidebar");
const cartItemsContainer = document.getElementById("cartItems");
const itemCountDisplay = document.getElementById("itemCount");
const totalAmountDisplay = document.getElementById("totalAmount");

let cartItems = [];

// Function to toggle the sidebar
function toggleSidebar() {
  cartSidebar.classList.toggle("translate-x-full");
}

// Function to add or remove item from cart and update button state
function addToCart(itemName, itemPrice, itemImage, buttonElement) {
  // Check if item already exists in the cart
  const existingItem = cartItems.find(item => item.name === itemName);

  if (existingItem) {
    // Remove item from cart
    cartItems = cartItems.filter(item => item.name !== itemName);
    buttonElement.classList.remove("bg-disabled");
    buttonElement.classList.add("bg-primary");
    buttonElement.innerText = "Add to Order";
  } else {
    // Add item to cart
    cartItems.push({ name: itemName, price: itemPrice, image: itemImage, quantity: 1 });
    buttonElement.classList.add("bg-disabled");
    buttonElement.classList.remove("bg-primary");
    buttonElement.innerText = "Added to Cart";
  }

  updateCart();
  updateButtonState();
  // Open the sidebar if there are items in the cart
  if (cartItems.length > 0) {
    cartSidebar.classList.remove("translate-x-full");
  } else {
    cartSidebar.classList.add("translate-x-full");
  }
}

// Function to increase or decrease item quantity
function changeQuantity(itemName, delta) {
  const item = cartItems.find(item => item.name === itemName);
  if (!item) return;

  item.quantity += delta;

  // Remove item if quantity falls below 1
  if (item.quantity < 1) {
    cartItems = cartItems.filter(i => i.name !== itemName);
  }

  updateCart();
}

// Function to render cart items in the sidebar
function updateCart() {
  cartItemsContainer.innerHTML = ""; // Clear existing items

  let totalAmount = 0;
  cartItems.forEach(item => {
    totalAmount += item.price * item.quantity;

    const itemElement = document.createElement("div");
    itemElement.classList.add("flex", "justify-between", "items-center", "border-2", "p-1.5", "rounded-md");

    itemElement.innerHTML = `
      <div class="relative flex items-center space-x-2 w-full">
        <button class="absolute -top-3 -right-2.5 bg-light text-primary text-xs font-bold p-1 rounded-md" onclick="removeFromCart('${item.name}')">
          <svg width="16" height="16" viewBox="-0.5 0 19 19" fill="#eb4f3e" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.91666667,14.8888889 C4.91666667,15.3571429 5.60416667,16 6.0625,16 L12.9375,16 C13.3958333,16 14.0833333,15.3571429 14.0833333,14.8888889 L14.0833333,6 L4.91666667,6 L4.91666667,14.8888889 L4.91666667,14.8888889 L4.91666667,14.8888889 Z M15,3.46500003 L12.5555556,3.46500003 L11.3333333,2 L7.66666667,2 L6.44444444,3.46500003 L4,3.46500003 L4,4.93000007 L15,4.93000007 L15,3.46500003 L15,3.46500003 L15,3.46500003 Z" id="path" fill="#eb4f3e" sketch:type="MSShapeGroup">
          </svg>
        </button>
        <img src="${item.image}" alt="${item.name}" class="w-16 h-24 rounded-md object-cover">
        <div class="flex flex-col w-full">
          <p class="font-semibold text-sm">${item.name}</p>
          <p class="text-[10px]">${item.price}$ / each</p>
          <div class="flex items-center mt-3">
            <button onclick="changeQuantity('${item.name}', -1)" class="bg-headerBg text-disabled px-2 py-1 rounded-l">-</button>
            <span class="bg-light text-disabled text-sm px-3 py-0.5">${item.quantity}</span>
            <button onclick="changeQuantity('${item.name}', 1)" class="bg-headerBg text-disabled px-2 py-1 rounded-r">+</button>
          </div>
        </div>
        <p class="font-bold text-sm self-end text-right -mb-1.5">${(item.price * item.quantity)}$</p>
      </div>
    `;
    cartItemsContainer.appendChild(itemElement);
  });

  // Update the displayed item count and total amount
  itemCountDisplay.innerText = cartItems.length;
  totalAmountDisplay.innerText = totalAmount;
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
  // Filter out the item from the cart
  cartItems = cartItems.filter(item => item.name !== itemName);

  // Update the cart after removal
  updateCart();

  // Close the sidebar if the cart is empty
  if (cartItems.length === 0) {
    cartSidebar.classList.add("translate-x-full");
  }

  // Update the Add to Order button styles
  updateButtonState(itemName);
}

// Function to update button state based on cart items
function updateButtonState(itemName) {
  // Get all the buttons in the card components
  const buttons = document.querySelectorAll('button[aria-label^="Add"]');

  buttons.forEach(button => {
    // Check if the button corresponds to the item name
    if (button.getAttribute('aria-label').includes(itemName)) {
      button.classList.remove("bg-disabled");
      button.classList.add("bg-primary");
      button.innerText = "Add to Order";
    }
  });
}