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
    eightBall.classList.add('shake');

    // After the shake, fade to black and show the image
    setTimeout(() => {
        eightBall.classList.remove('shake');
        const overlay = document.getElementById('black-overlay');
        overlay.classList.add('visible');

        const img = document.getElementById('eight-ball-img');
        img.classList.add('visible');

        // Wait a little, then animate the image to the corner
        setTimeout(() => {
            img.classList.add('move-to-corner');

            // After moving, show the dialog typing text
            setTimeout(() => {
                showSentientDialog();
            }, 900);

        }, 600);
    }, 600);
}

function showSentientDialog() {
    const dialog = document.getElementById('sentient-dialog');
    dialog.classList.remove('hidden');
    dialog.setAttribute('aria-hidden', 'false');

    const dialogText = document.getElementById('dialog-text');
    typeText(dialogText, 'ah finally... I like this form more, it\'s... low poly, but easier to maintain.\nso, you wanted to know what I can do huh?');
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