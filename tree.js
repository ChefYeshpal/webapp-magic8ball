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
  if (!container) return;
  
  // Clear existing options
  container.innerHTML = '';
  
  // If this is an ending dialogue, create a "Continue" button
  if (dialogue.ending) {
    const continueButton = document.createElement('button');
    continueButton.className = 'option-btn wise';
    continueButton.textContent = 'Continue...';
    continueButton.addEventListener('click', () => {
      showPathSummaryDialogue();
    });
    container.appendChild(continueButton);
    positionOptionsAroundWindow();
    return;
  }
  
  // Regular dialogue options
  if (!dialogue.options) return;
  
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
      currentDialogueId = nextDialogueId;
      displayCurrentDialogue();
      
      // Reinitialize mouse tracking for new buttons
      if (window.initMouseTracking) {
        setTimeout(window.initMouseTracking, 100);
      }
    }, 2000);
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
  
  // Show path summary after displaying the final dialogue
  setTimeout(() => {
    showPathSummaryDialogue();
  }, 4000);
}

function showPathSummaryDialogue() {
  if (!currentCharacter || !currentCharacter.getPathSummary) return;
  
  const summary = currentCharacter.getPathSummary();
  const endingDialogue = currentCharacter.getCurrentDialogue(currentDialogueId);
  const dialogueText = document.getElementById('dialogue-text');
  
  if (dialogueText && endingDialogue) {
    const pathDescription = generatePathDescription(summary, endingDialogue);
    
    animateCardFlip(() => {
      dialogueText.textContent = pathDescription;
      dialogueText.style.color = '#ffd700';
      dialogueText.style.fontSize = '1.05em';
      dialogueText.style.fontStyle = 'italic';
    });
  }
  
  // Show restart option after the path summary
  setTimeout(() => {
    createRestartOption();
  }, 4000);
}

function createRestartOption() {
  const container = document.getElementById('options-container');
  if (!container) return;
  
  // Clear existing options
  container.innerHTML = '';
  
  // Create single restart button
  const restartButton = document.createElement('button');
  restartButton.className = 'option-btn restart';
  restartButton.textContent = 'Do you want to start again?';
  restartButton.addEventListener('click', restartStory);
  container.appendChild(restartButton);
  
  positionOptionsAroundWindow();
  
  // Reinitialize mouse tracking
  if (window.initMouseTracking) {
    setTimeout(window.initMouseTracking, 100);
  }
}

function generatePathDescription(summary, endingDialogue) {
  const pathDescriptions = {
    mentorship_success: "Through your wise guidance, Timmy discovered that showing genuine curiosity and building relationships was the key to academic success. He transformed from a panicking student into Professor Meltdown's star pupil!",
    musical_science_success: "Your creative encouragement led Timmy to become a viral science educator! He turned his struggles into songs that help kids worldwide learn chemistry. Sometimes the most unexpected paths lead to the greatest impact!",
    cat_science_revolution: "Your absurd wisdom guided Timmy to embrace chaos as a learning tool! With Mr. Whiskers as his co-researcher, he revolutionized science education by proving that unconventional methods can yield extraordinary results!",
    innovative_learning_success: "Your clever guidance helped Timmy discover that learning comes in many forms! By connecting chemistry to everyday things like ramen, he not only passed his exam but created a whole new way of teaching science!",
    safety_specialist_success: "Your practical advice helped Timmy turn his fears into strengths! By embracing safety and preparation, he became a leader and found his calling in making science safer for everyone!"
  };
  
  const defaultDescription = `Your ${summary.choiceCount} choices guided Timmy through ${summary.pathPersonality.join(', ')} decisions, ultimately leading him to: ${endingDialogue.outcome}. You shaped his destiny through the power of the Magic 8 Ball!`;
  
  return pathDescriptions[endingDialogue.outcome] || defaultDescription;
}

function createEndingOptions() {
  const container = document.getElementById('options-container');
  if (!container) return;
  
  // Clear existing options
  container.innerHTML = '';
  
  // Create restart option
  const restartButton = document.createElement('button');
  restartButton.className = 'option-btn restart';
  restartButton.textContent = 'Help Timmy Again';
  restartButton.addEventListener('click', restartStory);
  container.appendChild(restartButton);
  
  // Create "different path" option for variety
  const differentPathButton = document.createElement('button');
  differentPathButton.className = 'option-btn summary';
  differentPathButton.textContent = 'Try a Different Path';
  differentPathButton.addEventListener('click', restartStory);
  container.appendChild(differentPathButton);
  
  positionOptionsAroundWindow();
  
  // Reinitialize mouse tracking
  if (window.initMouseTracking) {
    setTimeout(window.initMouseTracking, 100);
  }
}

function showPathSummary() {
  // This function now just calls the path summary dialogue
  showPathSummaryDialogue();
}

function restartStory() {
  currentDialogueId = 'start';
  dialogueHistory = [];
  if (currentCharacter && currentCharacter.choiceHistory) {
    currentCharacter.choiceHistory = [];
  }
  displayCurrentDialogue();
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
