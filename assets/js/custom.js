// Preloader logic
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Wait for exactly 3 seconds (3000ms) before fading out
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.style.display = 'none';
                initGSAP(); // Initialize GSAP animations after preloader finishes
                AOS.refresh(); // Force AOS to recalculate elements in view
                window.dispatchEvent(new Event('scroll')); // Trigger a fake scroll to force AOS animations to play immediately
            }, 1000); // Wait for the 1s CSS transition to complete
        }, 3000); 
    } else {
        initGSAP();
        AOS.refresh();
    }
});

// Initialize AOS (Animations)
AOS.init({
    duration: 1200,
    once: false,
    mirror: true,
    offset: 100,
    easing: 'ease-in-out'
});

// GSAP Animations
function initGSAP() {
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // 1. Banner Cinematic Fade (Like Sadhana App)
        gsap.fromTo(".gsap-banner", 
            { opacity: 0, scale: 0.95, y: 30 },
            { 
                opacity: 1, 
                scale: 1, 
                y: 0, 
                duration: 2, 
                ease: "power3.out",
                delay: 0.2 
            }
        );

        // Animate navbar on load smoothly
        gsap.from(".custom-navbar", {
            y: -20,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.5
        });

        // 2. Cinematic Fade for all major images on scroll
        const cinematicImages = document.querySelectorAll('.about-img, .footer-trishul, .tmy-circle img');
        
        cinematicImages.forEach((img) => {
            gsap.fromTo(img, 
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: img,
                        start: "top 85%", // Trigger when image is 85% down the screen
                        toggleActions: "play none none reverse" // Reverses when scrolled back up
                    }
                }
            );
        });

        // 3. Add a parallax effect to the banner background
        gsap.to(".banner-section", {
            backgroundPosition: "50% 100%",
            ease: "none",
            scrollTrigger: {
                trigger: ".banner-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // 4. Smooth Fade for the Donation Overlay
        gsap.from(".donation-overlay", {
            opacity: 0,
            scrollTrigger: {
                trigger: ".donation-section",
                start: "top 80%",
                end: "bottom 20%",
                scrub: true
            }
        });
    }
}