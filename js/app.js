/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const SectionsList = document.querySelectorAll('section')
const navBarList = document.getElementById('navbar__list')
/**
 * End Global Variables
 */

// Create new menu by go inside and iterate   
// make name of menu items dynamic depend on h2 name by add 
// element.getElementsByTagName('h2')[0].firstChild.textContent

SectionsList.forEach(element => {
  console.log(element.getElementsByTagName('h2')[0].firstChild.textContent);
  
  const navListElement = `<li class='menu__link ${element.className}' data-link=${element.id}><a href="#${element.id}">${element.getElementsByTagName('h2')[0].firstChild.textContent }</li>`

  // where I will insert element menu
  navBarList.insertAdjacentHTML('beforeend', navListElement)
})

// Scroll to section on link click by listen to the click-event  
navBarList.addEventListener('click', event => {
  event.preventDefault()
  const parent = event.target.hasAttribute('data-link')
    ? event.target
    : event.target.parentElement
  const whereToScroll = document.getElementById(parent.dataset.link)
  whereToScroll.scrollIntoView({ behavior: 'smooth', block: 'end' })
});

//  activate navbar link and section by using the IntersectionObserver pattern
const callbackFunction = (entries) => {
  entries.forEach(entry => {
    const navListElement = document.querySelector(
      `.menu__link[data-link='${entry.target.id}']`,
    )
    const this_section = document.getElementById(entry.target.id)

    if (entry && entry.isIntersecting) {
      navListElement.classList.add('active-section');
      this_section.classList.add('active-section');
    } else {
      if (navListElement.classList.contains('active-section')) {
        navListElement.classList.remove('active-section');
      }

      if (this_section.classList.contains('active-section')) {
        this_section.classList.remove('active-section');
      }
    }
  })
}
// Define Options for the observer 

 const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.7,
}

// checks for Activations status or not  by observer with options and a callback Function  
 const myObserver = new IntersectionObserver(callbackFunction, options)
SectionsList.forEach(element => {
  myObserver.observe(document.getElementById(element.id));
});


//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

 