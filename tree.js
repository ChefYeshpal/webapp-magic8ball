// Magic 8 Ball Questions and Unique Endings System
const magicQuestions = [
  {
    question: "Will I find love this year?",
    options: [
      { text: "Yes, absolutely", response: "The stars align for romance - love is heading your way within 3 months!" },
      { text: "No, not likely", response: "Focus on loving yourself first, then love will find you when you least expect it." },
      { text: "Maybe", response: "Love works in mysterious ways - stay open to unexpected connections." },
      { text: "Ask your heart", response: "The universe whispers love songs to those who listen with their heart." }
    ]
  },
  {
    question: "Should I quit my job and follow my dreams?",
    options: [
      { text: "Definitely quit", response: "Life is too short for unfulfilling work - your dreams are calling loudly!" },
      { text: "Stay and save", response: "Build your foundation first, then leap - financial security empowers dreams." },
      { text: "Start a side hustle", response: "Test the waters while keeping your safety net - wisdom in balance." },
      { text: "Follow your passion", response: "Passion is the fuel of greatness - let it guide your every decision." }
    ]
  },
  {
    question: "Will I be successful in my new venture?",
    options: [
      { text: "Huge success awaits", response: "Success flows through you like a mighty river - unstoppable and inevitable!" },
      { text: "Challenges ahead", response: "Every challenge is a stepping stone - your struggles forge your strength." },
      { text: "Moderate success", response: "Steady progress builds lasting empires - your patience will be rewarded." },
      { text: "Redefine success", response: "True success is happiness in the journey, not just the destination." }
    ]
  },
  {
    question: "Should I move to a new city for opportunities?",
    options: [
      { text: "Pack your bags", response: "Adventure calls your name - new horizons bring new possibilities!" },
      { text: "Stay and grow", response: "Bloom where you're planted - hidden opportunities surround you here." },
      { text: "Visit first", response: "Wisdom guides the prepared mind - explore before you transplant your roots." },
      { text: "Trust your instincts", response: "Your inner compass never lies - it knows which path leads to happiness." }
    ]
  },
  {
    question: "Will my creative project succeed?",
    options: [
      { text: "Masterpiece incoming", response: "Your creativity is a gift to the world - prepare for recognition and acclaim!" },
      { text: "Keep refining", response: "Great art is never finished, only abandoned - perfectionism is your friend." },
      { text: "Share it now", response: "The world needs your unique voice - don't hide your light under a bushel." },
      { text: "Collaborate", response: "Two creative minds spark brighter than one - seek your creative soulmate." }
    ]
  },
  {
    question: "Will I overcome my current struggles?",
    options: [
      { text: "Victory is certain", response: "You are stronger than your struggles - triumph is written in your stars!" },
      { text: "One step at a time", response: "Mountains are climbed one step at a time - keep moving forward." },
      { text: "Seek help", response: "Courage is asking for help when you need it - your support system awaits." },
      { text: "Find the lesson", response: "Every struggle carries a gift - unwrap the wisdom it offers you." }
    ]
  }
];

let currentQuestionIndex = 0;
let isAnswered = false;

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
    dialogueText.textContent = questionData.question;
    dialogueText.classList.remove('response');
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
  
  const dialogueText = document.getElementById('dialogue-text');
  if (dialogueText) {
    dialogueText.textContent = option.response;
    dialogueText.classList.add('response');
  }
  
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
  
  const windowRadius = 220; // Outside the 350px glass window 
  const centerX = container.offsetWidth / 2;
  const centerY = container.offsetHeight / 2;
  
  options.forEach((option, index) => {
    const angle = (index / options.length) * 2 * Math.PI;
    const x = centerX + Math.cos(angle) * windowRadius - option.offsetWidth / 2;
    const y = centerY + Math.sin(angle) * windowRadius - option.offsetHeight / 2;
    
    // Ensure options stay within the black area (viewport)
    const margin = 30;
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
