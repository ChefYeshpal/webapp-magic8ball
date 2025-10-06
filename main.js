// Minimal logic: when user clicks the Ask button, pick a random answer and show it.
const submitBtn = document.getElementById('submit');
const questionInput = document.getElementById('question');
const answerE1 = document.getElementById('answer');

function giveAnswer() {
    const question = questionInput.value.trim();
    if (!question) {
        answerE1.textContent = 'Please ask a question first.';
        return;
    }

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

// Also allow pressing Enter in the input to submit
questionInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') giveAnswer();
});