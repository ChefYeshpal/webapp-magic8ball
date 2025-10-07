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
    
    await typeTextPromiseColorTheory(potionDialogueText, 'Think of colors like... ice cream flavors! You know how vanilla and chocolate make a swirl? Colors work the same way, but way more magical!');
    await waitForUserInput();
    
    await typeTextPromiseColorTheory(potionDialogueText, 'There are three special colors called "primary colors" - Red, Blue, and Yellow. These are like the superhero colors! They\'re so cool they don\'t need any other colors to exist.');
    await waitForUserInput();
    
    await typeTextPromiseColorTheory(potionDialogueText, 'Now here\'s where it gets FUN! When you mix two primary colors together, they have babies! Well... color babies. Red + Yellow = Orange (like a sunset!)');
    await waitForUserInput();
    
    await typeTextPromiseColorTheory(potionDialogueText, 'Blue + Yellow = Green (like grass after it eats too much sunlight). And Red + Blue = Purple (the color of fancy wizards and grape juice!)');
    await waitForUserInput();
    
    await typeTextPromiseColorTheory(potionDialogueText, 'These new colors are called "secondary colors" - they\'re like the cool kids who are friends with the superheroes.');
    await waitForUserInput();
    
    await typeTextPromiseColorTheory(potionDialogueText, 'But WAIT! There\'s more! You can keep mixing! Add white to make colors lighter (like adding milk to coffee), or black to make them darker (like drawing in a shadowy cave).');
    await waitForUserInput();
    
    await typeTextPromiseColorTheory(potionDialogueText, 'And here\'s a secret: some colors are "complementary" - they\'re like best friends who look amazing together! Red loves Green, Blue adores Orange, and Yellow is BFFs with Purple!');
    await waitForUserInput();
    
    await typeTextPromiseColorTheory(potionDialogueText, 'Got all that, future potion master? Don\'t worry if it sounds like a lot - we\'ll start with easy recipes! Think of it like making the world\'s most colorful sandwich!');
    await waitForUserInput();
}