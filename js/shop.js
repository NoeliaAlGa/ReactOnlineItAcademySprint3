// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
   {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

let totalItems = 0;

// Exercise 1
// function buy(id) {
//     // 1. Loop for to the array products to get the item to add to cart
//     let found = false;

//     for (let i = 0; i < products.length && found === false; i++) {
//         if (products[i].id === id) {
//             cartList.push(products[i]);
//             found = true;
//         }
//     };

    
//     /*cartList.push(products[id -1]);
//     */
//     // 2. Add found product to the cartList array
// }

// Exercise 2

function updateCOuntProduct() {
    const countProduct = document.getElementById("count_product");
    let sumQuantities = 0;

    for(let i = 0; i < cart.length; ++i) {
        sumQuantities += cart[i].quantity;
    }
    countProduct.textContent = sumQuantities;
}


function renderCart() {
    let cleanTableCart = document.getElementById("cart_list");
    let cleanTotalCart = document.getElementById("total_price");

    cleanTableCart.innerHTML = "";
    cleanTotalCart.innerHTML = 0;

    updateCOuntProduct();
}

function cleanCart() {
    cart = [];
    total = 0;
    renderCart();
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    let sumProductsCard = 0;
    for(let i = 0; i < cartList.length; i++) {
        sumProductsCard +=  cartList[i].price;
    }
}

// Exercise 4
/*function generateCart(arrayCartList) {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.

    for (let i = 0; i < arrayCartList.length; i++) {
        if(!cart.some((item) => item.id === arrayCartList[i].id)) {
            cart.push(arrayCartList[i]);
            cart[cart.length - 1].quantity = 1;
            cart[cart.length - 1].subtotal = cart[cart.length - 1].price;
        }
        else {
            let indexElement = cart.findIndex((elementCart) => elementCart.id === arrayCartList[i].id);
            
            cart[indexElement].quantity += 1;
            cart[indexElement].subtotal += cart[indexElement].price;
            cart[indexElement].subtotalWithDiscount = applyPromotionsCart(cart[indexElement]);

            if (cart[indexElement].subtotal === cart[indexElement].subtotalWithDiscount) {
                delete cart[indexElement].subtotalWithDiscount;
            }
        }
    }

    for (let i = 0; i < cart.length; i++) {
        total += (cart[i].hasOwnProperty("subtotalWithDiscount") === true) 
            ? cart[i].subtotalWithDiscount : cart[i].subtotal;
    }
    
}*/

// Exercise 5
function applyPromotionsCart(cartElement) {
    // Apply promotions to each item in the array "cart"
    let priceDiscount = cartElement.price;
    if ((cartElement.id === 1 && cartElement.quantity >= cartElement.offer.number) || (cartElement.id === 3 && cartElement.quantity >= cartElement.offer.number)) {
        priceDiscount = cartElement.price - (cartElement.price * cartElement.offer.percent / 100);
    }
    return priceDiscount * cartElement.quantity;
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    renderCart();
    let tableCart = document.getElementById("cart_list");
    let totalCart = document.getElementById("total_price");

    for (let i = 0; i < cart.length; i++) {
        let tableRow = document.createElement("tr");
        let tableTh = document.createElement("th");
        let tableTdPrice = document.createElement("td");
        let tableTdQuantity = document.createElement("td");
        let tableTdTotal = document.createElement("td");
        let removeButton = document.createElement("button");
        
        tableTh.textContent = cart[i].name;
        tableTdPrice.textContent = cart[i].price;
        tableTdQuantity.textContent = cart[i].quantity;
        removeButton.textContent = "-";

        removeButton.setAttribute("onclick", `removeFromCart(${cart[i].id})`);
        removeButton.setAttribute("class", `btn bg-primary text-white`);
        
        tableTdTotal.textContent = ((cart[i].hasOwnProperty("subtotalWithDiscount")) 
            ? cart[i].subtotalWithDiscount : cart[i].subtotal).toFixed(2);

        tableRow.appendChild(tableTh);
        tableRow.appendChild(tableTdPrice);
        tableRow.appendChild(tableTdQuantity);
        tableRow.appendChild(tableTdTotal);
        tableRow.appendChild(removeButton);
        tableCart.appendChild(tableRow);
    }

    totalCart.textContent = total.toFixed(2);
}


// ** Nivell II **

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.

    if (products.some((product) => product.id === id)) {
        const indexProduct = products.findIndex((elementProduct) => elementProduct.id === id);

        if(!cart.some((item) => item.id === products[indexProduct].id)) {
            cart.push(products[indexProduct]);
            cart[cart.length - 1].quantity = 1;
            cart[cart.length - 1].subtotal = cart[cart.length - 1].price;
        }
       else {
            const indexElement = cart.findIndex((elementCart) => elementCart.id === products[indexProduct].id);

            cart[indexElement].quantity += 1;
            cart[indexElement].subtotal += cart[indexElement].price;
            cart[indexElement].subtotalWithDiscount = applyPromotionsCart(cart[indexElement]);

            if (cart[indexElement].subtotal === cart[indexElement].subtotalWithDiscount) {
                delete cart[indexElement].subtotalWithDiscount;
            }
        }
        total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += (cart[i].hasOwnProperty("subtotalWithDiscount") === true) 
                ? cart[i].subtotalWithDiscount : cart[i].subtotal;
        }

        updateCOuntProduct();
    }
    else {
        alert ("The product with id " + id + " doesn't exist.");
    }
    
}

// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    const index = cart.findIndex((element) => element.id === id);
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        cart[index].subtotal -= cart[index].price;
        cart[index].subtotalWithDiscount = applyPromotionsCart(cart[index]);
    }
    else {
        cart.splice(index, 1);
    }

    total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += (cart[i].hasOwnProperty("subtotalWithDiscount") === true) 
            ? cart[i].subtotalWithDiscount : cart[i].subtotal;
    }

    updateCOuntProduct();
    printCart();

}

function open_modal(){
	console.log("Open Modal");
	printCart();
}

