// Header in scroll
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY >= 50) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
});

window.addEventListener("load", function () {
  document.documentElement.scrollTop = 0;
});

// mood changer
const mood = document.getElementById("mood");
const body = document.querySelector("body");

// Mood localStorage
if (localStorage.getItem("mood")) {
  if (localStorage.getItem("mood") === "sun") {
    changeToSun();
  }
}
// Mood click
mood.addEventListener("click", function () {
  if (body.classList.contains("mood-changer")) {
    changeToMoon();
    localStorage.setItem("mood", "moon");
  } else {
    changeToSun();
    localStorage.setItem("mood", "sun");
  }
});

function changeToSun() {
  mood.innerHTML = `<i class='bx bx-sun' ></i>`;
  body.classList.add("mood-changer");
}
function changeToMoon() {
  mood.innerHTML = `<i class="bx bx-moon"></i>`;
  body.classList.remove("mood-changer");
}

// play menu links
const butMenu = document.getElementById("fixed-menu");
const navMenu = document.getElementById("nav-menu");
const closeMenu = document.querySelector(".x-menu i");
const menuLinks = document.querySelectorAll(".nav-link");

butMenu.addEventListener("click", function () {
  navMenu.classList.add("play-menu");
});
closeMenu.addEventListener("click", function () {
  navMenu.classList.remove("play-menu");
});

menuLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (navMenu.classList.contains("play-menu")) {
      navMenu.classList.remove("play-menu");
    }
  });
});

// Frist Swiper For Review div
var mySwiperReview = new Swiper(".mySwiperReview", {
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const sections = document.querySelectorAll("Section");
const scrollUp = document.querySelector(".scroll-up");

window.addEventListener("scroll", () => {
  let scrollPosition = document.documentElement.scrollTop;
  sections.forEach((sec, index) => {
    if (
      scrollPosition + 200 >= sec.offsetTop &&
      scrollPosition <= sec.offsetTop + sec.offsetHeight + 200
    ) {
      menuLinks.forEach((e) => {
        if (e.classList.contains("active")) {
          e.classList.remove("active");
        }
      });
      menuLinks[index].classList.add("active");
    }
  });
  if (scrollPosition >= 200) {
    // console.log(scrollPosition)
    scrollUp.classList.add("to-top");
  } else {
    scrollUp.classList.remove("to-top");
  }
});

// Secand Swiper For New  div

var swiper = new Swiper(".mySwiperNew", {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    540: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 35,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 45,
    },
  },
});

// cart shopping
const carts = document.querySelectorAll(".cart");
const values = document.querySelectorAll(".cart-value");
const addCarts = document.querySelectorAll(".add-cart");
let deletes = document.querySelectorAll(".delete-shop-item");
let allShopItem = document.querySelectorAll(".shop-item");

const shop = document.getElementById("shop");
const shopMenu = document.querySelector(".shop-menu");
const shopClose = shopMenu.querySelector(".close-shop");
const shopItems = document.querySelector(".shop-items");
let shopValues = document.querySelectorAll(".shop-value");
let increases = document.querySelectorAll(".increase");
let decreases = document.querySelectorAll(".decrease");
let counters = document.querySelectorAll(".counter");
let totalItem = document.querySelectorAll(".total-shop");

// console.log(totalItem);

// play shopmenu
shop.addEventListener("click", () => {
  shopMenu.classList.add("play-shop");
});
shopClose.addEventListener("click", () => {
  shopMenu.classList.remove("play-shop");
});

// addcart to shop menu on click add to cart && apply deleteCart again
addCarts.forEach(function (e, index) {
  e.addEventListener("click", function () {
    let imageForCart = carts[index].querySelector("img").getAttribute("src");
    let nameForCart = carts[index].querySelector(".cart-name").textContent;
    let valueForCart = carts[index].querySelector(".cart-value").textContent;
    createShopItem(imageForCart, nameForCart, valueForCart);
    deleteCart();
    increaseCounter();
    decreaseCounter();
  });
});

// delete cart item on click delete icon
function deleteCart() {
  deletes = document.querySelectorAll(".delete-shop-item");
  allShopItem = document.querySelectorAll(".shop-item");
  deletes.forEach(function (e, index) {
    e.addEventListener("click", function () {
      allShopItem[index].remove();
    });
  });
  deletes = document.querySelectorAll(".delete-shop-item");
  allShopItem = document.querySelectorAll(".shop-item");
}
deleteCart();

// create shop item
function createShopItem(srcImg, watchName, watchValue) {
  let shopItem = document.createElement("div");
  shopItem.classList.add("shop-item");

  // frist div => .shop-img
  let shopImg = document.createElement("div");
  shopImg.classList.add("shop-img");
  let img = document.createElement("img");
  img.setAttribute("src", srcImg);
  img.setAttribute("alt", "shop item image");
  shopImg.appendChild(img);
  shopItem.prepend(shopImg);
  shopItems.appendChild(shopItem);

  // secand div => .shop-data
  let shopData = document.createElement("div");
  shopData.classList.add("shop-data");
  // shop name
  let shopName = document.createElement("h3");
  shopName.classList.add("shop-name");
  let textName = document.createTextNode(watchName);
  shopName.appendChild(textName);
  shopData.appendChild(shopName);
  shopItem.appendChild(shopData);

  let shopValue = document.createElement("span");
  shopValue.classList.add("shop-value");
  let textVale = document.createTextNode(watchValue);
  shopValue.appendChild(textVale);
  shopData.appendChild(shopValue);

  let shopNum = document.createElement("div");
  shopNum.classList.add("shop-num");
  shopNum.innerHTML = `
  <button class="decrease">
  <i class='bx bx-minus' ></i>
  </button>
  <div class="counter">1</div>
  <button class="increase">
  <i class='bx bx-plus' ></i>
  </button>
  <button class="delete-shop-item">
  <i class='bx bx-trash-alt'></i>
  </button>
  `;
  let totalShop = document.createElement("div");
  totalShop.classList.add("total-shop");
  totalShop.textContent = `Total = ${watchValue}`;
  shopItem.appendChild(totalShop);
  shopData.appendChild(shopNum);
}
// increase on click
function increaseCounter() {
  increases = document.querySelectorAll(".increase");
  counters = document.querySelectorAll(".counter");
  shopValues = document.querySelectorAll(".shop-value");
  totalItem = document.querySelectorAll(".total-shop");
  increases.forEach(function (e, index) {
    e.addEventListener("click", function () {
      let valueAfterIcrease = ++counters[index].textContent;
      totalItem[index].textContent = `Total = $${totalValueAfterIcrease(
        valueAfterIcrease,
        shopValues[index].textContent
      )}`;
    });
  });
}
increaseCounter();
function totalValueAfterIcrease(num, theValue) {
  valueNumber = theValue.match(/\d+/)[0];
  return valueNumber * num;
}

// decrease on click 
function decreaseCounter() {
  decreases = document.querySelectorAll(".decrease");
  counters = document.querySelectorAll(".counter");
  shopValues = document.querySelectorAll(".shop-value");
  totalItem = document.querySelectorAll(".total-shop");
  decreases.forEach(function (e, index) {
    e.addEventListener("click", function () {
      if (counters[index].textContent >= 1) {
        let valueAfterIcrease = --counters[index].textContent;
        totalItem[index].textContent = `Total = $${totalValueAfterDecrease(
          valueAfterIcrease,
          shopValues[index].textContent
        )}`;
      }
    });
  });
}
decreaseCounter();
function totalValueAfterDecrease(num, theValue) {
  valueNumber = theValue.match(/\d+/)[0];
  return valueNumber * num;
}
