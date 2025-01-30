// add bag
document.addEventListener("DOMContentLoaded", function () {
    let openButton = document.getElementById("open-btn");
    let closeButton = document.getElementById("close-btn");
    let addBag = document.getElementById("add-to-bag");
    let shoppingBtn = document.querySelector(".shopping-btn");
    let cartCount = document.getElementById("cart-count");  // Cart item count element

    openButton.addEventListener("click", function () {
        addBag.classList.add("open");
    });

    closeButton.addEventListener("click", function () {
        addBag.classList.remove("open");
    });

    shoppingBtn.addEventListener("click", function () {
        window.location.href = "index.html";
    });

    let cartBag = document.querySelectorAll(".cart");
    let productItem = document.getElementById("product-item");
    let cartPage = document.querySelector(".cart-page");
    let grandTotal = document.getElementById("grand-total");

    let bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];

    // Add item to the bag
    cartBag.forEach(button => {
        button.addEventListener("click", function () {
            const dressItems = this.closest('.dress');
            const productImg = dressItems.querySelector('img').src;
            const productName = dressItems.querySelector('.product-name').textContent;
            const productPrice = dressItems.querySelector('.cost').textContent || "0";
            const productCost = dressItems.querySelector(".offer-cost").textContent || "0";
            const productOffer = dressItems.querySelector(".offer").textContent || "No Offer";

            // Add the item to the bagItems array
            bagItems.push({
                image: productImg,
                name: productName,
                price: productPrice,
                offercost: productCost,
                offer: productOffer
            });

            // Store updated bag items in localStorage
            localStorage.setItem("bagItems", JSON.stringify(bagItems));

            alert("Product added to the cart");

            // Update the product list in the bag and the grand total
            updateBag();
            updateTotal();

            // Update cart item count
            updateCartCount();
        });
    });

    // Update the bag
    function updateBag() {
        productItem.innerHTML = ""; // Clear the current list

        if (bagItems.length === 0) {
            cartPage.style.display = "block"; // Show empty cart message
        } else {
            cartPage.style.display = "none";
        }

        bagItems.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("bag-item");
            listItem.innerHTML = `
                <span class="product-list">
                    <img src="${item.image}" alt="${item.name}" width="100px" height="100px">
                    <p id="name">${item.name}</p>
                    <button class='delete'><i class='fa-solid fa-trash-can'></i></button>
                </span><br><hr>
                <span class="product-bottom">
                    <p id="price">${item.price}</p>
                    <p id="offercost">${item.offercost}</p>
                    <p id="offer">${item.offer}</p>
                </span>
            `;
            productItem.appendChild(listItem);

            const deleteButton = listItem.querySelector(".delete");
            deleteButton.addEventListener("click", function () {
                bagItems.splice(index, 1);
                localStorage.setItem("bagItems", JSON.stringify(bagItems));
                updateBag();
                updateTotal();

                // Update cart item count after deleting
                updateCartCount();
            });
        });
    }

    let totalSum = document.getElementById("total");

    // Update the grand total
    function updateTotal() {
        let total = 0;

        if (bagItems.length === 0) {
            totalSum.style.display = "none"; // Hide the total section if there are no items
        } else {
            totalSum.style.display = "block"; // Show the total section if there are items
        }

        // Sum the prices of all items in the bag
        bagItems.forEach(item => {
            total += parseFloat(item.price.replace(/[^0-9-]+/g, "")) || 0; // Ensure proper parsing of price
        });

        // Update the grand total display
        grandTotal.textContent = `Rs. ${total.toFixed(2)}`;
    }

    // Update the cart count (number of items in the bag)
    function updateCartCount() {
        cartCount.textContent = bagItems.length; // Update the cart item count
    }

    // Initial load
    updateBag();
    updateTotal();
    updateCartCount();  // Update the cart count when the page is loaded
});




// wishlist

// Loop through all the wishlist buttons and add event listeners
document.querySelectorAll(".wishlist").forEach(button => {
    button.addEventListener("click", function () {
        // Get the parent element (the dress item)
        const dressItem = this.closest('.dress');

        // Ensure dressItem exists to avoid errors
        if (!dressItem) return;

        // Extract product information from the DOM
        const image = dressItem.querySelector(".image")?.src || "default-image.jpg";
        const productName = dressItem.querySelector(".product-name")?.textContent || "Unknown Product";
        const cost = dressItem.querySelector(".cost")?.textContent || "N/A";
        const offerCost = dressItem.querySelector(".offer-cost")?.textContent || "N/A";
        const offer = dressItem.querySelector(".offer")?.innerHTML || "No Offer";



        // Create an object with the product information
        const product = {
            image,
            productName,
            cost,
            offerCost,
            offer,
        };

        // Retrieve existing wishlist from localStorage, or create an empty array if not available
        const wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];

        // Check if the product already exists in the wishlist
        const productAlreadyInWishlist = wishlistItems.some(item => item.image === product.image);

        if (!productAlreadyInWishlist) {
            alert("Product added to your wishlist!");

            // Add the new product to the wishlist array
            wishlistItems.push(product);

            // Save the updated wishlist to localStorage
            localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));

        } else {
            alert("This product is already in your wishlist.");
        }

        // Optionally, you can redirect to the wishlist page here
        // window.location.href = "wishlist.html";
    });
});



// search

let searchInput = document.querySelector(".searchbar input");
let suggestionsList = document.getElementById("suggestions-list");
let searchResults = document.getElementById("search-results");
let popularSearch = document.querySelector(".popular-search");
let closeicon = document.getElementById("close");

let products = [
    { name: "women ethnic wear", link: "women ethnicwear.html" },
    { name: "makeup", link: "makeup.html" },
    { name: "watch", link: "watch.html" },
    { name: "bag", link: "travelbag.html" },
    { name: "Jewelleries", link: "jewl.html" },
    { name: "shoes", link: "m&w footwear.html" },
    { name: "Mens", link: "mencasual.html" },
    { name: "home decor", link: "things decor.html" },
    // Add more products here
];


// Show popular searches when the search bar is clicked
searchInput.addEventListener("click", function () {
    popularSearch.style.display = "block";
});

// Hide suggestions when clicking outside the search area
document.addEventListener("click", function (event) {
    if (!searchInput.contains(event.target) && !searchResults.contains(event.target) && !popularSearch.contains(event.target)) {
        searchResults.style.display = "none";
        popularSearch.style.display = "none";
    }
});

// // Show close icon when the user types
searchInput.addEventListener("keyup", function () {
    if (searchInput.value.trim() !== "") {
        closeicon.style.display = "block";  // Show the close icon when there's text in the input
    } else {
        closeicon.style.display = "none";  // Hide the close icon when input is empty
    }
});

// Clear the search input when the close icon is clicked
closeicon.addEventListener("click", function () {
    searchInput.value = "";  // Clear the input value
    closeicon.style.display = "none";  // Hide the close icon after clearing the input
});


// Fetch search suggestions based on user input
searchInput.addEventListener("input", function () {

    if (searchInput.value.trim() !== "") {
        closeicon.style.display = "block";  // Show the close icon when there's text
    } else {
        closeicon.style.display = "none";  // Hide the close icon when input is empty
    }

    let query = searchInput.value;
    if (query && query.trim() !== "") {
        query = query.toLowerCase();  // Make sure it's lowercase

        // Filter products based on the query
        let filteredSuggestions = products.filter(product => {
            return product.name.toLowerCase().includes(query);
        });

        // Clear previous suggestions
        suggestionsList.innerHTML = '';

        // Show results
        if (filteredSuggestions.length > 0) {
            searchResults.style.display = "block";
            popularSearch.style.display = "none"; // Hide popular search when typing
            filteredSuggestions.forEach(product => {
                let listItem = document.createElement("li");

                // Create the icon (magnifying glass)
                let icon = document.createElement("i");
                icon.classList.add("fa-solid", "fa-magnifying-glass");

                icon.style.marginLeft = "10px";
                icon.style.fontSize = "small";

                // Create the link
                let link = document.createElement("a");
                link.href = product.link;
                link.textContent = product.name;

                // Append the icon and link to the list item
                listItem.appendChild(icon);
                listItem.appendChild(link);
                suggestionsList.appendChild(listItem);
            });
        } else {
            searchResults.style.display = "none"; // No results
        }
    } else {
        searchResults.style.display = "none"; // Hide results if input is empty or only spaces
        popularSearch.style.display = "block"; // Show popular search again if input is cleared
    }
});

// payment

let payment = document.getElementById("payment-btn");

payment.addEventListener("click", function () {
    window.location.href = "payment.html";
});































