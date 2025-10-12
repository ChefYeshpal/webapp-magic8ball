// Mouse tracking and visual effects for the Magic 8 Ball
let mouseX = 0;
let mouseY = 0;
let highlightedButton = null;
let seekerCard = null;
let connectionPath = null;

// Initialize mouse tracking
function initMouseTracking() {
  connectionPath = document.getElementById('connection-path');
  seekerCard = document.getElementById('seeker-dialogue');
  
  // Remove existing event listeners
  document.removeEventListener('mousemove', handleMouseMove);
  
  // Add new event listener
  document.addEventListener('mousemove', handleMouseMove);
}

// Handle mouse movement and button highlighting
function handleMouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Get current option buttons (refreshes each time)
  const optionButtons = document.querySelectorAll('.option-btn');
  const container = document.querySelector('.container');
  const containerRect = container.getBoundingClientRect();
  
  let closestButton = null;
  let minDistance = Infinity;
  
  // Find the closest button to the mouse
  optionButtons.forEach((button) => {
    // Use offsetLeft/offsetTop for consistency with ember positioning
    const buttonCenterX = containerRect.left + button.offsetLeft + button.offsetWidth / 2;
    const buttonCenterY = containerRect.top + button.offsetTop + button.offsetHeight / 2;
    
    const distance = Math.sqrt(
      Math.pow(mouseX - buttonCenterX, 2) + 
      Math.pow(mouseY - buttonCenterY, 2)
    );
    
    if (distance < minDistance && distance < 200) { // Increased threshold to 200px
      minDistance = distance;
      closestButton = button;
    }
  });
  
  // Update highlighted button
  if (highlightedButton !== closestButton) {
    if (highlightedButton) {
      highlightedButton.classList.remove('highlighted');
    }
    
    highlightedButton = closestButton;
    
    if (highlightedButton) {
      highlightedButton.classList.add('highlighted');
      updateConnectionLine();
      createEmbers(highlightedButton); // Add embers effect
    } else {
      hideConnectionLine();
      stopEmbers(); // Stop embers when not highlighted
    }
  }
}

// Update connection line with wavy animation
function updateConnectionLine() {
  if (!highlightedButton || !seekerCard || !connectionPath) return;
  
  const container = document.querySelector('.container');
  const containerRect = container.getBoundingClientRect();
  const svgRect = document.getElementById('connection-line').getBoundingClientRect();
  
  // Use consistent positioning method
  const cardCenterX = seekerCard.offsetLeft + seekerCard.offsetWidth / 2;
  const cardCenterY = seekerCard.offsetTop + seekerCard.offsetHeight / 2;
  
  const buttonCenterX = highlightedButton.offsetLeft + highlightedButton.offsetWidth / 2;
  const buttonCenterY = highlightedButton.offsetTop + highlightedButton.offsetHeight / 2;
  
  // Convert to SVG coordinates
  const svgCardX = containerRect.left + cardCenterX - svgRect.left;
  const svgCardY = containerRect.top + cardCenterY - svgRect.top;
  const svgButtonX = containerRect.left + buttonCenterX - svgRect.left;
  const svgButtonY = containerRect.top + buttonCenterY - svgRect.top;
  
  // Create a wavy curved path with multiple control points
  const deltaX = svgButtonX - svgCardX;
  const deltaY = svgButtonY - svgCardY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
  // Add wave effect with time-based animation
  const time = Date.now() * 0.003;
  const waveAmplitude = 20;
  const waveFrequency = 2;
  
  // Calculate perpendicular direction for wave
  const perpX = -deltaY / distance;
  const perpY = deltaX / distance;
  
  // Create wavy path with multiple points
  const segments = 5;
  let pathD = `M ${svgCardX} ${svgCardY}`;
  
  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const x = svgCardX + deltaX * t;
    const y = svgCardY + deltaY * t;
    
    // Add wave displacement
    const waveOffset = Math.sin(t * Math.PI * waveFrequency + time) * waveAmplitude * Math.sin(t * Math.PI);
    const waveX = x + perpX * waveOffset;
    const waveY = y + perpY * waveOffset;
    
    if (i === 1) {
      pathD += ` Q ${waveX} ${waveY}`;
    } else if (i === segments) {
      pathD += ` ${svgButtonX} ${svgButtonY}`;
    } else {
      pathD += ` T ${waveX} ${waveY}`;
    }
  }
  
  connectionPath.setAttribute('d', pathD);
  connectionPath.style.opacity = '1';
}

// Hide connection line
function hideConnectionLine() {
  if (connectionPath) {
    connectionPath.style.opacity = '0';
  }
}

// Add some particle effects for extra magic
function createParticleEffect() {
  const glassWindow = document.querySelector('.glass-window');
  
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '2px';
      particle.style.height = '2px';
      particle.style.background = 'rgba(99, 153, 255, 0.8)'; /* Blue particles */
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1';
      
      // Random position within the glass window
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      particle.style.left = x + '%';
      particle.style.top = y + '%';
      
      // Animation
      particle.style.animation = 'particleFloat 3s ease-out forwards';
      
      glassWindow.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 3000);
    }, i * 100);
  }
}

// Add particle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes particleFloat {
    0% {
      opacity: 0;
      transform: scale(0) translateY(0);
    }
    20% {
      opacity: 1;
      transform: scale(1) translateY(-10px);
    }
    100% {
      opacity: 0;
      transform: scale(0.5) translateY(-50px);
    }
  }
  
  @keyframes emberFloat {
    0% {
      opacity: 0;
      transform: scale(0) translateY(0) rotate(0deg);
    }
    10% {
      opacity: 1;
      transform: scale(1) translateY(-5px) rotate(90deg);
    }
    90% {
      opacity: 1;
      transform: scale(0.8) translateY(-30px) rotate(270deg);
    }
    100% {
      opacity: 0;
      transform: scale(0) translateY(-40px) rotate(360deg);
    }
  }
`;
document.head.appendChild(style);

// Ember effect variables
let emberInterval = null;
let activeEmbers = [];

// Create embers effect for highlighted button
function createEmbers(button) {
  if (emberInterval) return; // Already creating embers
  
  emberInterval = setInterval(() => {
    if (!button || !button.classList.contains('highlighted')) {
      stopEmbers();
      return;
    }
    
    // Create 2-3 embers per interval
    const emberCount = Math.floor(Math.random() * 2) + 2;
    
    for (let i = 0; i < emberCount; i++) {
      setTimeout(() => {
        createSingleEmber(button);
      }, i * 100);
    }
  }, 300);
}

function createSingleEmber(button) {
  const ember = document.createElement('div');
  ember.className = 'ember-particle';
  ember.style.position = 'absolute';
  ember.style.width = '3px';
  ember.style.height = '3px';
  ember.style.background = `rgba(${99 + Math.random() * 50}, ${153 + Math.random() * 30}, ${255}, 0.9)`; /* Blue-toned embers */
  ember.style.borderRadius = '50%';
  ember.style.pointerEvents = 'none';
  ember.style.zIndex = '6';
  
  // Use offsetLeft/offsetTop for more reliable positioning
  const container = document.querySelector('.container');
  const containerRect = container.getBoundingClientRect();
  
  const buttonCenterX = button.offsetLeft + button.offsetWidth / 2;
  const buttonCenterY = button.offsetTop + button.offsetHeight / 2;
  
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * 25 + 15; // Slightly larger spread
  const x = buttonCenterX + Math.cos(angle) * distance;
  const y = buttonCenterY + Math.sin(angle) * distance;
  
  // Position relative to container
  ember.style.left = `${containerRect.left + x}px`;
  ember.style.top = `${containerRect.top + y}px`;
  
  // Random animation duration
  const duration = 1.5 + Math.random() * 1;
  ember.style.animation = `emberFloat ${duration}s ease-out forwards`;
  
  document.body.appendChild(ember);
  activeEmbers.push(ember);
  
  // Remove ember after animation
  setTimeout(() => {
    if (ember.parentNode) {
      ember.parentNode.removeChild(ember);
      activeEmbers = activeEmbers.filter(e => e !== ember);
    }
  }, duration * 1000);
}

function stopEmbers() {
  if (emberInterval) {
    clearInterval(emberInterval);
    emberInterval = null;
  }
  
  // Remove all active embers
  activeEmbers.forEach(ember => {
    if (ember.parentNode) {
      ember.parentNode.removeChild(ember);
    }
  });
  activeEmbers = [];
}

// Trigger particle effect periodically
setInterval(createParticleEffect, 8000);

// Initialize on page load
// Show content warning modal and defer initialization until consent
document.addEventListener('DOMContentLoaded', () => {
  const grimModal = document.getElementById('grim-modal');
  const yesBtn = document.getElementById('grim-yes');
  const noBtn = document.getElementById('grim-no');

  function openModal() {
    grimModal.hidden = false;
    // add class to body to blur background
    document.body.classList.add('modal-open');
    // trap focus on Yes button
    yesBtn.focus();
    // key handling: Enter = yes, Escape = no
    document.addEventListener('keydown', keyHandler);
  }

  function closeModalAndInit() {
    // play fade-out animation, then hide modal and initialize
    grimModal.classList.add('modal-closing');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', keyHandler);

    grimModal.addEventListener('transitionend', function handler(e) {
      // ensure we only handle the opacity transition
      if (e.propertyName !== 'opacity') return;
      grimModal.removeEventListener('transitionend', handler);
      grimModal.hidden = true;
      grimModal.classList.remove('modal-closing');

      // initialize app after user consents
      setTimeout(() => {
        initMouseTracking();
        createParticleEffect();

        // Start continuous animation loop for wavy line
        function animateWavyLine() {
          if (highlightedButton) {
            updateConnectionLine();
          }
          requestAnimationFrame(animateWavyLine);
        }
        animateWavyLine();
      }, 120);
    }, { once: true });
  }

  function redirectToHiddenLink() {
    // create anchor and click it to avoid showing URL on hover
    const a = document.createElement('a');
    a.className = 'hidden-redirect';
    a.rel = 'noopener noreferrer';
    a.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    // open in same tab as requested
    document.body.appendChild(a);
    a.click();
  }

  // Wire up buttons
  yesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeModalAndInit();
  });

  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // play fade-out then redirect
    grimModal.classList.add('modal-closing');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', keyHandler);
    grimModal.addEventListener('transitionend', function handler(e) {
      if (e.propertyName !== 'opacity') return;
      grimModal.removeEventListener('transitionend', handler);
      grimModal.hidden = true;
      grimModal.classList.remove('modal-closing');
      setTimeout(() => redirectToHiddenLink(), 80);
    }, { once: true });
  });

  function keyHandler(e) {
    // Enter (13) or Space (32) -> yes
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closeModalAndInit();
    }
    // Escape -> no
    if (e.key === 'Escape') {
      e.preventDefault();
      grimModal.classList.add('modal-closing');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', keyHandler);
      grimModal.addEventListener('transitionend', function handler(e) {
        if (e.propertyName !== 'opacity') return;
        grimModal.removeEventListener('transitionend', handler);
        grimModal.hidden = true;
        grimModal.classList.remove('modal-closing');
        setTimeout(() => redirectToHiddenLink(), 80);
      }, { once: true });
    }
  }

  // Open modal immediately on load
  setTimeout(openModal, 120);
});

// Make initMouseTracking available globally for tree.js
window.initMouseTracking = initMouseTracking;
