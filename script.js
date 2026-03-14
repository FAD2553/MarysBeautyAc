document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize AOS with mobile optimization
    AOS.init({
        duration: 400,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: 'mobile' // Best way to stop animations from 'shaking' the mobile view
    });

    // Top Bar Marquee Duplication for smooth loop
    const marquee = document.querySelector('.marquee');
    if (marquee) {
        marquee.innerHTML += marquee.innerHTML; // Duplicate content for seamless transition
    }

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

    // Hero Background Slideshow
    const heroBg = document.querySelector('.hero-bg');
    const heroImages = [
        'assets/IMG_8080.JPG.jpeg',
        'assets/IMG_8086.JPG.jpeg',
        'assets/landing/IMG_8079.JPG.jpeg',
        'assets/landing/IMG_8082.JPG.jpeg',
        'assets/landing/IMG_8084.JPG.jpeg',
        'assets/landing/IMG_5855.JPG.jpeg'
    ];
    let currentImgIndex = 0;

    // Preload all hero images
    heroImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    const changeHeroBackground = () => {
        currentImgIndex = (currentImgIndex + 1) % heroImages.length;
        
        // Create a temporary image to preload
        const img = new Image();
        img.src = heroImages[currentImgIndex];
        img.onload = () => {
            heroBg.style.backgroundImage = `url('${heroImages[currentImgIndex]}')`;
        };
    };

    // Change background every 5 seconds
    setInterval(changeHeroBackground, 5000);

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

    // Gallery Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                    item.classList.add('add');
                    // Small delay to allow fade out if we added it, but for now just hide
                    item.classList.add('hide');
                }
            });
            
            // Re-trigger AOS to sync with filtered items
            AOS.refresh();
        });
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };
});
