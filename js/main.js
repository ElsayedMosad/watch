// Header in scroll
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY >= 50) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
});

// mood changer
const mood = document.getElementById("mood");
const body = document.querySelector("body");

// Mood localStorage
if (localStorage.getItem("mood")) {
  if (localStorage.getItem("mood") === "moon") {
    changeToMoon();
  }
}
// Mood click
mood.addEventListener("click", function () {
  if (!body.classList.contains("mood-changer")) {
    changeToMoon();
    localStorage.setItem("mood", "moon");
  } else {
    changeToSun();
    localStorage.setItem("mood", "sun");
  }
});

function changeToSun() {
  mood.innerHTML = `<i class='bx bx-sun' ></i>`;
  body.classList.remove("mood-changer");
}
function changeToMoon() {
  mood.innerHTML = `<i class="bx bx-moon"></i>`;
  body.classList.add("mood-changer");
}

// play menu
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

const sections = document.querySelectorAll("Section");
const scrollUp = document.querySelector(".scroll-up")
// console.log(scrollUp);

window.addEventListener("scroll", () => {
  let scrollPosition = document.documentElement.scrollTop;
  sections.forEach((sec, index) => {
    if (
      scrollPosition + 100 >= sec.offsetTop &&
      scrollPosition <= sec.offsetTop + sec.offsetHeight
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
    scrollUp.classList.add("to-top")
  } else {
    
    scrollUp.classList.remove("to-top")
  }
});

window.addEventListener("load", function (){
  document.documentElement.scrollTop = 0
})

// card shopping

// const cards = document.querySelectorAll(".card")
// // const cards = document.querySelectorAll(".card")
// // const cards = document.querySelectorAll(".card")
// console.log(cards)
// console.log(cards[0].querySelector('img'))
// console.log(cards[0].querySelector('.card-name').textContent)
// console.log(cards[0].querySelector('.card-value').textContent)
// console.log(cards[2])