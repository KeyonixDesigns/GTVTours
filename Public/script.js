// On clicking Search button
function showAlert() {
  alert ("Section is under development. Kindly explore our website for more information.");
}

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
    const aText = a.getAttribute('data-sort').toLowerCase();
    const bText = b.getAttribute('data-sort').toLowerCase();
    return aText.localeCompare(bText); 
  });

  div.innerHTML = ''; // Clear the existing list
  sortedItems.forEach(item => {
    div.appendChild(item); 
  });
}

window.onclick = function(event) {
  if (!event.target.matches('.search-drp-button') && 
      !event.target.matches('#myDropdown') && 
      !event.target.matches('#myInput')) { 
    document.getElementById("myDropdown").classList.remove("show"); 
  }
}

// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 150px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
    mybutton.style.display = "block";
  } 
  else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Gallery
var swiper = new Swiper('.swiper-container', {
  effect : 'coverflow',
  grabCursor : true,
  centeredSlides : true,
  slidesPerView : 'auto',
  coverflowEffect : {
    rotate : 0,
    stretch : 0,
    depth : 100,
    modifier : 3,
    slideShadows : false,
  },
  loop : true,
  autoplay : {
    delay : 2500,
    disableOnInteraction : false,
  },
});

// Counter Section
let count = document.querySelectorAll(".count")
  let arr = Array.from(count)
  arr.map(function(item){
    let startnumber = 0
    function counterup(){
    startnumber++
    item.innerHTML= startnumber  
    if(startnumber == item.dataset.number){
      clearInterval(stop)
    }
  }
  let stop =setInterval(function(){
    counterup()
  },50)
  })