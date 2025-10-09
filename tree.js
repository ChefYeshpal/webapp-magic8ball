const dialogueTree = [
  {
    question: "What is your wish?",
    options: [
      { text: "I want to know my fate", next: 1 },
      { text: "Is luck with me?", next: 2 },
      { text: "Reveal a secret...", next: 3 }
    ]
  },
  {
    question: "The mist clears... You are bold! Dare you ask again?",
    options: [
      { text: "Yes!", next: 4 },
      { text: "No, thanks", next: 0 }
    ]
  },
  {
    question: "Perhaps. You will see a sign before sunset.",
    options: [
      { text: "What sign?", next: 3 },
      { text: "Another question!", next: 0 }
    ]
  },
  {
    question: "Shh... Secrets aren’t free! Offer me a riddle.",
    options: [
      { text: "Riddle: What has keys but can’t open locks?", next: 5 }
    ]
  },
  {
    question: "You are brave. Now, ask the most important one...",
    options: [
      { text: "Will I succeed?", next: 6 },
      { text: "Will I fail?", next: 7 }
    ]
  },
  {
    question: "The answer swirls in music shapes. The answer is: a piano.",
    options: [
      { text: "Again!", next: 0 }
    ]
  },
  {
    question: "Success finds those who persist. Try again later, fortune favors you.",
    options: [
      { text: "Thank you!", next: 0 }
    ]
  },
  {
    question: "Failure is a lesson in disguise. Ask a better question!",
    options: [
      { text: "Restart", next: 0 }
    ]
  }
];

const qDiv = document.getElementById('question');
const optionDiv = document.querySelector('.options');

let curNode = 0;

function showNode(nodeIdx) {
  // Hide question then show next after delay
  qDiv.classList.remove('visible');
  setTimeout(() => {
    qDiv.textContent = dialogueTree[nodeIdx].question;
    qDiv.classList.add('visible');
    // Remove old options
    optionDiv.innerHTML = '';
    dialogueTree[nodeIdx].options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.textContent = opt.text;
      btn.onclick = () => {
        showNode(opt.next);
      };
      optionDiv.appendChild(btn);
    });
  }, 400);
}

window.onload = () => {
  setTimeout(() => showNode(curNode), 200);
};