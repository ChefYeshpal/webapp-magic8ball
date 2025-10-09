// Dialogue nodes: Each "seeker" node represents what a user/asker says to the Magic 8 Ball (YOU).
// Each options array is what the USER (as the 8 Ball) can reply.
const dialogueTree = [
  {
    text: "Will I pass my big exam?",
    options: [
      { label: "It is certain.", next: 1 },
      { label: "Ask again later.", next: 2 },
      { label: "Don't count on it.", next: 3 }
    ]
  },
  {
    text: "Oh, thanks! Should I study more though?",
    options: [
      { label: "Definitely yes.", next: 4 },
      { label: "Time will tell.", next: 5 }
    ]
  },
  {
    text: "Alright... hmm. What about my love life?",
    options: [
      { label: "Outlook good.", next: 4 },
      { label: "My sources say no.", next: 6 }
    ]
  },
  {
    text: "Aww man... Okay, can I get a tiny hint?",
    options: [
      { label: "Better not tell you now.", next: 2 },
      { label: "You may rely on it.", next: 4 }
    ]
  },
  {
    text: "Wow! You're the best. One last thing—should I take a nap or keep working?",
    options: [
      { label: "Nap time is now.", next: 7 },
      { label: "Keep working, dreamer.", next: 8 }
    ]
  },
  {
    text: "I guess I'll just let fate decide. Thanks, mysterious orb!",
    options: [
      { label: "Farewell, seeker.", next: 0 }
    ]
  },
  {
    text: "Ah, tough break! Thanks for the honesty.",
    options: [
      { label: "Truth is my gift.", next: 0 }
    ]
  },
  {
    text: "Zzz... (The seeker falls asleep. The end!)",
    options: [
      { label: "Restart prophecy.", next: 0 }
    ]
  },
  {
    text: "Hustle never sleeps! Thanks for your guidance.",
    options: [
      { label: "Destiny is yours.", next: 0 }
    ]
  }
];

// Utility: Pick a random root dialogue node (start with first 2-3 for variety)
function getRandomStart() {
  return Math.floor(Math.random() * 3);
}

const dialogueDiv = document.getElementById('seeker-dialogue');
const dialogueTextDiv = dialogueDiv.querySelector('.dialogue-text');
const optionsDiv = document.getElementById('options');
let currentNode = 0;

// Show dialogue node w/ animated fade
function showNode(nodeIdx, fadeInOnly = false) {
  dialogueDiv.classList.remove('visible');
  setTimeout(() => {
    dialogueTextDiv.textContent = dialogueTree[nodeIdx].text;
    dialogueDiv.classList.add('visible');
    
    // Clear existing options
    optionsDiv.innerHTML = '';
    
    // Create new options positioned around the window
    dialogueTree[nodeIdx].options.forEach((opt, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt.label;
      btn.onclick = () => showNode(opt.next);
      
      // Position buttons around the perimeter
      positionOptionButton(btn, index, dialogueTree[nodeIdx].options.length);
      
      optionsDiv.appendChild(btn);
    });
    
    // Initialize mouse tracking for the new buttons
    if (window.initMouseTracking) {
      window.initMouseTracking();
    }
  }, fadeInOnly ? 0 : 480);
}

// Position buttons around the window perimeter
function positionOptionsAroundWindow() {
  const options = document.querySelectorAll('.option-btn');
  const container = document.querySelector('.container');
  const windowRadius = 250; // Adjusted to be visible but outside the 400px window
  const centerX = container.offsetWidth / 2;
  const centerY = container.offsetHeight / 2;
  
  options.forEach((option, index) => {
    const angle = (index / options.length) * 2 * Math.PI;
    const x = centerX + Math.cos(angle) * windowRadius - option.offsetWidth / 2;
    const y = centerY + Math.sin(angle) * windowRadius - option.offsetHeight / 2;
    
    // Ensure options stay within the viewport
    const maxX = container.offsetWidth - option.offsetWidth - 20;
    const maxY = container.offsetHeight - option.offsetHeight - 20;
    
    option.style.left = `${Math.max(20, Math.min(x, maxX))}px`;
    option.style.top = `${Math.max(20, Math.min(y, maxY))}px`;
  });
}

// On first load, pick a random starting node and show
window.onload = () => {
  currentNode = getRandomStart();
  setTimeout(() => showNode(currentNode, true), 350);
};
