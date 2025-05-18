// Navbar Scroll Behavior
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const searchContainer = document.querySelector(".search-container");
  const searchBtn = document.querySelector(".search-btn");
  const searchInput = document.querySelector(".search-input");
  const logoImg = document.querySelector(".logo img");

// Smooth Scroll for Nav Links
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 20, // Adjust according to your navbar height
        behavior: 'smooth'
      });
    }
  });
});

  document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");

      // Handle special redirect for "About Us" in mobile
      if (link.getAttribute('href') === '#about') {
        e.preventDefault(); // prevent smooth scroll
        window.location.href = '/public/views/rm.html'; // redirect to rm.html
      }
    }
  });
});

  // Hamburger menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Search bar toggle
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchContainer.classList.toggle("active");
    if (searchContainer.classList.contains("active")) {
      searchInput.focus();
    }
  });

  // Close search bar when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchContainer.contains(e.target) && !searchBtn.contains(e.target)) {
      searchContainer.classList.remove("active");
    }
  });

  // Prevent closing when clicking inside search
  searchContainer.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Scroll behavior
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      document.querySelector(".navbar").classList.add("scrolled");
      navLinks.querySelectorAll("a").forEach((link) => (link.style.color = "#e9ebed"));
      searchBtn.style.color = "#e9ebed";
      searchInput.style.color = "#e9ebed";
      logoImg.src = "/public/img/Logo_Nav.webp";
    } else {
      document.querySelector(".navbar").classList.remove("scrolled");
      navLinks.querySelectorAll("a").forEach((link) => (link.style.color = "#1b1b1b"));
      searchBtn.style.color = "#1b1b1b";
      searchInput.style.color = "#1b1b1b";
      logoImg.src = "/public/img/GV_Final_BLACK_CIrcle_withoutBG.webp";
    }
  });
});

// Initialize AOS Animations
window.addEventListener('load', () => {
  AOS.init({
    duration: 1200,
    once: true,
  });
});

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

const sendEmail = (e) =>{
    e.preventDefault()

    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_w7m2nqd','template_5gxl63b','#contact-form','glJomlwMLJbMK3rPo')
    .then(() =>{
        // Show sent message
        contactMessage.textContent = 'Message sent successfully ✅'

        // Remove message after five seconds
        setTimeout(() =>{
            contactMessage.textContent = ''

            // Redirect to thank you page after showing the message
          window.location.href = 'ty.html?title=' + encodeURIComponent(document.getElementById('modal-title-input').value);
        }, 3000)

        // Clear input fields
        contactForm.reset()
    }, () =>{
        // Show error message
        contactMessage.textContent = 'Message not sent (service error) ❌'
    })
}

const callSubmit = function(){
  contactForm.addEventListener('submit', sendEmail)
}


// ty page display
  function goBack() {
    window.history.back();
  }
  
// Get and display the package type
window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get('title');
  if (title) {
    document.querySelector('h1').textContent = 'Thank You for Your ' + title + ' Inquiry!';
  }
}
  
// Modal Form
function openModal(title) {
  document.getElementById('modal').style.display = 'flex';
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-title-input').value = title;
}
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}
function enforcePincodeLength(input) {
  if (input.value.length > 6) {
    input.value = input.value.slice(0, 6);
  }
}
window.onclick = function(event) {
  if (event.target == document.getElementById('modal')) {
      closeModal();
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  today.setDate(today.getDate() + 1); // Allow only future dates, not today

  const formattedDate = today.toISOString().split("T")[0];
  const sdate = document.getElementById("sdate");
  const edate = document.getElementById("edate");

  // Set minimum selectable date
  sdate.setAttribute("min", formattedDate);
  edate.setAttribute("min", formattedDate);

  // Update end date when start date changes
  sdate.addEventListener("change", function () {
    const selectedStartDate = sdate.value;
    edate.setAttribute("min", selectedStartDate);

    if (edate.value < selectedStartDate) {
      edate.value = selectedStartDate;
    }
  });
});


// Scroll to Top
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 150px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 150 ||
    document.documentElement.scrollTop > 150
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Gallery
var swiper = new Swiper(".swiper-container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 3,
      slideShadows: false,
    },
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
});

// Counter Section
let count = document.querySelectorAll(".count");
let arr = Array.from(count);
arr.map(function (item) {
  let startnumber = 0;
  function counterup() {
    startnumber++;
    item.innerHTML = startnumber;
    if (startnumber == item.dataset.number) {
      clearInterval(stop);
    }
  }
  let stop = setInterval(function () {
    counterup();
  }, 10);
});

// Search Filter
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase();
  const div = document.getElementById("myDropdown");
  const a = div.getElementsByTagName("a");

  for (let i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }

  // Sort the list alphabetically after filtering
  const sortedItems = Array.from(a).sort((a, b) => {
    const aText = a.getAttribute("data-sort").toLowerCase();
    const bText = b.getAttribute("data-sort").toLowerCase();
    return aText.localeCompare(bText);
  });

  div.innerHTML = ""; // Clear the existing list
  sortedItems.forEach((item) => {
    div.appendChild(item);
  });
}

window.onclick = function (event) {
  if (
    !event.target.matches(".search-drp-button") &&
    !event.target.matches("#myDropdown") &&
    !event.target.matches("#myInput")
  ) {
    document.getElementById("myDropdown").classList.remove("show");
  }
};

// Blog Page Cards