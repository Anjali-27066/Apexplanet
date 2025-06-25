const answers = [
  "Adds interactivity",
  "<img>",
  "<link rel='stylesheet' href='style.css'>"
];
let selectedAnswers = Array(answers.length).fill(null);
document.querySelectorAll('.option').forEach(button => {
  button.addEventListener('click', function () {
    const questionIndex = parseInt(this.dataset.question);
    const selectedValue = this.dataset.value;
    const questionButtons = document.querySelectorAll(`.option[data-question="${questionIndex}"]`);
    questionButtons.forEach(btn => {
      btn.classList.remove('selected');
    });
    this.classList.add('selected');
    selectedAnswers[questionIndex] = selectedValue;
  });
});
document.getElementById('quizForm').addEventListener('submit', function (e) {
  e.preventDefault();
  let score = 0;
  selectedAnswers.forEach((answer, index) => {
    if (answer === answers[index]) {
      score++;
    }
  });
  document.getElementById('score').textContent = `✅ You scored ${score} out of ${answers.length}`;
});
