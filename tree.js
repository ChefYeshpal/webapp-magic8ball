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
    continueButton.textContent = 'See the outcome...';
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
  
  // Always show the next dialogue first, then handle ending logic
  setTimeout(() => {
    currentDialogueId = nextDialogueId;
    displayCurrentDialogue();
    
    // Reinitialize mouse tracking for new buttons
    if (window.initMouseTracking) {
      setTimeout(window.initMouseTracking, 100);
    }
  }, 2000);
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
  
  // Create restart option with clear "go again" language
  const restartButton = document.createElement('button');
  restartButton.className = 'option-btn restart';
  restartButton.textContent = 'Do you want to help Timmy again?';
  restartButton.addEventListener('click', restartStory);
  container.appendChild(restartButton);
  
  // Create alternative option for variety
  const differentPathButton = document.createElement('button');
  differentPathButton.className = 'option-btn summary';
  differentPathButton.textContent = 'Try a different path with Timmy';
  differentPathButton.addEventListener('click', restartStory);
  container.appendChild(differentPathButton);
  
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
    safety_specialist_success: "Your practical advice helped Timmy turn his fears into strengths! By embracing safety and preparation, he became a leader and found his calling in making science safer for everyone!",
    academic_excellence_success: "Your encouragement pushed Timmy to excel beyond basic requirements! His curiosity led him to advanced concepts and academic greatness!",
    understanding_teacher_success: "Your wisdom helped Timmy look beyond Professor Meltdown's intimidating exterior to discover a passionate educator! Understanding people is as important as understanding chemistry!",
    creative_learning_success: "Your support of unconventional methods led to educational innovation! Timmy proved that safety and creativity can transform learning into entertainment!",
    safety_leadership_success: "Your practical guidance helped Timmy become a responsible leader! He turned his concerns into proactive solutions that benefit everyone!",
    science_comedy_success: "Your encouragement of humor made learning joyful! Timmy's comedy approach proves that laughter is the best teacher!",
    humor_learning_success: "Your support of puns and humor helped Timmy make chemistry memorable and fun! Sometimes the silliest approaches work best!",
    comedy_career_success: "Your belief in Timmy's comedic talent launched a career! He's making science accessible to millions through laughter!",
    teacher_student_comedy_partnership: "Your guidance fostered a unique collaboration! Timmy and his teacher proved that humor can bridge any gap!",
    kinesthetic_learning_success: "Your support of movement-based learning revolutionized education! Timmy proved that bodies and minds learn together!",
    collaborative_music_learning: "Your encouragement of sharing turned individual talent into collective success! Music made the whole class better!",
    advanced_musical_chemistry: "Your push for excellence led to sophisticated artistic achievement! Timmy proves that science and art can reach incredible heights together!",
    chaos_theory_education_success: "Your embrace of unconventional methods led to scientific breakthroughs! Sometimes chaos is the best teacher!",
    pet_education_empire: "Your entrepreneurial support helped Timmy create something unique! Who knew pets could be such effective teachers?",
    hybrid_learning_methodology: "Your wisdom helped Timmy find balance between chaos and structure! The best solutions often combine opposites!",
    culinary_philosophy_success: "Your support of unconventional paths led to wisdom and entrepreneurship! Philosophy can be found in the most unexpected places!",
    scientific_poetry_mastery: "Your encouragement of artistic expression led to literary achievement! Science and poetry proved to be perfect partners!",
    space_food_scientist: "Your motivational guidance helped Timmy aim high and achieve extraordinary things! Sometimes the simplest starting points lead to the stars!",
    realistic_goals_achievement: "Your grounding wisdom helped Timmy overcome unnecessary fears and achieve realistic success! Sometimes the simplest approach is best!",
    wisdom_through_uncertainty: "Your zen guidance taught Timmy that not knowing is the beginning of wisdom! Curiosity conquered fear!",
    direct_approach_success: "Your practical advice proved that communication solves most problems! Simple solutions are often the most effective!",
    overpreparation_reward: "Your support of thorough preparation led to unexpected opportunities! Sometimes doing too much is just enough!",
    collaborative_leadership_success: "Your social guidance helped Timmy discover leadership through collaboration! Together everyone achieves more!",
    creative_education_entrepreneur: "Your support of unconventional methods led to business innovation! Creativity can be surprisingly profitable!",
    teaching_career_inspiration: "Your generous guidance showed Timmy the joy of helping others! The best way to learn is to teach!",
    educational_media_success: "Your modern approach helped Timmy master digital education! Technology amplifies good teaching!",
    time_management_mastery: "Your systematic guidance taught Timmy that organization is a learnable skill! Math applies to life, not just textbooks!",
    sustainable_study_success: "Your balanced approach proved that consistency beats intensity! Sustainable habits create lasting success!",
    emotional_wellness_innovation: "Your understanding support helped Timmy pioneer emotional intelligence! Mental health is the foundation of all success!",
    time_management_business_success: "Your efficiency guidance launched an entrepreneurial career! Good habits can become profitable skills!",
    knowledge_over_fear_triumph: "Your focus on substance over style helped Timmy overcome intimidation! Knowledge is the best armor against fear!",
    anxiety_driven_excellence: "Your understanding that fear can motivate helped turn panic into performance! Sometimes anxiety is energy in disguise!",
    judge_not_by_appearances_success: "Your wisdom about looking deeper helped Timmy discover that first impressions can deceive! Understanding trumps assumptions!",
    methodical_learning_victory: "Your systematic approach proved that slow and steady wins the race! Breaking problems into pieces makes them manageable!",
    misconception_correction_mastery: "Your correction helped Timmy become an expert at fixing misunderstandings! Sometimes one small truth unlocks everything!",
    learning_from_failure_success: "Your support through failure helped Timmy discover that mistakes are teachers! Wisdom often comes disguised as failure!",
    interdisciplinary_career_success: "Your encouragement to find alternative paths led to unexpected career success! Different doesn't mean wrong!",
    memorable_enthusiasm_triumph: "Your support of authentic expression proved that being genuinely enthusiastic beats being artificially perfect! Passion is infectious!",
    genuine_enthusiasm_victory: "Your guidance toward authenticity created real connection! Sincerity builds bridges that performance cannot!",
    chemistry_dance_educator_success: "Your kinesthetic support launched a movement revolution! Bodies and minds learn better together!"
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
