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

// No-op for dialog buttons for now
document.addEventListener('DOMContentLoaded', () => {
    const yes = document.getElementById('dialog-yes');
    const no = document.getElementById('dialog-no');
    if (yes) yes.addEventListener('click', () => {});
    if (no) no.addEventListener('click', () => {});
});