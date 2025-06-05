// Service selection and conversion flow

// Fallback service configuration in case backend API is unreachable
const fallbackServiceConfig = {
    'Safaricom': { conversionRate: 0.7, minAmount: 50, maxAmount: 1000, recipientNumber: '0742416652' },
    'Airtel': { conversionRate: 0.6, minAmount: 50, maxAmount: 1000, recipientNumber: '0780286748' },
    'Bonga Points': { conversionRate: 0.1, minAmount: 150, maxAmount: 1000, recipientNumber: '0742416652' }
};

let serviceConfig = { ...fallbackServiceConfig };

// Load configuration from backend API with graceful fallback
async function loadServiceConfig() {
    try {
        const response = await fetch('/api/get-service-config');
        if (response.ok) {
            serviceConfig = await response.json();
        } else {
            console.error('Failed to fetch config, using fallback');
        }
    } catch (err) {
        console.error('Error fetching service config, using fallback', err);
    }
}

function getConfigForService(titleOrKey) {
    if (!titleOrKey) return fallbackServiceConfig['Safaricom'];
    if (titleOrKey.includes && titleOrKey.includes('M-Pesa')) {
        return serviceConfig['Safaricom'] || fallbackServiceConfig['Safaricom'];
    }
    if (titleOrKey.includes && titleOrKey.includes('Airtel')) {
        return serviceConfig['Airtel'] || fallbackServiceConfig['Airtel'];
    }
    if (titleOrKey.includes && titleOrKey.includes('Bonga')) {
        return serviceConfig['Bonga Points'] || fallbackServiceConfig['Bonga Points'];
    }
    if (titleOrKey === 'mpesa') {
        return serviceConfig['Safaricom'] || fallbackServiceConfig['Safaricom'];
    }
    if (titleOrKey === 'airtel') {
        return serviceConfig['Airtel'] || fallbackServiceConfig['Airtel'];
    }
    if (titleOrKey === 'bonga') {
        return serviceConfig['Bonga Points'] || fallbackServiceConfig['Bonga Points'];
    }
    return fallbackServiceConfig['Safaricom'];
}

document.addEventListener('DOMContentLoaded', async function() {
    await loadServiceConfig();
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
            
            const config = getConfigForService(selectedService);
            if (!selectedAmount || selectedAmount < config.minAmount) {
                Toast.fire({
                    icon: "error",
                    title: `Please select or enter a valid amount (minimum ${config.minAmount} KES)`
                });
                return;
            }
            
            // Close service selection modal
            serviceModal.classList.remove('show');
            
            // Open conversion modal with the selected service and amount
            const modalTitle = document.getElementById('modal-title');
            const airtimeAmountInput = document.getElementById('airtime-amount');
            const phoneNumberInput = document.getElementById('phone-number');
            const amountLabel = document.getElementById('amount-label');
            const recipientNumber = document.getElementById('recipient-number');
            const serviceType = document.getElementById('service-type');
            
            // Set title based on selected service
            let config = getConfigForService(selectedService);
            if (selectedService === 'mpesa') {
                modalTitle.textContent = 'Airtime to M-Pesa';
                serviceType.textContent = 'Mpesa';
            } else if (selectedService === 'airtel') {
                modalTitle.textContent = 'Airtel Money';
                serviceType.textContent = 'Airtel Money';
            } else if (selectedService === 'bonga') {
                modalTitle.textContent = 'Bonga Points';
                serviceType.textContent = 'Cash';
            }

            // Configure form with dynamic values
            amountLabel.textContent = selectedService === 'bonga' ? 'Bonga Points' : 'Airtime Amount (KES)';
            airtimeAmountInput.placeholder = `Enter amount (min ${config.minAmount})`;
            airtimeAmountInput.setAttribute('min', config.minAmount);
            airtimeAmountInput.setAttribute('max', config.maxAmount);
            document.getElementById('conversion-rate').textContent = `${Math.round(config.conversionRate * 100)}%`;
            recipientNumber.textContent = config.recipientNumber;
            
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
});

document.addEventListener('DOMContentLoaded', async () => {
    await loadServiceConfig();
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
            
            // Configure form based on service type using dynamic config
            const amountLabel = document.getElementById('amount-label');
            const airtimeAmountInput = document.getElementById('airtime-amount');
            const recipientNumber = document.getElementById('recipient-number');
            const serviceType = document.getElementById('service-type');

            const cfg = getConfigForService(serviceTitle);

            if (serviceTitle.includes('M-Pesa')) {
                amountLabel.textContent = 'Airtime Amount (KES)';
                serviceType.textContent = 'Mpesa';
            } else if (serviceTitle.includes('Airtel')) {
                amountLabel.textContent = 'Airtime Amount (KES)';
                serviceType.textContent = 'Airtel Money';
            } else if (serviceTitle.includes('Bonga')) {
                amountLabel.textContent = 'Bonga Points';
                serviceType.textContent = 'Cash';
            }

            airtimeAmountInput.placeholder = `Enter amount (min ${cfg.minAmount})`;
            airtimeAmountInput.setAttribute('min', cfg.minAmount);
            airtimeAmountInput.setAttribute('max', cfg.maxAmount);
            document.getElementById('conversion-rate').textContent = `${Math.round(cfg.conversionRate * 100)}%`;
            recipientNumber.textContent = cfg.recipientNumber;
            
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
            
            const cfg = getConfigForService(serviceTitle);
            convertedAmount = (amount * cfg.conversionRate).toFixed(0);
            document.getElementById('conversion-rate').textContent = `${Math.round(cfg.conversionRate * 100)}%`;
            
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
        const cfg = getConfigForService(serviceTitle);
        const minAmount = cfg.minAmount;
        
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
            
            const cfgDial = getConfigForService(serviceTitle);
            if (serviceTitle.includes('Bonga')) {
                dialingCode = `*126*10*${cfgDial.recipientNumber}*100#`;
            } else {
                dialingCode = `*140*${airtimeAmount}*${cfgDial.recipientNumber}#`;
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
});
