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

    
    // Phone input handling
    const phoneInput = document.querySelector('.phone-input');
    const phoneSubmit = document.querySelector('.phone-submit');
    
    // Service selection modal elements
    const serviceModal = document.getElementById('service-selection-modal');
    const closeServiceModal = document.getElementById('close-service-modal');
    const serviceOptions = document.querySelectorAll('.service-option');
    const amountSelection = document.querySelector('.amount-selection');
    const serviceSelection = document.querySelector('.service-selection');
    const amountOptions = document.querySelectorAll('.amount-option');
    const customAmountInput = document.getElementById('custom-amount');
    const proceedWithAmountBtn = document.getElementById('proceed-with-amount');
    
    // Store selected values
    let selectedService = null;
    let selectedAmount = null;
    
    if (phoneInput && phoneSubmit) {
        // Only allow numbers in the phone input
        phoneInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Add visual feedback when the input has content
            if (this.value.length > 0) {
                this.parentElement.classList.add('has-content');
            } else {
                this.parentElement.classList.remove('has-content');
            }
            
            // Enable/disable the submit button based on input length
            if (this.value.length >= 9) {
                phoneSubmit.removeAttribute('disabled');
                phoneSubmit.classList.remove('disabled');
            } else {
                phoneSubmit.setAttribute('disabled', 'disabled');
                phoneSubmit.classList.add('disabled');
            }
        });
        
        // Open service selection modal when clicking Get Started
        phoneSubmit.addEventListener('click', function() {
            if (phoneInput.value.length >= 9) {
                // Add success animation
                this.innerHTML = '<i class="fas fa-check"></i> Verified';
                this.classList.add('success');
                
                // Show service selection modal
                setTimeout(() => {
                    // Reset modal to first step
                    resetServiceModal();
                    
                    // Show the modal
                    serviceModal.classList.add('show');
                    
                    // Success notification
                    Toast.fire({
                        icon: "success",
                        title: "Phone number verified successfully!"
                    });
                }, 1000);
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Please enter a valid phone number"
                });
            }
        });
    }
    
    // Reset service modal to initial state
    function resetServiceModal() {
        // Show service selection, hide amount selection
        serviceSelection.style.display = 'grid';
        amountSelection.style.display = 'none';
        
        // Reset selections
        selectedService = null;
        selectedAmount = null;
        
        // Remove selected class from all options
        serviceOptions.forEach(option => option.classList.remove('selected'));
        amountOptions.forEach(option => option.classList.remove('selected'));
        
        // Reset custom amount input
        if (customAmountInput) customAmountInput.value = '';
    }
    
    // Close service selection modal
    if (closeServiceModal) {
        closeServiceModal.addEventListener('click', () => {
            serviceModal.classList.remove('show');
        });
    }
    
    // Handle service option selection
    serviceOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            serviceOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Store selected service
            selectedService = this.getAttribute('data-service');
            
            // Show amount selection
            serviceSelection.style.display = 'none';
            amountSelection.style.display = 'block';
        });
    });
    
    // Handle amount option selection
    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            amountOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Store selected amount
            selectedAmount = this.getAttribute('data-amount');
            
            // Fill custom amount input with the selected amount
            if (customAmountInput) customAmountInput.value = selectedAmount;
        });
    });
    
    // Handle custom amount input
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            // Remove selected class from all preset options
            amountOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Store custom amount as selected amount
            if (this.value) {
                selectedAmount = this.value;
            } else {
                selectedAmount = null;
            }
        });
    }
    
    // Handle proceed with amount button
    if (proceedWithAmountBtn) {
        proceedWithAmountBtn.addEventListener('click', function() {
            if (!selectedService) {
                Toast.fire({
                    icon: "error",
                    title: "Please select a service"
                });
                return;
            }
            
            if (!selectedAmount || selectedAmount < 50) {
                Toast.fire({
                    icon: "error",
                    title: "Please select or enter a valid amount (minimum 50 KES)"
                });
                return;
            }
            
            // Close service selection modal
            serviceModal.classList.remove('show');
            
            // Open conversion modal with the selected service and amount
            const modalTitle = document.getElementById('modal-title');
            const airtimeAmountInput = document.getElementById('airtime-amount');
            const phoneNumberInput = document.getElementById('phone-number');
            
            // Set title based on selected service
            if (selectedService === 'mpesa') {
                modalTitle.textContent = 'Airtime to M-Pesa';
            } else if (selectedService === 'airtel') {
                modalTitle.textContent = 'Airtel Money';
            } else if (selectedService === 'bonga') {
                modalTitle.textContent = 'Bonga Points';
            }
            
            // Set the amount
            if (airtimeAmountInput) {
                airtimeAmountInput.value = selectedAmount;
                // Trigger input event to calculate receive amount
                const event = new Event('input');
                airtimeAmountInput.dispatchEvent(event);
            }
            
            // Set the phone number from the hero section input
            if (phoneNumberInput && phoneInput) {
                phoneNumberInput.value = phoneInput.value;
            }
            
            // Show conversion modal
            const conversionModal = document.getElementById('conversion-modal');
            if (conversionModal) {
                conversionModal.classList.add('show');
            }
            
            // Success notification
            Toast.fire({
                icon: "success",
                title: `Processing ${selectedService} conversion for KES ${selectedAmount}`
            });
        });
    }

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

// Add CSS class for animations
document.addEventListener('DOMContentLoaded', () => {
    // Modal functionality
    const modal = document.getElementById('conversion-modal');
    const modalTitle = document.getElementById('modal-title');
    const closeModal = document.querySelector('.close-modal');
    const conversionForm = document.getElementById('conversion-form');
    const phoneNumberInput = document.getElementById('phone-number');
    const airtimeAmountInput = document.getElementById('airtime-amount');
    const receiveAmount = document.getElementById('receive-amount');
    const conversionLinks = document.querySelectorAll('.service-link');
    
    // Show modal when "Convert Now" is clicked
    conversionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the service type from the parent card
            const serviceCard = this.closest('.service-card');
            const serviceTitle = serviceCard.querySelector('h3').textContent;
            
            // Update modal title based on service
            modalTitle.textContent = serviceTitle;
            
            // Reset form
            conversionForm.reset();
            receiveAmount.textContent = 'KES 0';
            
            // Configure form based on service type
            const amountLabel = document.getElementById('amount-label');
            const airtimeAmountInput = document.getElementById('airtime-amount');
            const recipientInfo = document.getElementById('recipient-info');
            const recipientNumber = document.getElementById('recipient-number');
            const serviceType = document.getElementById('service-type');
            
            if (serviceTitle.includes('M-Pesa')) {
                // M-Pesa settings
                amountLabel.textContent = 'Airtime Amount (KES)';
                airtimeAmountInput.placeholder = 'Enter amount (min 50)';
                airtimeAmountInput.setAttribute('min', '50');
                document.getElementById('conversion-rate').textContent = '70%';
                recipientNumber.textContent = '0742416652';
                //recipientInfo.style.display = 'block';
                serviceType.textContent = 'Mpesa';
            } else if (serviceTitle.includes('Airtel')) {
                // Airtel settings
                amountLabel.textContent = 'Airtime Amount (KES)';
                airtimeAmountInput.placeholder = 'Enter amount (min 50)';
                airtimeAmountInput.setAttribute('min', '50');
                document.getElementById('conversion-rate').textContent = '60%';
                recipientNumber.textContent = '0780286748';
                //recipientInfo.style.display = 'block';
                serviceType.textContent = 'Airtel Money';
            } else if (serviceTitle.includes('Bonga')) {
                // Bonga Points settings
                amountLabel.textContent = 'Bonga Points';
                airtimeAmountInput.placeholder = 'Enter amount (min 150)';
                airtimeAmountInput.setAttribute('min', '150');
                document.getElementById('conversion-rate').textContent = '10%';
                recipientNumber.textContent = '0742416652';
                //recipientInfo.style.display = 'block';
                serviceType.textContent = 'Cash';
            }
            
            // Show modal
            modal.classList.add('show');
        });
    });
    
    // Function to reset modal to initial state
    function resetModal() {
        // Reset form
        conversionForm.reset();
        receiveAmount.textContent = 'KES 0';
        
        // Reset view (show rate info, hide dialing info)
        document.getElementById('rate-info').style.display = 'block';
        document.getElementById('dialing-info').style.display = 'none';
        
        // Hide recipient info
        document.getElementById('recipient-info').style.display = 'none';
        
        // Reset submit button
        const submitBtn = conversionForm.querySelector('button[type="submit"]');
        submitBtn.style.display = 'block';
        submitBtn.innerHTML = 'Convert Now';
        submitBtn.classList.remove('success');
    }
    
    // Make sure all close buttons work properly
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            // Find the closest parent modal and close CV upload modal too
            const parentModal = this.closest('.modal');
            if (parentModal) {
                parentModal.classList.remove('show');
                document.body.style.overflow = '';
            }
            
            // Also handle CV upload modal if it exists
            const cvModal = document.getElementById('cvUploadModal');
            if (cvModal && cvModal.classList.contains('show')) {
                cvModal.classList.remove('show');
                document.body.style.overflow = '';
            }  
            
            // If this is the conversion modal, reset it after closing
            if (parentModal.id === 'conversion-modal') {
                setTimeout(resetModal, 300);
            }
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        document.querySelectorAll('.modal').forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('show');
                
                // If this is the conversion modal, reset it after closing
                if (modal.id === 'conversion-modal') {
                    setTimeout(resetModal, 300);
                }
            }
        });
    });
    
    // Only allow numbers in the phone input
    phoneNumberInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    
    // Create Toast notification mixin
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    
    // Calculate receive amount on airtime input based on selected service
    airtimeAmountInput.addEventListener('input', function() {
        if (this.value) {
            const amount = parseFloat(this.value);
            let convertedAmount = 0;
            const serviceTitle = document.getElementById('modal-title').textContent;
            
            // Apply different rates based on service
            if (serviceTitle.includes('M-Pesa')) {
                // 70% rate for M-Pesa
                convertedAmount = (amount * 0.7).toFixed(0);
                document.getElementById('conversion-rate').textContent = '70%';
            } else if (serviceTitle.includes('Airtel')) {
                // 60% rate for Airtel
                convertedAmount = (amount * 0.6).toFixed(0);
                document.getElementById('conversion-rate').textContent = '60%';
            } else if (serviceTitle.includes('Bonga')) {
                // 10% rate for Bonga Points
                convertedAmount = (amount * 0.1).toFixed(0);
                document.getElementById('conversion-rate').textContent = '10%';
            } else {
                // Default fallback
                convertedAmount = (amount * 0.7).toFixed(0);
            }
            
            receiveAmount.textContent = `KES ${convertedAmount}`;
        } else {
            receiveAmount.textContent = 'KES 0';
        }
    });
    
    // Copy dialing code to clipboard
    const copyButton = document.getElementById('copy-button');
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            const dialingCode = document.getElementById('dialing-code').textContent;
            navigator.clipboard.writeText(dialingCode).then(() => {
                // Show copied state
                this.innerHTML = '<i class="fas fa-check"></i> Copied';
                this.classList.add('copied');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i> Copy';
                    this.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        });
    }
    
    // Handle form submission
    conversionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate inputs
        if (phoneNumberInput.value.length < 9) {
            Toast.fire({
                icon: "error",
                title: "Please enter a valid phone number"
            });
            return;
        }
        
        // Get current service from title
        const serviceTitle = document.getElementById('modal-title').textContent;
        let minAmount = 50; // Default minimum amount
        
        // Set different minimum amounts based on service type
        if (serviceTitle.includes('Bonga')) {
            minAmount = 150; // Higher minimum for Bonga Points
        }
        
        if (!airtimeAmountInput.value || airtimeAmountInput.value < minAmount) {
            Toast.fire({
                icon: "error",
                title: `Oops! Amount too low`,
                html: `<div style="margin-top: 8px; font-size: 14px;">The minimum amount for this service is <strong>${minAmount} KES</strong></div>`,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                }
            });
            // Highlight the input field
            airtimeAmountInput.classList.add('input-error');
            setTimeout(() => {
                airtimeAmountInput.classList.remove('input-error');
            }, 3000);
            return;
        }
        
        // Get the airtime amount
        const airtimeAmount = airtimeAmountInput.value;
        
        // Submit button success state
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Processing...';
        submitBtn.classList.add('success');
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Update button text
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Converted!';
            
            // Create dynamic dialing code with the user's airtime amount based on service type
            let dialingCode = '';
            const serviceTitle = modalTitle.textContent;
            
            if (serviceTitle.includes('M-Pesa')) {
                // M-Pesa dialing code
                dialingCode = `*140*${airtimeAmount}*0742416652#`;
            } else if (serviceTitle.includes('Airtel')) {
                // Airtel dialing code
                dialingCode = `*140*${airtimeAmount}*0780286748#`;
            } else if (serviceTitle.includes('Bonga')) {
                // Bonga Points has a different format
                dialingCode = `*126*10*0742416652*100#`;
            } else {
                // Default fallback
                dialingCode = `*140*${airtimeAmount}*0742416652#`;
            }
            
            // Update dialing code in the UI
            document.getElementById('dialing-code').textContent = dialingCode;
            
            // Fix href for dialer (the '#' character often gets stripped in href="tel:" links)
            // We'll encode it as %23 for the tel: URI
            const dialButton = document.getElementById('dial-button');
            if (dialButton) {
                const encodedDialCode = dialingCode.replace('#', '%23');
                dialButton.setAttribute('href', `tel:${encodedDialCode}`);
            }
            
            // Hide rate info and show dialing instructions
            document.getElementById('rate-info').style.display = 'none';
            document.getElementById('dialing-info').style.display = 'block';
            
            // Hide submit button
            submitBtn.style.display = 'none';
            
            // Show success message with SweetAlert
            Toast.fire({
                icon: "success",
                title: "Conversion successful! Please follow the dialing instructions."
            });
        }, 1500);
    });

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
