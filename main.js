// Mouse tracking and visual effects for the Magic 8 Ball
let mouseX = 0;
let mouseY = 0;
let highlightedButton = null;
let seekerCard = null;
let connectionPath = null;

// Initialize mouse tracking
function initMouseTracking() {
  const optionButtons = document.querySelectorAll('.option-btn');
  connectionPath = document.getElementById('connection-path');
  seekerCard = document.getElementById('seeker-dialogue');
  
  // Remove existing event listeners
  document.removeEventListener('mousemove', handleMouseMove);
  
  // Add new event listener
  document.addEventListener('mousemove', handleMouseMove);
  
  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    let closestButton = null;
    let minDistance = Infinity;
    
    // Find the closest button to the mouse
    optionButtons.forEach(button => {
      const rect = button.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(mouseX - buttonCenterX, 2) + 
        Math.pow(mouseY - buttonCenterY, 2)
      );
      
      if (distance < minDistance) {
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
}

// Update connection line with wavy animation
function updateConnectionLine() {
  if (!highlightedButton || !seekerCard || !connectionPath) return;
  
  const buttonRect = highlightedButton.getBoundingClientRect();
  const cardRect = seekerCard.getBoundingClientRect();
  const svgRect = document.getElementById('connection-line').getBoundingClientRect();
  
  // Calculate relative positions within the SVG
  const cardCenterX = (cardRect.left + cardRect.width / 2) - svgRect.left;
  const cardCenterY = (cardRect.top + cardRect.height / 2) - svgRect.top;
  
  const buttonCenterX = (buttonRect.left + buttonRect.width / 2) - svgRect.left;
  const buttonCenterY = (buttonRect.top + buttonRect.height / 2) - svgRect.top;
  
  // Create a wavy curved path with multiple control points
  const deltaX = buttonCenterX - cardCenterX;
  const deltaY = buttonCenterY - cardCenterY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
  // Add wave effect with time-based animation
  const time = Date.now() * 0.003;
  const waveAmplitude = 20; // Increased from 15 for more noticeable waves
  const waveFrequency = 2;
  
  // Calculate perpendicular direction for wave
  const perpX = -deltaY / distance;
  const perpY = deltaX / distance;
  
  // Create wavy path with multiple points
  const segments = 5;
  let pathD = `M ${cardCenterX} ${cardCenterY}`;
  
  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const x = cardCenterX + deltaX * t;
    const y = cardCenterY + deltaY * t;
    
    // Add wave displacement
    const waveOffset = Math.sin(t * Math.PI * waveFrequency + time) * waveAmplitude * Math.sin(t * Math.PI);
    const waveX = x + perpX * waveOffset;
    const waveY = y + perpY * waveOffset;
    
    if (i === 1) {
      pathD += ` Q ${waveX} ${waveY}`;
    } else if (i === segments) {
      pathD += ` ${buttonCenterX} ${buttonCenterY}`;
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
      particle.style.background = 'rgba(255, 215, 0, 0.8)';
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
  ember.style.background = `rgba(${255 + Math.random() * 50}, ${150 + Math.random() * 50}, ${Math.random() * 50}, 0.9)`;
  ember.style.borderRadius = '50%';
  ember.style.pointerEvents = 'none';
  ember.style.zIndex = '6';
  
  // Position ember randomly around the button
  const buttonRect = button.getBoundingClientRect();
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * 20 + 10;
  const x = buttonRect.left + buttonRect.width / 2 + Math.cos(angle) * distance;
  const y = buttonRect.top + buttonRect.height / 2 + Math.sin(angle) * distance;
  
  ember.style.left = `${x}px`;
  ember.style.top = `${y}px`;
  
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
document.addEventListener('DOMContentLoaded', () => {
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
  }, 500);
});

// Make initMouseTracking available globally for tree.js
window.initMouseTracking = initMouseTracking;
