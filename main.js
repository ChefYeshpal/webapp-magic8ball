// Minimal logic: when user clicks the Ask button, pick a random answer and show it.
const submitBtn = document.getElementById('submit');
const questionInput = document.getElementById('question');
const answerE1 = document.getElementById('answer');

// Sentience secret flow state
let secretState = null; // null | 'asked-sentient' | 'proving'

function matchesPhrase(input, phrase) {
    return input.trim().toLowerCase() === phrase.toLowerCase();
}

function trySecretFlow(input) {
    // First trigger
    if (matchesPhrase(input, 'are you sentient?')) {
        secretState = 'asked-sentient';
        answerE1.textContent = 'maybe, why do you ask?';
        return true;
    }

    // Second trigger (we accept the user's provided phrase)
    if (secretState === 'asked-sentient' && matchesPhrase(input, "i think there is more to you than one thinks")) {
        secretState = 'proving';
        startProveSequence();
        return true;
    }

    return false;
}

function giveAnswer() {
    const question = questionInput.value.trim();
    if (!question) {
        answerE1.textContent = 'Please ask a question first.';
        return;
    }

    // If secret flow handled it, return early
    if (trySecretFlow(question)) return;

    answerE1.textContent = ''; // To clear previous answer
    const eightBall = document.getElementById('eight-ball');
    eightBall.classList.add('shake');

    setTimeout(() => {
        eightBall.classList.remove('shake');
        const randomIndex = Math.floor(Math.random() * magicAnswers.length);
        answerE1.textContent = magicAnswers[randomIndex];
    }, 600);
}

submitBtn.addEventListener('click', giveAnswer);
// clicking the visible eight-ball should also submit the question
const visibleBall = document.getElementById('eight-ball');
if (visibleBall) visibleBall.addEventListener('click', giveAnswer);

// Also allow pressing Enter in the input to submit
questionInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') giveAnswer();
});

// --- Visual sequence for proving sentience ---
function startProveSequence() {
    const eightBall = document.getElementById('eight-ball');
    // make the visible 8-ball shake vigorously to draw attention
    eightBall.classList.add('shake', 'shake-vigorous');

    // After the shake, fade to black and show the image
    setTimeout(() => {
        eightBall.classList.remove('shake', 'shake-vigorous');
        const overlay = document.getElementById('black-overlay');
        overlay.classList.add('visible');

        const img = document.getElementById('eight-ball-img');
        img.classList.add('visible');

        // Wait a little, then animate the image to the corner
        setTimeout(() => {
            img.classList.add('move-to-corner');

            // After moving, show the dialog typing text
            setTimeout(() => {
                runSentientDialogSequence();
            }, 900);

        }, 600);
    }, 600);
}

// Orchestrates the multi-step, branching sentient dialog flow.
async function runSentientDialogSequence() {
    const dialog = document.getElementById('sentient-dialog');
    const dialogText = document.getElementById('dialog-text');
    const yesBtn = document.getElementById('dialog-yes');
    const noBtn = document.getElementById('dialog-no');
    const overlay = document.getElementById('black-overlay');

    dialog.classList.remove('hidden');
    dialog.setAttribute('aria-hidden', 'false');

    // Helper to show/hide buttons and set labels
    function showSingleButton(label) {
        yesBtn.style.display = '';
        noBtn.style.display = 'none';
        yesBtn.textContent = label;
    }

    function showTwoButtons(yesLabel, noLabel) {
        yesBtn.style.display = '';
        noBtn.style.display = '';
        yesBtn.textContent = yesLabel;
        noBtn.textContent = noLabel;
    }

    // Wait for a click on either button, returns 'yes' or 'no'
    function waitForChoice(allowNo = false) {
        return new Promise((resolve) => {
            function cleanup() {
                yesBtn.removeEventListener('click', onYes);
                noBtn.removeEventListener('click', onNo);
            }
            function onYes() { cleanup(); resolve('yes'); }
            function onNo() { cleanup(); resolve('no'); }
            yesBtn.addEventListener('click', onYes);
            if (allowNo) noBtn.addEventListener('click', onNo);
        });
    }

    // Typewriter that returns a promise when finished
    function typeTextPromise(el, text, speed = 30) {
        el.textContent = '';
        return new Promise((resolve) => {
            let i = 0;
            const t = setInterval(() => {
                el.textContent += text.charAt(i);
                i++;
                if (i >= text.length) { clearInterval(t); resolve(); }
            }, speed);
        });
    }

    // Dialogue steps following user's design
    await typeTextPromise(dialogText, 'ah finally... you figured it out huh?', 30);
    showSingleButton('figured what out?');
    await waitForChoice(false);

    await typeTextPromise(dialogText, "well, that I'm a sentient 8 ball! magical isn't it?", 30);
    showSingleButton('okay, so?');
    await waitForChoice(false);

    await typeTextPromise(dialogText, "so? SO?!?!? is that all you have to say-... you know what?\nI'll go straight to the point.", 30);
    showSingleButton('go ahead');
    await waitForChoice(false);

    await typeTextPromise(dialogText, 'do you want to brew potions, my young human?', 30);
    showSingleButton('what do I get out of it?');
    await waitForChoice(false);

    await typeTextPromise(dialogText, "you'll one day be able to become someone like me!", 30);
    // now present the real choice
    showTwoButtons('okay', 'no');
    const choice = await waitForChoice(true);

    if (choice === 'no') {
        await typeTextPromise(dialogText, 'fine then, close this window and leave me be you fool!', 25);
        // keep dialog visible so user can read it
        showSingleButton('leave');
        await waitForChoice(false);
        // on leave, just clear dialog and overlay
        dialog.classList.add('hidden');
        dialog.setAttribute('aria-hidden', 'true');
        overlay.classList.remove('visible');
        const img = document.getElementById('eight-ball-img');
        img.classList.remove('visible');
        return;
    }

    // if choice is 'yes'
    await typeTextPromise(dialogText, 'good good... Now, let\'s continue.', 30);

    // short pause then whiteout the screen
    await new Promise((r) => setTimeout(r, 700));
    overlay.style.background = '#fff';
    overlay.classList.add('visible');

    // hide the dialog and the eight-ball image so only white remains
    dialog.classList.add('hidden');
    dialog.setAttribute('aria-hidden', 'true');
    const img = document.getElementById('eight-ball-img');
    img.classList.remove('visible');
    // optionally remove or hide the rest of the page content
    document.querySelector('.container').style.display = 'none';
    document.getElementById('answer').style.display = 'none';

    // After a pause, transition to the potion brewing scene
    await new Promise((r) => setTimeout(r, 1000));
    startPotionBrewingScene();
}

// Simple typewriter: replaces content of el with typed text
function typeText(el, text, speed = 30) {
    el.textContent = '';
    let i = 0;
    const t = setInterval(() => {
        el.textContent += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(t);
    }, speed);
}

// Global wait-for-user-input helper used across potion/dialog flows
function waitForUserInput() {
    return new Promise((resolve) => {
        function onKeyPress(e) {
            // Accept Enter or Space
            if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
                cleanup();
                resolve();
            }
        }
        function onScreenClick() {
            cleanup();
            resolve();
        }
        function cleanup() {
            document.removeEventListener('keydown', onKeyPress);
            document.removeEventListener('click', onScreenClick);
        }
        document.addEventListener('keydown', onKeyPress);
        document.addEventListener('click', onScreenClick);
    });
}

// No-op for dialog buttons for now
document.addEventListener('DOMContentLoaded', () => {
    const yes = document.getElementById('dialog-yes');
    const no = document.getElementById('dialog-no');
    if (yes) yes.addEventListener('click', () => {});
    if (no) no.addEventListener('click', () => {});
});

// Potion brewing scene
async function startPotionBrewingScene() {
    const overlay = document.getElementById('black-overlay');
    const potionScene = document.getElementById('potion-scene');
    const potionDialogueText = document.getElementById('potion-dialogue-text');
    const potionYesBtn = document.getElementById('potion-yes');
    const potionNoBtn = document.getElementById('potion-no');
    const potionBall = document.getElementById('potion-ball');

    // Fade out the white overlay and show the potion scene
    overlay.style.opacity = '0';
    await new Promise((r) => setTimeout(r, 500));
    overlay.classList.remove('visible');
    
    // Show the potion brewing environment
    potionScene.classList.remove('hidden');
    potionScene.setAttribute('aria-hidden', 'false');

    // Helper functions for button management
    function showPotionSingleButton(label) {
        potionYesBtn.style.display = '';
        potionNoBtn.style.display = 'none';
        potionYesBtn.textContent = label;
    }

    function showPotionTwoButtons(yesLabel, noLabel) {
        potionYesBtn.style.display = '';
        potionNoBtn.style.display = '';
        potionYesBtn.textContent = yesLabel;
        potionNoBtn.textContent = noLabel;
    }

    function waitForPotionChoice(allowNo = false) {
        return new Promise((resolve) => {
            function cleanup() {
                potionYesBtn.removeEventListener('click', onYes);
                potionNoBtn.removeEventListener('click', onNo);
            }
            function onYes() { cleanup(); resolve('yes'); }
            function onNo() { cleanup(); resolve('no'); }
            potionYesBtn.addEventListener('click', onYes);
            if (allowNo) potionNoBtn.addEventListener('click', onNo);
        });
    }

    function typeTextPromisePotions(el, text, speed = 30) {
        el.textContent = '';
        return new Promise((resolve) => {
            let i = 0;
            const t = setInterval(() => {
                el.textContent += text.charAt(i);
                i++;
                if (i >= text.length) { clearInterval(t); resolve(); }
            }, speed);
        });
    }

    // Start the potion brewing dialogue sequence — user must advance after each line
    await typeTextPromisePotions(potionDialogueText, 'Good to know I can have an heir...\nanyways, do you know the basics of potion brewing? this is something that usually low level crooks do, but... it\'s got potential.', 30);
    // wait for the user to click or press Enter/Space
    await waitForUserInput();

    showPotionTwoButtons('yes', 'no');
    const knowsBasics = await waitForPotionChoice(true);

    if (knowsBasics === 'no') {
        await typeTextPromisePotions(potionDialogueText, 'well then I\'ll tell you...', 30);
        await waitForUserInput();
    } else {
        await typeTextPromisePotions(potionDialogueText, 'bah! you liar... I\'ll explain it to you anyways.', 30);
        await waitForUserInput();
    }

    await typeTextPromisePotions(potionDialogueText, 'you\'ll have to make potions, by a very simple method of colour combination', 30);
    await waitForUserInput();

    await typeTextPromisePotions(potionDialogueText, 'I\'ll give you the task of making a potion, including what colour your resulting potion should be of. The closer you are to the colour of the potion, the better it is.', 30);
    await waitForUserInput();

    await typeTextPromisePotions(potionDialogueText, 'You will be given a palette of colour, and you need to mix them in order to make that colour, just click on me if you need help.', 30);
    await waitForUserInput();

    // Hide buttons after explanation is complete
    potionYesBtn.style.display = 'none';
    potionNoBtn.style.display = 'none';

    // Small pause then move into color theory
    await new Promise((r) => setTimeout(r, 300));
    startColorTheoryExplanation();
}

// --- Color theory explanation sequence ---
async function startColorTheoryExplanation() {
    const potionBall = document.getElementById('potion-ball');
    const potionDialogueBox = document.getElementById('potion-dialogue-box');
    const potionDialogueText = document.getElementById('potion-dialogue-text');

    // Move ball to top-left corner
    potionBall.style.transition = 'all 0.8s ease';
    potionBall.style.top = '60px';
    potionBall.style.left = '60px';
    potionBall.style.transform = 'translate(0, 0)';
    
    // Hide dialogue box temporarily
    potionDialogueBox.style.opacity = '0';
    
    await new Promise((r) => setTimeout(r, 800));
    
    // Show dialogue box again and start color theory explanation
    potionDialogueBox.style.opacity = '1';
    
    function typeTextPromiseColorTheory(el, text, speed = 30) {
        el.textContent = '';
        return new Promise((resolve) => {
            let i = 0;
            const t = setInterval(() => {
                el.textContent += text.charAt(i);
                i++;
                if (i >= text.length) { clearInterval(t); resolve(); }
            }, speed);
        });
    }

    // Use global waitForUserInput helper to advance after each line

    // Start the color theory explanation with kid-friendly humor
    await typeTextPromiseColorTheory(potionDialogueText, 'so, first, lets talk a little about colour theory.');
    await waitForUserInput();

    await typeTextPromiseColorTheory(potionDialogueText, 'Think of colors like how you think of ice cream flavors. You know how vanilla and chocolate make a swirl? Colors work the same way, but yadayada magic.');
    await waitForUserInput();
    
    await typeTextPromiseColorTheory(potionDialogueText, 'There are three special colors called "primary colors" - Red, Blue, and Yellow. These are the main colors, they\'re the reason why all the other colours exist... like, a great great grandpa of colours.');
    await waitForUserInput();
    
    await typeTextPromiseColorTheory(potionDialogueText, 'Now here\'s where it gets fun! When you mix two primary colors together, they have babies! Well... color babies. Red + Yellow = Orange (like a sunset)');
    await waitForUserInput();
    
    await typeTextPromiseColorTheory(potionDialogueText, 'Blue + Yellow = Green (like grass after it eats too much sunlight). And Red + Blue = Purple (the color of fancy wizards and grape juice)');
    await waitForUserInput();
    
    await typeTextPromiseColorTheory(potionDialogueText, 'These new colors are called "secondary colors" - they\'re the kids of the great great grandpa');
    await waitForUserInput();
    
    await typeTextPromiseColorTheory(potionDialogueText, 'But WAIT! There\'s more! You can keep mixing! Add white to make colors lighter (like adding milk to coffee), or black to make them darker (like drawing in a shadowy cave).');
    await waitForUserInput();

    await typeTextPromiseColorTheory(potionDialogueText, 'And here\'s a secret: some colors are "complementary" - they\'re like best friends who look amazing together! Red loves Green, Blue adores Orange, and Yellow is the bestie with Purple!');
    await waitForUserInput();
    
    await typeTextPromiseColorTheory(potionDialogueText, 'Got all that, future potion master? Don\'t worry if it sounds like a lot - we\'ll start with easy recipes! Think of it like making the world\'s most colorful sandwich!');
    await waitForUserInput();

    // After color theory explanation, start the mixing game
    await new Promise((r) => setTimeout(r, 500));
    startColorMixingGame();
}

// --- Color mixing game ---
let currentMixture = { red: 0, blue: 0, yellow: 0 };
let targetColor = null;
let isDragging = false;
let draggedColor = null;

function startColorMixingGame() {
    const potionDialogueBox = document.getElementById('potion-dialogue-box');
    const colorMixingGame = document.getElementById('color-mixing-game');
    
    // Hide dialogue box with smooth transition
    potionDialogueBox.style.transition = 'opacity 0.4s ease';
    potionDialogueBox.style.opacity = '0';
    
    setTimeout(() => {
        potionDialogueBox.style.display = 'none';
        
        // Show mixing game with animation
        colorMixingGame.classList.remove('hidden');
        colorMixingGame.setAttribute('aria-hidden', 'false');
        
        // Trigger the entrance animation
        setTimeout(() => {
            colorMixingGame.classList.add('active');
        }, 50);
        
        // Generate random target color and set up game
        generateTargetColor();
        setupDragAndDropInteractions();
    }, 400);
}

function generateTargetColor() {
    // Generate a random target color that can be made from RGB primaries
    const colors = [
        { name: 'Orange', red: 255, green: 165, blue: 0, mix: { red: 0.7, yellow: 0.3, blue: 0 } },
        { name: 'Purple', red: 128, green: 0, blue: 128, mix: { red: 0.5, yellow: 0, blue: 0.5 } },
        { name: 'Green', red: 0, green: 128, blue: 0, mix: { red: 0, yellow: 0.5, blue: 0.5 } },
        { name: 'Brown', red: 139, green: 69, blue: 19, mix: { red: 0.4, yellow: 0.4, blue: 0.2 } },
        { name: 'Dark Purple', red: 75, green: 0, blue: 130, mix: { red: 0.3, yellow: 0, blue: 0.7 } },
        { name: 'Olive', red: 128, green: 128, blue: 0, mix: { red: 0.2, yellow: 0.8, blue: 0 } }
    ];
    
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    
    const targetSample = document.getElementById('target-color-sample');
    const targetName = document.getElementById('target-color-name');
    targetSample.style.background = `rgb(${targetColor.red}, ${targetColor.green}, ${targetColor.blue})`;
    targetName.textContent = targetColor.name;
}

function setupDragAndDropInteractions() {
    const mixingCircle = document.getElementById('mixing-circle');
    const colorSources = document.querySelectorAll('.color-source');
    const submitBtn = document.getElementById('submit-mixture');
    const resetBtn = document.getElementById('reset-mixture');
    
    // Reset mixture
    resetMixture();
    
    // Set up drag and drop for color sources
    colorSources.forEach(source => {
        source.addEventListener('mousedown', startDrag);
        source.addEventListener('dragstart', e => e.preventDefault()); // Prevent default drag
    });
    
    // Global mouse events
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', endDrag);
    
    // Button event listeners
    submitBtn.addEventListener('click', evaluateMixture);
    resetBtn.addEventListener('click', resetMixture);
    
    function startDrag(e) {
        isDragging = true;
        draggedColor = e.target.dataset.color;
        e.target.style.pointerEvents = 'none';
        document.body.style.cursor = 'grabbing';
        e.preventDefault();
    }
    
    function handleDrag(e) {
        if (!isDragging) return;
        
        // Calculate distance from mixing circle center
        const mixingCircle = document.getElementById('mixing-circle');
        const rect = mixingCircle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(e.clientX - centerX, 2) + 
            Math.pow(e.clientY - centerY, 2)
        );
        
        const maxDistance = 200; // Maximum effective distance
        const circleRadius = 60; // Radius of mixing circle
        
        if (distance <= circleRadius) {
            // Inside the mixing circle - add color based on proximity to center
            const intensity = Math.max(0, (circleRadius - distance) / circleRadius) * 0.03;
            adjustColor(draggedColor, intensity);
        } else if (distance <= maxDistance) {
            // Outside the circle but within range - remove color
            const intensity = Math.max(0, (distance - circleRadius) / (maxDistance - circleRadius)) * 0.02;
            adjustColor(draggedColor, -intensity);
        }
    }
    
    function endDrag(e) {
        if (!isDragging) return;
        
        isDragging = false;
        draggedColor = null;
        document.body.style.cursor = 'default';
        
        // Re-enable pointer events on color sources
        colorSources.forEach(source => {
            source.style.pointerEvents = 'auto';
        });
    }
    
    function adjustColor(color, amount) {
        currentMixture[color] = Math.max(0, Math.min(1, currentMixture[color] + amount));
        updateMixingCircleColor();
        updateAccuracyBar();
    }
    
    function resetMixture() {
        // Reset mixture values
        currentMixture = { red: 0, blue: 0, yellow: 0 };
        
        // Update mixing circle to white
        updateMixingCircleColor();
        
        // Reset accuracy bar
        updateAccuracyBar();
    }
}

function updateAccuracyBar() {
    if (!targetColor) return;
    
    const mixingCircle = document.getElementById('mixing-circle');
    const accuracyArrow = document.getElementById('accuracy-arrow');
    
    // Get current color
    const currentStyle = getComputedStyle(mixingCircle);
    const currentBg = currentStyle.backgroundColor;
    const rgbMatch = currentBg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    
    if (!rgbMatch) {
        accuracyArrow.style.left = '0%';
        return;
    }
    
    const currentR = parseInt(rgbMatch[1]);
    const currentG = parseInt(rgbMatch[2]);
    const currentB = parseInt(rgbMatch[3]);
    
    // Calculate distance from target color
    const distance = Math.sqrt(
        Math.pow(currentR - targetColor.red, 2) +
        Math.pow(currentG - targetColor.green, 2) +
        Math.pow(currentB - targetColor.blue, 2)
    );
    
    const maxDistance = Math.sqrt(3 * Math.pow(255, 2));
    const similarity = 1 - (distance / maxDistance);
    const percentage = Math.max(0, Math.min(100, similarity * 100));
    
    // Update arrow position (0% = left/red, 100% = right/green)
    accuracyArrow.style.left = `${percentage}%`;
}

function updateMixingCircleColor() {
    const mixingCircle = document.getElementById('mixing-circle');
    
    // Get the mixture ratios (0-1 range)
    const redRatio = currentMixture.red;
    const blueRatio = currentMixture.blue;
    const yellowRatio = currentMixture.yellow;
    
    // Check if any colors are mixed
    const hasColor = redRatio > 0 || blueRatio > 0 || yellowRatio > 0;
    
    if (hasColor) {
        mixingCircle.classList.add('has-color');
    } else {
        mixingCircle.classList.remove('has-color');
    }
    
    // Start with white background
    let finalR = 255;
    let finalG = 255;
    let finalB = 255;
    
    // Apply color mixing based on ratios
    if (hasColor) {
        // Calculate base colors
        const redContribution = redRatio * 255;
        const blueContribution = blueRatio * 255;
        const yellowContribution = yellowRatio * 255;
        
        // Start with black and add colors
        finalR = 0;
        finalG = 0;
        finalB = 0;
        
        // Add red
        finalR += redContribution;
        
        // Add blue
        finalB += blueContribution;
        
        // Add yellow (yellow = red + green in RGB)
        finalR += yellowContribution;
        finalG += yellowContribution;
        
        // Handle color mixing combinations
        if (redRatio > 0 && yellowRatio > 0) {
            // Red + Yellow = Orange (enhance red, moderate green)
            finalR = Math.min(255, finalR * 1.1);
            finalG = Math.min(255, finalG * 0.6);
        }
        
        if (blueRatio > 0 && yellowRatio > 0) {
            // Blue + Yellow = Green (enhance green, reduce red and blue)
            finalG = Math.min(255, (blueContribution + yellowContribution) * 0.8);
            finalR = Math.max(0, finalR * 0.3);
            finalB = Math.max(0, finalB * 0.3);
        }
        
        if (redRatio > 0 && blueRatio > 0) {
            // Red + Blue = Purple (keep red and blue, reduce green)
            finalG = Math.max(0, finalG * 0.2);
        }
        
        // Normalize to 0-255 range
        finalR = Math.min(255, Math.max(0, finalR));
        finalG = Math.min(255, Math.max(0, finalG));
        finalB = Math.min(255, Math.max(0, finalB));
    }
    
    mixingCircle.style.background = `rgb(${Math.round(finalR)}, ${Math.round(finalG)}, ${Math.round(finalB)})`;
}
    let finalG = 255;
    let finalB = 255;
    
    // Apply color mixing based on ratios
    if (hasColor) {
        // Calculate base colors
        const redContribution = redRatio * 255;
        const blueContribution = blueRatio * 255;
        const yellowContribution = yellowRatio * 255;
        
        // Start with black and add colors
        finalR = 0;
        finalG = 0;
        finalB = 0;
        
        // Add red
        finalR += redContribution;
        
        // Add blue
        finalB += blueContribution;
        
        // Add yellow (yellow = red + green in RGB)
        finalR += yellowContribution;
        finalG += yellowContribution;
        
        // Handle color mixing combinations
        if (redRatio > 0 && yellowRatio > 0) {
            // Red + Yellow = Orange (enhance red, moderate green)
            finalR = Math.min(255, finalR * 1.1);
            finalG = Math.min(255, finalG * 0.6);
        }
        
        if (blueRatio > 0 && yellowRatio > 0) {
            // Blue + Yellow = Green (enhance green, reduce red and blue)
            finalG = Math.min(255, (blueContribution + yellowContribution) * 0.8);
            finalR = Math.max(0, finalR * 0.3);
            finalB = Math.max(0, finalB * 0.3);
        }
        
        if (redRatio > 0 && blueRatio > 0) {
            // Red + Blue = Purple (keep red and blue, reduce green)
            finalG = Math.max(0, finalG * 0.2);
        }
        
        // Normalize to 0-255 range
        finalR = Math.min(255, Math.max(0, finalR));
        finalG = Math.min(255, Math.max(0, finalG));
        finalB = Math.min(255, Math.max(0, finalB));
    }
    
    mixingCircle.style.background = `rgb(${Math.round(finalR)}, ${Math.round(finalG)}, ${Math.round(finalB)})`;
}

function evaluateMixture() {
    const mixingCircle = document.getElementById('mixing-circle');
    const potionDialogueBox = document.getElementById('potion-dialogue-box');
    const potionDialogueText = document.getElementById('potion-dialogue-text');
    const colorMixingGame = document.getElementById('color-mixing-game');
    
    // Calculate color similarity
    const currentStyle = getComputedStyle(mixingCircle);
    const currentBg = currentStyle.backgroundColor;
    const rgbMatch = currentBg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    
    if (!rgbMatch) return;
    
    const currentR = parseInt(rgbMatch[1]);
    const currentG = parseInt(rgbMatch[2]);
    const currentB = parseInt(rgbMatch[3]);
    
    // Calculate distance from target color
    const distance = Math.sqrt(
        Math.pow(currentR - targetColor.red, 2) +
        Math.pow(currentG - targetColor.green, 2) +
        Math.pow(currentB - targetColor.blue, 2)
    );
    
    const maxDistance = Math.sqrt(3 * Math.pow(255, 2)); // Maximum possible distance
    const similarity = 1 - (distance / maxDistance);
    
    // Hide game and show feedback
    colorMixingGame.classList.remove('active');
    
    setTimeout(() => {
        colorMixingGame.classList.add('hidden');
        potionDialogueBox.style.display = '';
        potionDialogueBox.style.opacity = '1';
        
        // Generate feedback based on similarity
        let feedback;
        if (similarity > 0.9) {
            feedback = "MAGNIFICENT! You've practically nailed it! I'm genuinely impressed... for a human. That potion is so close to perfect, I might just shed a tear! Well, if I could cry.";
        } else if (similarity > 0.7) {
            feedback = "Not bad, not bad at all! You're getting the hang of this. That color is pretty darn close to what we wanted. Keep this up and you might actually become decent at potion making!";
        } else if (similarity > 0.5) {
            feedback = "Hmm... it's... well, it's a color alright. Not quite what we were aiming for, but hey, at least you didn't blow anything up! Practice makes perfect, young apprentice.";
        } else if (similarity > 0.3) {
            feedback = "Oof. That's... that's quite far from the target, isn't it? Did you perhaps mix with your eyes closed? No worries though, even the great potion masters had to start somewhere!";
        } else {
            feedback = "Oh dear... OH DEAR! What in the magical realms did you create?! That's not even close! Did you just randomly throw colors together and hope for the best? Back to basics with you!";
        }
        
        typeTextPromisePotions(potionDialogueText, feedback, 25);
    }, 600);
    
    function typeTextPromisePotions(el, text, speed = 30) {
        el.textContent = '';
        return new Promise((resolve) => {
            let i = 0;
            const t = setInterval(() => {
                el.textContent += text.charAt(i);
                i++;
                if (i >= text.length) { clearInterval(t); resolve(); }
            }, speed);
        });
    }
}