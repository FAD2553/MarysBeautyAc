document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Dynamic Top Bar Status
    const statusMsg = document.getElementById('status-message');
    const updateStatus = () => {
        const now = new Date();
        const hour = now.getHours();
        
        // Academy Hours: 09:00 - 20:00
        if (hour >= 9 && hour < 20) {
            statusMsg.innerHTML = "Nous sommes ouverts maintenant. Vous pouvez prendre rendez-vous via WhatsApp.";
        } else {
            statusMsg.innerHTML = "Nous sommes actuellement fermés. Vous pouvez toujours prendre rendez-vous via WhatsApp.";
        }
    };
    updateStatus();

    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Basic)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'white';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    });

    // WhatsApp Form Logic
    const whatsappForm = document.getElementById('whatsappForm');
    const phoneNumber = "22656211062";

    whatsappForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;

        const whatsappMessage = `*Nouveau Rendez-vous - Mari's Beauty Academy*%0A%0A` +
                                `*Nom:* ${name}%0A` +
                                `*Service:* ${service}%0A` +
                                `*Message:* ${message}`;

        const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
        
        window.open(whatsappURL, '_blank');
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for hero (Simple)
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `translate(-50%, -50%) translateY(${scrollValue * 0.5}px)`;
        }
    });

    // Image Modal Lightbox Logic
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const captionText = document.getElementById("caption");
    const cards = document.querySelectorAll(".service-card, .gallery-item");

    cards.forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", function() {
            modal.style.display = "block";
            const img = this.querySelector("img");
            const h3 = this.querySelector("h3");
            
            modalImg.src = img.src;
            captionText.innerHTML = h3 ? h3.innerHTML : img.alt;
            document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
        });
    });

    const closeModal = document.querySelector(".close-modal");
    closeModal.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };
});
