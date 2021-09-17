//arrow navigation to the top
$(window).scroll(function () {
   if ($(this).scrollTop() > 500) {
      $(".arrow").addClass('active');
   } else {
      $(".arrow").removeClass('active');
   }
});

$('.arrow').click(function (e) {
   e.preventDefault();
   $('html').animate({ scrollTop: 0 }, 1000);
});

let index = 2;
document.addEventListener("click", (e) => {
   //menu burger
   let nav = document.querySelector("nav");
   let background = document.querySelector(".menu_bg");
   let menu_burger = document.querySelector(".menu_burger");
   if (e.target.classList.contains("menu_burger")) {
      e.target.classList.toggle("active");
      background.classList.toggle("active");
      nav.classList.toggle("active");
      document.body.classList.toggle("hide");
   }
   if (e.target.classList.contains("nav_link")) {
      document.body.classList.remove("hide");
      nav.classList.remove("active");
      background.classList.remove("active");
      menu_burger.classList.remove("active");
   }
   if (e.target.classList.contains("show-collection")) {
      //change height of collection when new set of images will load
      index += 1;
      let container = document.querySelector(".collection-container");
      let containerHeight = document.querySelector(".collection").offsetHeight;
      if (index <= 4) {
         container.style.height = containerHeight + 'px';
         lazyImageLoading(index);
      } else {
         container.style.height = containerHeight + 'px';
         document.querySelector(".collection-content").style.opacity = 0;
      }
   }
});

//intersection observer for numbers block
let elemObserved = document.querySelector(".counter-container");
let options = {
   root: null,
   threshold: 0.5,
}
let callback = (entries, observer) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         counter();
         observer.unobserve(entry.target);
      }
   });
}
let observer = new IntersectionObserver(callback, options);
observer.observe(elemObserved);

// numbers counter
const counter = () => {
   let counterList = document.querySelectorAll(".count_item");
   let speed = 1200;
   counterList.forEach(item => {
      const updateCount = () => {
         let total_value = +item.getAttribute("data-total");
         let initial_value = +item.textContent;
         let inc = total_value / speed;
         if (initial_value < total_value) {
            item.textContent = Math.ceil(initial_value + inc);
            setTimeout(updateCount, 30);
         } else {
            item.textContent = total_value;
         }
      }
      updateCount();
   })
}

// create accordion
function chooseTitle() {

   let accorContainer = document.querySelector(".do_itoms");
   let accors = document.querySelectorAll(".lab_input");
   accors.forEach(item => {
      item.addEventListener("click", (e) => {
         let parent = item.closest(".accor");
         console.log(parent);
         if (parent.classList.contains("show")) {
            parent.classList.remove("show");
         } else {
            document.querySelectorAll(".accor").forEach(item => {
               item.classList.remove("show");
            });
            parent.classList.add("show");
         }
      })
   })

}
chooseTitle();
// get images
let ACCESS_KEY = "LcwU0cn7nX9ATSB87B-pWUmuxCWdS7JOwqoKDIMR0JU";
async function lazyImageLoading(page) {
   let response = await fetch(`https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&page=${page}`);
   let data = await response.json();
   createImageLayout(data);
}
lazyImageLoading(1);

// create collection`s images layout
function createImageLayout(data) {
   let container = document.querySelector(".collection");
   data.forEach(photo => {
      let imageContainer = document.createElement('div');
      imageContainer.className = "collection-item";
      let img = document.createElement('img');
      img.src = photo.urls.thumb;
      imageContainer.append(img);
      container.append(imageContainer);
   });

   //use Masonry for adaptive collection images
   let elem = document.querySelector('.collection');
   let msnry = new Masonry(elem, {
      // options
      itemSelector: '.collection-item',
      columnWidth: 200,
      fitWidth: true,
      gutter: 15
   });
}

