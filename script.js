let allPlants = [];
let categories = [];
let cart = {};
let selectedCategory = 0; // Start with "All Trees" selected

function showLoading() {
  const treeList = document.getElementById("tree-list");
  treeList.innerHTML = `
    <div id="loading-spinner" class="col-span-full flex justify-center items-center">
      <span class="loading loading-dots loading-lg text-green-600"></span>
    </div>
  `;
}

function hideLoading() {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (loadingSpinner) {
    loadingSpinner.classList.add("hidden");
  }
}

function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => {
      categories = data.categories;
      displayCategories(categories);
    })
    .catch(() => {
      document.getElementById("categories").innerHTML =
        '<p class="text-red-600 text-sm md:text-base">Failed to load categories.</p>';
    });
}

function displayCategories(categories) {
  const container = document.getElementById("categories");
  container.innerHTML = "";
  categories.slice(1).forEach(cat => {
    const btn = document.createElement("button");
    btn.className =
      "category-btn block w-full text-left px-3 py-1 md:px-4 md:py-2 rounded font-normal text-gray-900 bg-transparent hover:bg-green-600 hover:text-white transition-colors cursor-pointer text-sm md:text-base";
    btn.textContent = cat.category_name;
    btn.setAttribute("data-id", cat.id);
    btn.onclick = () => handleCategoryClick(cat.id);
    container.appendChild(btn);
  });
  
  // Highlight the active category button
  updateActiveCategoryButton();
}

function handleCategoryClick(categoryId) {
  selectedCategory = categoryId;
  
  // Update active button styling
  updateActiveCategoryButton();
  
  if (categoryId === 0) {
    displayPlants(allPlants);
    return;
  }
  
  // Show loading spinner when filtering
  showLoading();
  
  setTimeout(() => {
    const catName = categories.find(c => +c.id === +categoryId)?.category_name.replace(/s$/, "") ?? "";
    const filtered = allPlants.filter(p => p.category.toLowerCase().includes(catName.toLowerCase()));
    displayPlants(filtered);
  }, 300); // Small delay to show the loading spinner
}

function updateActiveCategoryButton() {
  // Remove active class from all buttons
  const allButtons = document.querySelectorAll('.category-btn');
  allButtons.forEach(btn => {
    btn.classList.remove('bg-green-600', 'text-white');
    btn.classList.add('bg-transparent', 'text-gray-900');
  });
  
  // Add active class to selected button
  if (selectedCategory === 0) {
    document.getElementById('category-all').classList.add('bg-green-600', 'text-white');
    document.getElementById('category-all').classList.remove('bg-transparent', 'text-gray-900');
  } else {
    const selectedButton = document.querySelector(`button[data-id="${selectedCategory}"]`);
    if (selectedButton) {
      selectedButton.classList.add('bg-green-600', 'text-white');
      selectedButton.classList.remove('bg-transparent', 'text-gray-900');
    }
  }
}

function loadAllPlants() {
  showLoading();

  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => {
      allPlants = data.plants;
      displayPlants(allPlants);
    })
    .catch(() => {
      document.getElementById("tree-list").innerHTML =
        '<p class="col-span-full text-center text-red-600 text-sm md:text-base">Failed to load trees.</p>';
    });
}

function displayPlants(plants) {
  const treeList = document.getElementById("tree-list");
  treeList.innerHTML = "";
  
  if (!plants.length) {
    treeList.innerHTML = '<p class="col-span-full text-center text-red-600 text-sm md:text-base">No trees found.</p>';
    return;
  }
  
  // Check if we're showing all trees or a specific category
  const isAllTrees = selectedCategory === 0;
  
  if (isAllTrees) {
    // For "All Trees", display without gaps
    plants.forEach(plant => treeList.appendChild(createPlantCard(plant)));
  } else {
    // For specific categories, add some spacing
    plants.forEach(plant => {
      const card = createPlantCard(plant);
      card.classList.add("mb-4", "md:mb-6"); // Add bottom margin for spacing
      treeList.appendChild(card);
    });
  }
}

function createPlantCard(plant) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-xl p-3 md:p-4 shadow flex flex-col w-full max-w-xs mx-auto h-[350px] md:h-[400px]";

  card.innerHTML = `
    <img src="${plant.image}" alt="${plant.name}" class="w-full h-28 md:h-32 object-cover rounded mb-2 md:mb-3 bg-gray-100" />
    <div class="font-semibold text-sm md:text-base mb-1">${plant.name}</div>
    <div class="text-gray-700 text-xs md:text-sm mb-2 overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${plant.description}</div>
    <div class="flex items-center justify-between mb-2 md:mb-3">
      <span class="bg-green-100 text-green-700 text-xs px-2 py-1 md:px-3 md:py-1 rounded-full font-medium">${plant.category}</span>
      <span class="font-semibold text-sm md:text-base text-gray-800">৳${plant.price}</span>
    </div>
    <button class="mt-auto w-full bg-green-600 text-white font-semibold py-1 md:py-2 rounded-full hover:bg-green-700 transition text-sm md:text-base" data-id="${plant.id}">
      Add to Cart
    </button>
  `;

  card.querySelector("button").onclick = () => addToCart(plant);

  return card;
}

function addToCart(plant) {
  if (cart[plant.id]) cart[plant.id].qty += 1;
  else cart[plant.id] = { plant, qty: 1 };
  updateCart();
}

function removeFromCart(plantId) {
  delete cart[plantId];
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const emptyCart = document.getElementById("empty-cart");

  cartItems.innerHTML = "";

  let total = 0;
  const cartItemsCount = Object.keys(cart).length;

  if (cartItemsCount === 0) {
    emptyCart.classList.remove("hidden");
  } else {
    emptyCart.classList.add("hidden");
  }

  Object.values(cart).forEach(({ plant, qty }) => {
    total += plant.price * qty;

    const item = document.createElement("div");
    item.className = "flex items-start justify-between gap-2 bg-green-100 px-2 py-1 md:px-3 md:py-2 rounded mb-1 text-sm md:text-base";

    item.innerHTML = `
      <div class="flex-grow">
        <div class="font-medium text-green-800">${plant.name}</div>
        <div class="text-xs md:text-sm text-gray-700">৳${plant.price} × ${qty}</div>
      </div>
      <button class="text-black text-base rounded hover:text-red-700 focus:outline-none" title="Remove from Cart">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    item.querySelector("button").onclick = () => removeFromCart(plant.id);

    cartItems.appendChild(item);
  });

  cartTotal.textContent = `৳${total}`;
}

window.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadAllPlants();
  updateCart();
});