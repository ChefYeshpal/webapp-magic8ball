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
const optionsDiv = document.getElementById('options');
let currentNode = 0;

// Show dialogue node w/ animated fade
function showNode(nodeIdx, fadeInOnly = false) {
  dialogueDiv.classList.remove('visible');
  setTimeout(() => {
    dialogueDiv.textContent = dialogueTree[nodeIdx].text;
    dialogueDiv.classList.add('visible');
    optionsDiv.innerHTML = '';
    dialogueTree[nodeIdx].options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt.label;
      btn.onclick = () => showNode(opt.next);
      optionsDiv.appendChild(btn);
    });
  }, fadeInOnly ? 0 : 480);
}

// On first load, pick a random starting node and show
window.onload = () => {
  currentNode = getRandomStart();
  setTimeout(() => showNode(currentNode, true), 350);
};
