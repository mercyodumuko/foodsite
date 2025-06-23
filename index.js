
const menuBnt  = document.getElementById('menu-bnt');
const closeIcon = document.getElementById('closeicon');
const cartIcon = document.querySelectorAll('.cart-icon');
const cartClose = document.getElementById('cart-close');


menuBnt.addEventListener('click', (e)=> {
    showSidebar()
});



function showSidebar(){

  const sidebar =  document.querySelector('.sidebar');
  sidebar.style.display = 'flex';

}

closeIcon.addEventListener('click', (e)=>{
  closeSidebar()
});

cartIcon.forEach(button => {
  button.addEventListener('click', ()=> {
 cartDislay();
  });
});

cartClose.addEventListener('click', ()=> {
  cartClos();
})

function closeSidebar(){
    
const sidebar =  document.querySelector('.sidebar');
sidebar.style.display = 'none';

};

function cartDislay(){
  const cartcontainer = document.querySelector('.cart-container')
  cartcontainer.classList.add('active')
}

function  cartClos(){
  const cartcontainer = document.querySelector('.cart-container')
  cartcontainer.classList.remove('active')
}

const cartButton = document.querySelectorAll('.m-bnt');
 const cartContent = document.querySelector(".cart-content");

cartButton.forEach(button => {
    button.addEventListener('click',
       function (event) {
          const productBox = event.target.closest('.row');
         const productImgSrc = productBox.querySelector(".product-img").src;
      const productTitle = productBox.querySelector(".product-name").textContent;
       const productPrice = productBox.querySelector(".price").textContent;

 const cartItems = cartContent.querySelectorAll(".cart-prodct-title");
  for(let item of cartItems){
     if(item.textContent === productTitle){
      alert("this item already exist in the cart");
      return;
     }
  }

     const element = document.createElement("div");
     element.classList.add('cart-box');

     element.innerHTML = `
      <img src="${productImgSrc}" alt="" class="cart-img">
        <div class="cart-details">
            <h2 class="cart-prodct-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
         <button id="decrement">-</button>
         <span class="number">1</span>
         <button id="increment">+</button>
            </div>
        </div>
       <div class="cart-remove">
       <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/></svg>
       </div>
     `;


 cartContent.appendChild(element);

      element.querySelector(".cart-remove").addEventListener("click", ()=> {
        element.remove();
        updateTotal();
      });

      element.querySelector(".cart-quantity").addEventListener("click", (e)=> {
const numberElement = element.querySelector(".number");
const decrementButton = element.querySelector("#decrement");
let quantity = numberElement.textContent;

if(e.target.id === "decrement" && quantity > 1){
quantity--;
if(quantity === 1){
  decrementButton.style.color = "#999";
}
}else if(e.target.id === "increment"){
  quantity++;
     decrementButton.style.color = "#333";
}

numberElement.textContent = quantity;
updateTotal();

      });
updateTotal();

    });
  });

   
function updateTotal(){
  const totalPriceElement = document.querySelector(".total-price");
   const cartBoxes = cartContent.querySelectorAll(".cart-box");
   let total = 0;
   cartBoxes.forEach(cartBox => {
    const priceElement = cartBox.querySelector(".cart-price");
    const quantityElement = cartBox.querySelector(".number");
    const price = priceElement.textContent.replace("$", "");
    const quantity = quantityElement.textContent;
  total += price * quantity;
   });
totalPriceElement.textContent = `$${total}`;
};

const buyNowButton = document.querySelector(".bnt-buy");
buyNowButton.addEventListener("click", ()=> {
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  if(cartBoxes.length === 0 ){
    alert("Your cart is empty. please add to cart before buying.");
    return;
  }

cartBoxes.forEach(cartBox => cartBox.remove());

updateTotal();
alert("Thanks for your purchase!")

});



