/* Number Memory Game */

class NumberMemoryGame {
  constructor() {
    this.score = 0;
    this.currentLength = 6;
    this.currentNumber = '';
    this.timers = [];

    this.initElements();
    this.bindEvents();
    this.startNewRound();
  }

  initElements() {
    this.el = {
      score: document.getElementById('score'),
      currentLength: document.getElementById('currentLength'),
      levelChange: document.getElementById('levelChange'),
      question: document.getElementById('questionContainer'),
      answer: document.getElementById('answerContainer'),
      result: document.getElementById('resultContainer'),
      numberDisplay: document.getElementById('numberDisplay'),
      answerForm: document.getElementById('answerForm'),
      answerInput: document.getElementById('answerInput'),
      resultIcon: document.getElementById('resultIcon'),
      resultText: document.getElementById('resultText'),
      correctAnswer: document.getElementById('correctAnswer'),
      userAnswer: document.getElementById('userAnswer'),
    };
  }

  bindEvents() {
    this.el.answerForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.onSubmitAnswer();
    });
  }

  /* Round lifecycle */
  startNewRound() {
    this.currentNumber = this.generateNumber(this.currentLength);
    this.updateHud();
    this.showQuestion();
  }

  showQuestion() {
    this.el.question.style.display = 'block';
    this.el.answer.style.display = 'none';
    this.el.result.style.display = 'none';

    this.el.numberDisplay.textContent = this.formatDisplay(this.currentNumber);

    this.setTimer(() => {
      this.showPause();
    }, this.getQuestionDurationMs());
  }

  showPause() {
    this.el.numberDisplay.textContent = '';
    this.setTimer(() => {
      this.showAnswer();
    }, 500);
  }

  showAnswer() {
    this.el.question.style.display = 'none';
    this.el.answer.style.display = 'block';
    this.el.result.style.display = 'none';

    this.el.answerInput.value = '';
    this.el.answerInput.focus();
  }

  showResult(isCorrect, userAnswer) {
    this.el.question.style.display = 'none';
    this.el.answer.style.display = 'none';
    this.el.result.style.display = 'block';

    if (isCorrect) {
      this.el.resultIcon.textContent = '✓';
      this.el.resultIcon.className = 'result-icon correct';
      this.el.resultText.textContent = 'Correct!';
      this.el.resultText.className = 'result-text correct';
      this.el.correctAnswer.style.display = 'none';
      this.el.userAnswer.style.display = 'none';
    } else {
      this.el.resultIcon.textContent = '✗';
      this.el.resultIcon.className = 'result-icon wrong';
      this.el.resultText.textContent = 'Wrong!';
      this.el.resultText.className = 'result-text wrong';
      this.el.correctAnswer.textContent = `Correct answer: ${this.formatDisplay(
        this.currentNumber,
      )}`;
      this.el.correctAnswer.style.display = 'block';
      this.el.userAnswer.textContent = `Your answer: ${this.formatDisplay(
        userAnswer,
      )}`;
      this.el.userAnswer.style.display = 'block';
    }

    this.setTimer(() => {
      this.startNewRound();
    }, 1000);
  }

  /* Input handling */
  onSubmitAnswer() {
    const answer = this.el.answerInput.value.trim();

    if (answer.length !== this.currentLength) {
      this.invalidLength();
      return;
    }

    if (!/^\d+$/.test(answer)) {
      this.invalidNumeric();
      return;
    }

    const correct = answer === this.currentNumber;
    if (correct) {
      this.score += 1;
    } else {
      this.score = Math.max(0, this.score - 1);
    }

    this.applyLengthForScore();
    this.updateHud();
    this.showResult(correct, answer);
  }

  invalidLength() {
    this.el.answerInput.style.borderColor = '#dc3545';
    this.el.answerInput.placeholder = `Please enter exactly ${this.currentLength} digits`;
    setTimeout(() => {
      this.el.answerInput.style.borderColor = '#ced4da';
      this.el.answerInput.placeholder = 'Enter number here...';
    }, 1500);
  }

  invalidNumeric() {
    this.el.answerInput.style.borderColor = '#dc3545';
    this.el.answerInput.placeholder = 'Please enter only numbers';
    setTimeout(() => {
      this.el.answerInput.style.borderColor = '#ced4da';
      this.el.answerInput.placeholder = 'Enter number here...';
    }, 1500);
  }

  /* Helpers */
  generateNumber(length) {
    let value = '';
    for (let i = 0; i < length; i += 1) {
      value += Math.floor(Math.random() * 10);
    }
    return value;
  }

  formatDisplay(numberString) {
    const len = numberString.length;

    if (len === 6) {
      return numberString.replace(/(\d{3})(\d{3})/, '$1 $2');
    }
    if (len === 7) {
      return numberString.replace(/(\d{3})(\d{4})/, '$1 $2');
    }
    if (len === 8) {
      return numberString.replace(/(\d{4})(\d{4})/, '$1 $2');
    }
    if (len === 9) {
      return numberString.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    }
    if (len === 10) {
      return numberString.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    }
    // >10: groups of 4, last group contains remaining
    const groups = [];
    for (let i = 0; i < len; i += 4) {
      groups.push(numberString.slice(i, i + 4));
    }
    return groups.join(' ');
  }

  getQuestionDurationMs() {
    const baseMs = 2500; // 6 digits
    const extraDigits = Math.max(0, this.currentLength - 6);
    return baseMs + extraDigits * 500;
  }

  lengthForScore(score) {
    if (score < 5) return 6;
    const extra = Math.floor((score - 5) / 7) + 1; // 5->+1, 12->+2, ...
    return 6 + extra;
  }

  applyLengthForScore() {
    const target = this.lengthForScore(this.score);
    if (target === this.currentLength) return;

    const type = target > this.currentLength ? 'level-up' : 'level-down';
    this.currentLength = target;
    this.flashLevelChange(type);
  }

  flashLevelChange(type) {
    const el = this.el.levelChange;
    el.textContent = type === 'level-up' ? 'level up' : 'level down';
    el.className = `level-change ${type} show`;
    setTimeout(() => {
      el.classList.remove('show');
    }, 1800);
  }

  updateHud() {
    this.el.score.textContent = this.score;
    this.el.currentLength.textContent = this.currentLength;
  }

  /* Timer mgmt */
  setTimer(cb, ms) {
    const t = setTimeout(cb, ms);
    this.timers.push(t);
  }

  clearTimers() {
    this.timers.forEach((t) => clearTimeout(t));
    this.timers = [];
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const game = new NumberMemoryGame();
  window.addEventListener('beforeunload', () => game.clearTimers());
});
