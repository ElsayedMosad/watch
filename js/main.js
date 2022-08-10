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
const addCarts = document.querySelectorAll(".add-cart");
const shopItems = document.querySelector(".shop-items");
const shop = document.getElementById("shop");
const shopMenu = document.querySelector(".shop-menu");
const shopClose = shopMenu.querySelector(".close-shop");
const totalShop = document.querySelector(".total-shop");

// play shopmenu
shop.addEventListener("click", () => {
  shopMenu.classList.add("play-shop");
});
shopClose.addEventListener("click", () => {
  shopMenu.classList.remove("play-shop");
});

let arrCurds = [];
addCarts.forEach((e, index) => {
  e.setAttribute("data-id", index);
});

if (localStorage.arrCurds) {
  arrCurds = JSON.parse(localStorage.arrCurds);
  createCurd();
}
function checkIdNotUse(id) {
  for (let i = 0;i < arrCurds.length;i++) {
    if (arrCurds[i].id == id) {
      return false;
    }
  } 
  return true;
}
addCarts.forEach(function (e, index) {
  e.addEventListener("click", function () {
    if (checkIdNotUse(e.getAttribute("data-id"))) {
      let imageForCart = carts[index].querySelector("img").getAttribute("src");
      let nameForCart = carts[index].querySelector(".cart-name").textContent;
      let valueForCart = carts[index].querySelector(".cart-value").textContent;
      let objCurd = {
        id: e.getAttribute("data-id"),
        img: imageForCart,
        nums: 1,
        name: nameForCart,
        value: valueForCart,
      };
      arrCurds.push(objCurd);
      createCurd();
      addToLocalStorage();
    }
  });
});

function createCurd() {
  shopItems.innerHTML = "";
  for (let i = 0; i < arrCurds.length; i++) {
    let shopItem = document.createElement("div");
    shopItem.innerHTML = `
    <div class="shop-item">
    <div class="shop-img">
      <img src="${arrCurds[i].img}" alt="shop item image" />
    </div>
    <div class="shop-data">
      <h3 class="shop-name">${arrCurds[i].name}</h3>
      <span class="shop-value">${arrCurds[i].value}</span>
      <div class="shop-num">
        <button class="decrease"  onclick = "decreaseCounter(${i})">
          <i class="bx bx-minus"></i>
        </button>
        <div class="counter">${arrCurds[i].nums}</div>
        <button class="increase"  onclick = "increaseCounter(${i})">
          <i class="bx bx-plus"></i>
        </button>
        <button class="delete-shop-item"  onclick = "deleteCart(${i})">
          <i class="bx bx-trash-alt"></i>
        </button>
      </div>
    </div>
  </div>
    `;
    shopItems.appendChild(shopItem);
  }
  getTotalValue();
}

function addToLocalStorage() {
  localStorage.setItem("arrCurds", JSON.stringify(arrCurds));
}

function deleteCart(index) {
  arrCurds.splice(index, 1);
  createCurd();
  localStorage.setItem("arrCurds", JSON.stringify(arrCurds));
}

function decreaseCounter(index) {
  let count = document.querySelectorAll(".counter")[index];
  if (parseInt(count.textContent) != 1) {
    count.textContent = parseInt(count.textContent) - 1;
    arrCurds[index].nums = count.textContent;
    getTotalValue();
    localStorage.setItem("arrCurds", JSON.stringify(arrCurds));
  }
}
function increaseCounter(index) {
  let count = document.querySelectorAll(".counter")[index];
  count.textContent = parseInt(count.textContent) + 1;
  arrCurds[index].nums = count.textContent;
  getTotalValue();
  localStorage.setItem("arrCurds", JSON.stringify(arrCurds));
}

function getTotalValue() {
  let z = 0;
  document.querySelectorAll(".shop-item").forEach((e) => {
    let value = parseInt(
      e.querySelector(".shop-value").textContent.match(/\d+/)[0]
    );
    let nums = parseInt(e.querySelector(".counter").textContent);
    z += value * nums;
  });
  totalShop.textContent = `Total = $${z}`;
}
