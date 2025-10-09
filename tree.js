// Magic 8 Ball Dialogue Tree System
// Now featuring character-based branching narratives

let currentDialogueId = 'start';
let currentCharacter = null;
let isAnswered = false;
let dialogueHistory = [];

function animateCardFlip(callback) {
  const seekerCard = document.getElementById('seeker-dialogue');
  if (!seekerCard) return;
  
  // Add flipping class to trigger animation
  seekerCard.classList.add('flipping');
  
  // Change text at the midpoint of the animation (when card is "facing inwards")
  setTimeout(() => {
    if (callback) callback();
  }, 600); // Halfway through the 1.2s animation
  
  // Remove flipping class after animation completes
  setTimeout(() => {
    seekerCard.classList.remove('flipping');
  }, 1200);
}

function getRandomQuestion() {
  currentQuestionIndex = Math.floor(Math.random() * magicQuestions.length);
  return magicQuestions[currentQuestionIndex];
}

function initializeMagic8Ball() {
  const question = getRandomQuestion();
  displayQuestion(question);
  createOptionButtons(question.options);
  positionOptionsAroundWindow();
  
  // Show the seeker card after a brief delay
  setTimeout(() => {
    const seekerCard = document.getElementById('seeker-dialogue');
    if (seekerCard) {
      seekerCard.classList.add('visible');
    }
  }, 500);
}

function displayQuestion(questionData) {
  const dialogueText = document.getElementById('dialogue-text');
  if (dialogueText) {
    // Animate the card flip before changing text
    animateCardFlip(() => {
      dialogueText.textContent = questionData.question;
      dialogueText.classList.remove('response');
    });
  }
  isAnswered = false;
}

function createOptionButtons(options) {
  const container = document.getElementById('options-container');
  if (!container) return;
  
  // Clear existing options
  container.innerHTML = '';
  
  options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option.text;
    button.setAttribute('data-response', option.response);
    button.addEventListener('click', () => handleOptionClick(option));
    container.appendChild(button);
  });
}

function handleOptionClick(option) {
  if (isAnswered) return;
  
  // Animate the card flip before showing the response
  animateCardFlip(() => {
    const dialogueText = document.getElementById('dialogue-text');
    if (dialogueText) {
      dialogueText.textContent = option.response;
      dialogueText.classList.add('response');
    }
  });
  
  isAnswered = true;
  
  // Reset after 5 seconds with a new question
  setTimeout(() => {
    const nextQuestion = getRandomQuestion();
    displayQuestion(nextQuestion);
    createOptionButtons(nextQuestion.options);
    positionOptionsAroundWindow();
    
    // Reinitialize mouse tracking for new buttons
    if (window.initMouseTracking) {
      setTimeout(window.initMouseTracking, 100);
    }
  }, 5000);
}

function positionOptionsAroundWindow() {
  const options = document.querySelectorAll('.option-btn');
  const container = document.querySelector('.container');
  if (!container || options.length === 0) return;
  
  const windowRadius = 350; // Move options much farther from center
  const centerX = container.offsetWidth / 2;
  const centerY = container.offsetHeight / 2;
  
  options.forEach((option, index) => {
    const angle = (index / options.length) * 2 * Math.PI;
    const x = centerX + Math.cos(angle) * windowRadius - option.offsetWidth / 2;
    const y = centerY + Math.sin(angle) * windowRadius - option.offsetHeight / 2;
    
    // Ensure options stay within the black area (viewport) with larger margins
    const margin = 80; // Increased margin to prevent clamping
    const maxX = container.offsetWidth - option.offsetWidth - margin;
    const maxY = container.offsetHeight - option.offsetHeight - margin;
    
    option.style.left = `${Math.max(margin, Math.min(x, maxX))}px`;
    option.style.top = `${Math.max(margin, Math.min(y, maxY))}px`;
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initializeMagic8Ball, 100);
});
