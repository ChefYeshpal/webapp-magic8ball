// Mouse tracking and visual effects for the Magic 8 Ball
let mouseX = 0;
let mouseY = 0;
let highlightedButton = null;

// Initialize mouse tracking
function initMouseTracking() {
  const optionButtons = document.querySelectorAll('.option-btn');
  const connectionPath = document.getElementById('connection-path');
  const seekerCard = document.getElementById('seeker-dialogue');
  
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
      } else {
        hideConnectionLine();
      }
    }
  }
  
  function updateConnectionLine() {
    if (!highlightedButton || !seekerCard) return;
    
    const buttonRect = highlightedButton.getBoundingClientRect();
    const cardRect = seekerCard.getBoundingClientRect();
    const svgRect = document.getElementById('connection-line').getBoundingClientRect();
    
    // Calculate relative positions within the SVG
    const cardCenterX = (cardRect.left + cardRect.width / 2) - svgRect.left;
    const cardCenterY = (cardRect.top + cardRect.height / 2) - svgRect.top;
    
    const buttonCenterX = (buttonRect.left + buttonRect.width / 2) - svgRect.left;
    const buttonCenterY = (buttonRect.top + buttonRect.height / 2) - svgRect.top;
    
    // Create a curved path
    const controlX1 = cardCenterX + (buttonCenterX - cardCenterX) * 0.3;
    const controlY1 = cardCenterY + (buttonCenterY - cardCenterY) * 0.3;
    const controlX2 = cardCenterX + (buttonCenterX - cardCenterX) * 0.7;
    const controlY2 = cardCenterY + (buttonCenterY - cardCenterY) * 0.7;
    
    const pathD = `M ${cardCenterX} ${cardCenterY} 
                  C ${controlX1} ${controlY1}, 
                    ${controlX2} ${controlY2}, 
                    ${buttonCenterX} ${buttonCenterY}`;
    
    connectionPath.setAttribute('d', pathD);
    connectionPath.style.opacity = '1';
  }
  
  function hideConnectionLine() {
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
`;
document.head.appendChild(style);

// Trigger particle effect periodically
setInterval(createParticleEffect, 8000);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initMouseTracking();
    createParticleEffect();
  }, 500);
});

// Make initMouseTracking available globally for tree.js
window.initMouseTracking = initMouseTracking;
