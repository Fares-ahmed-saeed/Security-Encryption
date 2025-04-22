// Typing animation
const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Web Designer', 'UI/UX Designer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Sticky header
let header = document.querySelector('.header');
header.classList.toggle('sticky', window.scrollY > 100);

// Menu icon toggle
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Close menu when clicking on navbar links
document.querySelectorAll('.navbar a').forEach(link => {
    link.onclick = () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    };
});

// Scroll sections
window.onscroll = () => {
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove menu icon when scrolling
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}; 