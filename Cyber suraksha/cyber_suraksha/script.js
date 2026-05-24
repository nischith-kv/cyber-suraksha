document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
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

    // Mobile Menu Toggle (Basic implementation)
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(5, 10, 20, 0.95)';
                navLinks.style.padding = '20px 0';
                navLinks.style.borderBottom = '1px solid rgba(0, 240, 255, 0.2)';
            }
        });
    }

    // Demo Scanner Logic
    const scanBtn = document.getElementById('scan-btn');
    const demoInput = document.getElementById('demo-input');
    const scanResult = document.getElementById('scan-result');
    const riskLevel = document.getElementById('risk-level');
    const riskText = document.getElementById('risk-text');

    if (scanBtn && demoInput && scanResult) {
        scanBtn.addEventListener('click', () => {
            const inputValue = demoInput.value.trim();
            if (inputValue === '') {
                alert('Please enter a number or email to scan.');
                return;
            }

            // Simulate scanning process
            scanBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Scanning...';
            scanBtn.disabled = true;

            setTimeout(() => {
                scanResult.classList.remove('hidden');
                
                // Simple randomizer for demo purposes
                const riskScore = Math.random();
                
                riskLevel.className = ''; // Reset classes
                
                if (riskScore > 0.6) {
                    riskLevel.textContent = 'High';
                    riskLevel.classList.add('risk-high');
                    riskText.textContent = `Warning: "${inputValue}" has been reported multiple times for fraudulent activities. Do not engage.`;
                } else if (riskScore > 0.3) {
                    riskLevel.textContent = 'Medium';
                    riskLevel.classList.add('risk-med');
                    riskText.textContent = `Caution: "${inputValue}" shows suspicious patterns but has limited reports. Proceed with care.`;
                } else {
                    riskLevel.textContent = 'Low';
                    riskLevel.classList.add('risk-low');
                    riskText.textContent = `Safe: "${inputValue}" is not currently in our scam database. Still, always stay vigilant.`;
                }

                scanBtn.innerHTML = '<i class="fa-solid fa-radar"></i> Scan';
                scanBtn.disabled = false;
            }, 1500);
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add initial styles and observe feature cards and steps
    const animateElements = document.querySelectorAll('.feature-card, .step, .threat-card');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});
