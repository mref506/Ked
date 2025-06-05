// Hide preloader when the page is fully loaded
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500); // Show preloader for at least 1.5 seconds
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // CV Upload Modal functionality for careers page
    const applyButtons = document.querySelectorAll('.apply-btn');
    const cvUploadModal = document.getElementById('cvUploadModal');
    const submitApplicationBtn = document.getElementById('submitApplication');
    const closeCvModal = document.getElementById('closeCvModal');
    
    if (applyButtons.length > 0 && cvUploadModal) {
        // Open CV Upload modal when Apply Now is clicked
        applyButtons.forEach(button => {
            button.addEventListener('click', () => {
                cvUploadModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close CV modal when close button is clicked
        if (closeCvModal) {
            closeCvModal.addEventListener('click', () => {
                cvUploadModal.classList.remove('show');
                document.body.style.overflow = '';
            });
        }
        
        // Handle CV submission
        if (submitApplicationBtn) {
            submitApplicationBtn.addEventListener('click', () => {
                const fileInput = document.getElementById('cv-upload');
                if (fileInput && fileInput.files.length > 0) {
                    // Here you would normally handle the file upload to a server
                    // For now, we'll just show a success message
                    cvUploadModal.classList.remove('show');
                    document.body.style.overflow = '';
                    
                    // SweetAlert Toast configuration
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    
                    Toast.fire({
                        icon: 'success',
                        title: 'Application sent successfully'
                    });
                    
                    // Reset the form
                    fileInput.value = '';
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'CV Required',
                        text: 'Please upload your CV to apply'
                    });
                }
            });
        }
    }
    
    // Auth Modal functionality
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const mobileSignupBtn = document.getElementById('mobileSignupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const closeSignupModal = document.getElementById('closeSignupModal');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    
    // Open login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Open signup modal
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            signupModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Mobile buttons
    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', () => {
            loginModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            closeSidebarNav(); // Close sidebar if open
        });
    }
    
    if (mobileSignupBtn) {
        mobileSignupBtn.addEventListener('click', () => {
            signupModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            closeSidebarNav(); // Close sidebar if open
        });
    }
    
    // Close login modal
    if (closeLoginModal) {
        closeLoginModal.addEventListener('click', () => {
            loginModal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }
    
    // Close signup modal
    if (closeSignupModal) {
        closeSignupModal.addEventListener('click', () => {
            signupModal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }
    
    // Switch between modals
    if (switchToSignup) {
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.remove('show');
            signupModal.classList.add('show');
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            signupModal.classList.remove('show');
            loginModal.classList.add('show');
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('show');
            document.body.style.overflow = '';
        }
        if (e.target === signupModal) {
            signupModal.classList.remove('show');
            document.body.style.overflow = '';
        }
        // Close CV upload modal when clicking outside
        const cvModal = document.getElementById('cvUploadModal');
        if (cvModal && e.target === cvModal) {
            cvModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Mobile sidebar navigation
    const menuToggle = document.getElementById('menu-toggle');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const closeSidebar = document.querySelector('.close-sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    
    // Function to open sidebar
    function openSidebar() {
        mobileSidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Function to close sidebar
    function closeSidebarNav() {
        mobileSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Allow scrolling
    }
    
    // Toggle sidebar on menu icon click
    if (menuToggle) {
        menuToggle.addEventListener('click', openSidebar);
    }
    
    // Close sidebar when clicking the close button
    if (closeSidebar) {
        closeSidebar.addEventListener('click', closeSidebarNav);
    }
    
    // Close sidebar when clicking outside
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebarNav);
    }
    
    // Close sidebar when clicking a menu item
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeSidebarNav();
        });
    });
    
    // Legacy mobile menu code (keeping for backwards compatibility)
    const menu = document.querySelector('.menu');
    const authButtons = document.querySelector('.auth-buttons');

    

    // Animate stats counter
    const statValues = document.querySelectorAll('.stat-value');
    
    function animateStats() {
        statValues.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    if (Number.isInteger(target)) {
                        stat.textContent = Math.floor(current).toLocaleString();
                    } else {
                        stat.textContent = current.toFixed(1);
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target.toLocaleString();
                }
            };
            
            updateCounter();
        });
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('stats')) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe stats section
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Add animation class to elements when they come into view
    const sections = document.querySelectorAll('section');
    
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        fadeObserver.observe(section);
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add responsive navigation
    if (window.innerWidth <= 768) {
        const menuItems = document.querySelectorAll('.menu a');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                menu.classList.remove('active');
                authButtons.classList.remove('active');
            });
        });
    }

    // Add hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        section {
            opacity: 0;
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        section.fade-in {
            opacity: 1;
            transform: translateY(0);
        }

        /* Mobile menu styles */
        @media (max-width: 768px) {
            .menu.active, .auth-buttons.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 80px;
                left: 0;
                width: 100%;
                background: var(--card-bg);
                padding: 20px;
                z-index: 100;
                backdrop-filter: blur(10px);
                border-radius: 0 0 16px 16px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                align-items: center;
            }

            .menu.active a {
                margin: 10px 0;
            }

            .auth-buttons.active {
                top: unset;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 0 0 16px 16px;
            }
        }
    `;
    document.head.appendChild(style);
});
