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

function initializeMagic8Ball() {
  // Initialize with Timmy's story for now
  if (typeof timmyDialogueTree !== 'undefined') {
    currentCharacter = timmyDialogueTree;
    currentDialogueId = 'start';
    displayCurrentDialogue();
  } else {
    console.error('Timmy dialogue tree not loaded');
  }
  
  // Show the seeker card after a brief delay
  setTimeout(() => {
    const seekerCard = document.getElementById('seeker-dialogue');
    if (seekerCard) {
      seekerCard.classList.add('visible');
    }
  }, 500);
}

function displayCurrentDialogue() {
  if (!currentCharacter) return;
  
  const dialogue = currentCharacter.getCurrentDialogue(currentDialogueId);
  const dialogueText = document.getElementById('dialogue-text');
  
  if (dialogueText && dialogue) {
    // Apply mood-based styling
    const moodStyle = currentCharacter.getMoodStyling(dialogue.mood);
    
    // Animate the card flip before changing text
    animateCardFlip(() => {
      dialogueText.textContent = dialogue.text;
      dialogueText.classList.remove('response');
      
      // Apply mood styling
      Object.assign(dialogueText.style, moodStyle);
      
      // Add special effects for certain moods
      if (dialogue.mood === 'panicked') {
        dialogueText.classList.add('shaking');
      } else {
        dialogueText.classList.remove('shaking');
      }
    });
    
    // Create option buttons for this dialogue
    createDialogueOptions(dialogue);
    positionOptionsAroundWindow();
  }
  
  isAnswered = false;
}

function createDialogueOptions(dialogue) {
  const container = document.getElementById('options-container');
  if (!container || !dialogue.options) return;
  
  // Clear existing options
  container.innerHTML = '';
  
  dialogue.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = `option-btn ${option.tone}`;
    button.textContent = option.text;
    button.setAttribute('data-leads-to', option.leads_to);
    button.setAttribute('data-tone', option.tone);
    button.addEventListener('click', () => handleDialogueChoice(option));
    container.appendChild(button);
  });
}

function handleDialogueChoice(chosenOption) {
  if (isAnswered) return;
  
  // Track the choice
  if (currentCharacter && currentCharacter.trackChoice) {
    currentCharacter.trackChoice(currentDialogueId, chosenOption, chosenOption.leads_to);
  }
  
  // Add choice to history
  dialogueHistory.push({
    from: currentDialogueId,
    choice: chosenOption,
    timestamp: new Date()
  });
  
  // Move to the next dialogue
  const nextDialogueId = chosenOption.leads_to;
  const nextDialogue = currentCharacter.getCurrentDialogue(nextDialogueId);
  
  isAnswered = true;
  
  // If this is an ending dialogue, handle it specially
  if (nextDialogue.ending) {
    setTimeout(() => {
      displayEndingDialogue(nextDialogueId);
    }, 1000);
  } else {
    // Continue the conversation after a brief pause
    setTimeout(() => {
      currentDialogueId = nextDialogueId;
      displayCurrentDialogue();
      
      // Reinitialize mouse tracking for new buttons
      if (window.initMouseTracking) {
        setTimeout(window.initMouseTracking, 100);
      }
    }, 2000);
  }
}

function displayEndingDialogue(endingDialogueId) {
  currentDialogueId = endingDialogueId;
  displayCurrentDialogue();
  
  // Show ending options after displaying the final dialogue
  setTimeout(() => {
    createEndingOptions();
  }, 3000);
}

function createEndingOptions() {
  const container = document.getElementById('options-container');
  if (!container) return;
  
  // Clear existing options
  container.innerHTML = '';
  
  // Create restart and path summary options
  const restartButton = document.createElement('button');
  restartButton.className = 'option-btn restart';
  restartButton.textContent = 'Help Timmy Again';
  restartButton.addEventListener('click', restartStory);
  container.appendChild(restartButton);
  
  const summaryButton = document.createElement('button');
  summaryButton.className = 'option-btn summary';
  summaryButton.textContent = 'See Path Summary';
  summaryButton.addEventListener('click', showPathSummary);
  container.appendChild(summaryButton);
  
  positionOptionsAroundWindow();
  
  // Reinitialize mouse tracking
  if (window.initMouseTracking) {
    setTimeout(window.initMouseTracking, 100);
  }
}

function restartStory() {
  currentDialogueId = 'start';
  dialogueHistory = [];
  if (currentCharacter && currentCharacter.choiceHistory) {
    currentCharacter.choiceHistory = [];
  }
  displayCurrentDialogue();
}

function showPathSummary() {
  if (!currentCharacter || !currentCharacter.getPathSummary) return;
  
  const summary = currentCharacter.getPathSummary();
  const dialogueText = document.getElementById('dialogue-text');
  
  if (dialogueText) {
    animateCardFlip(() => {
      const pathDescription = `Your guidance led Timmy through ${summary.choiceCount} decisions. Your choices were mostly ${summary.pathPersonality.join(', ')} in tone, ultimately leading to: ${summary.finalOutcome}. You shaped his destiny!`;
      dialogueText.textContent = pathDescription;
      dialogueText.style.color = '#ffd700';
      dialogueText.style.fontSize = '1.1em';
    });
  }
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
