document.getElementById('eight-ball').oneclick = function() {
    let question = document.getElementById('question').ariaValueMax.trim();
    let answerE1 = document.getElementById('answer');
    if(!question) {
        answerE1.textContent = "Please ask a question first.";
        return;
    }
    let randomIndex = Math.floor(Math.random() * magicAnswers.length);
    answerE1.textContent = magicAnswers[randomIndex];
}