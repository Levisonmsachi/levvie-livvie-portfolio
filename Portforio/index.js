document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    let darkMode = localStorage.getItem('darkMode') === 'true';

    // Apply saved theme
    if (darkMode) {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        darkMode = !darkMode;
        if (darkMode) {
            body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        localStorage.setItem('darkMode', darkMode);
    });

    // Animate skills on scroll
    const animateSkills = () => {
        document.querySelectorAll('.progress-bar').forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    };

    // Initialize when skills section is in view
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Navbar scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Download counter
    const downloadBtn = document.getElementById('downloadCV');
    const downloadCounter = document.querySelector('.download-counter');
    let downloads = localStorage.getItem('cvDownloads') || 0;

    downloadCounter.textContent = `(${downloads} downloads)`;

    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        downloads++;
        localStorage.setItem('cvDownloads', downloads);
        downloadCounter.textContent = `(${downloads} downloads)`;
        
        // Simulate download
        const link = document.createElement('a');
        link.href = 'assets/Levison Msachi CV.pdf';
        link.download = 'Levison Msachi CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Form validation
    emailjs.init('gGGa9rCkIEx94nKT6'); // emailjs actual key
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Validate all fields
        contactForm.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }

            // Special validation for email
            if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                field.classList.add('is-invalid');
                isValid = false;
            }
        });

        if (isValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

            // Send email via EmailJS
            emailjs.sendForm(
                'service_0v2o1b7',   // EmailJS Service ID
                'template_tbl72fg',  // EmailJS Template ID
                contactForm
            )

            .then(() => {
                formSuccess.classList.remove('d-none');
                 contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.add('d-none');
            }, 5000);
            })

            .catch((error) => {
                alert('Failed to send message. Please try again later.');
                console.error('EmailJS Error:', error);
            })

            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            });
        }
    });

    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#3498db" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#3498db", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            }
        });
    }
});

document.getElementById("viewPostsBtn").addEventListener("click", function(event) {
    event.preventDefault();
    const messageDiv = document.getElementById("viewBtnSuccess");
    
    // Reset styles if clicked multiple times
    messageDiv.classList.remove("d-none", "fade-out");
    messageDiv.style.opacity = '1';
    
    // Hide after 5 seconds with fade
    setTimeout(() => {
        messageDiv.classList.add("fade-out");
        setTimeout(() => messageDiv.classList.add("d-none"), 500); // Wait for fade to complete
    }, 5000);
});