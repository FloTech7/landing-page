// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Enhanced navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const scrolled = window.scrollY > 100;

  if (scrolled) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Advanced Intersection Observer for fade-in animations with stagger
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

let animationDelay = 0;
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add staggered animation delay
      entry.target.style.animationDelay = `${animationDelay}s`;
      entry.target.classList.add('animate-in');
      animationDelay += 0.1; // Stagger by 100ms

      // Reset delay for new sections
      if (animationDelay > 0.5) animationDelay = 0;
    }
  });
}, observerOptions);

// Observe all sections and cards for animations
document.querySelectorAll('.section, .service-card, .step, .portfolio-item, .demo-card, .why-item, .pricing-card').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(element);
});

// Add animate-in class styles via JavaScript
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Enhanced form handling with better UX
const contactForm = document.getElementById('contactForm');
console.log('Contact form found:', !!contactForm);
if (contactForm) {
  console.log('Contact form element:', contactForm);
  const submitBtn = contactForm.querySelector('button[type="button"]');
  console.log('Submit button found:', !!submitBtn);
  if (submitBtn) {
    console.log('Submit button element:', submitBtn);
    console.log('Adding click listener to button');
    submitBtn.addEventListener('click', function(e) {
      console.log('Button click event fired on:', this);
      e.preventDefault();
      console.log('Prevented default');
      submitBtn.textContent = 'Clicked!'; // Temporary to test

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      console.log('Form data:', data);

      // Enhanced validation with visual feedback
      const requiredFields = ['name', 'email', 'business', 'message'];
      let isValid = true;

      requiredFields.forEach(field => {
        const element = document.getElementById(field);

        if (!data[field] || data[field].trim() === '') {
          element.style.borderColor = '#ef4444';
          element.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.08)';
          element.style.transform = 'translateY(0)';
          isValid = false;
        } else {
          element.style.borderColor = '#10b981';
          element.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.08)';
          element.style.transform = 'translateY(-2px)';
        }
      });

      if (!isValid) {
        // Shake animation for invalid form
        contactForm.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => contactForm.style.animation = '', 500);
        alert('Please fill in all required fields.');
        return;
      }

      // Enhanced loading state
      const originalText = submitBtn.textContent;
      const originalBg = submitBtn.style.background;

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      submitBtn.innerHTML = '<span style="display: inline-block; animation: spin 1s linear infinite;">⟳</span> Sending...';

      // Simulate API call with progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 10;
        if (progress >= 100) {
          clearInterval(progressInterval);

          // Success state
          submitBtn.innerHTML = '✓ Message Sent!';
          submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

          // Redirect to thank you page after 2 seconds
          setTimeout(() => {
            window.location.href = 'thank-you.html';
          }, 2000);
        }
      }, 200);
    });
  }
}

// Add shake and spin animations
const animationStyle = document.createElement('style');
animationStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(animationStyle);

// Enhanced button hover effects with ripple
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px) scale(1.02)';
  });

  btn.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });

  btn.addEventListener('click', function() {
    // Add click ripple effect
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';
    ripple.style.pointerEvents = 'none';

    this.style.position = 'relative';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector('.hero');

  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.backgroundPosition = `center ${rate}px`;
  }
});

// Magnetic effect for buttons (subtle)
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });

  btn.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Uncomment to add typing effect to hero title
// const heroTitle = document.querySelector('.hero-content h1');
// if (heroTitle) {
//   const originalText = heroTitle.textContent;
//   typeWriter(heroTitle, originalText, 30);
// }
        submitBtn.style.background = '';
      }, 3000);
    }, 2000);
  });
}

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function() {
    if (this.href && this.href.startsWith('#')) {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    }
  });
});

// Add hover effects to cards
document.querySelectorAll('.service-card, .portfolio-item, .why-item, .pricing-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px)';
  });

  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Uncomment to add typing effect to hero title
// const heroTitle = document.querySelector('.hero-content h1');
// if (heroTitle) {
//   const originalText = heroTitle.textContent;
//   typeWriter(heroTitle, originalText, 30);
// }