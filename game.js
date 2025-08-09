/**
 * Number Memory Game
 * A game to test the ability to memorize strings of numerical digits
 */

class NumberMemoryGame {
  constructor() {
    this.score = 0;
    this.currentLength = 6;
    this.currentNumber = '';
    this.gameState = 'question'; // 'question', 'pause', 'answer', 'result'
    this.timers = {};
    
    this.initializeElements();
    this.bindEvents();
    this.startNewRound();
  }

  /**
   * Initialize DOM element references
   */
  initializeElements() {
    this.elements = {
      score: document.getElementById('score'),
      currentLength: document.getElementById('currentLength'),
      questionSection: document.getElementById('questionSection'),
      answerSection: document.getElementById('answerSection'),
      resultSection: document.getElementById('resultSection'),
      numberDisplay: document.getElementById('numberDisplay'),
      timer: document.getElementById('timer'),
      answerForm: document.getElementById('answerForm'),
      answerInput: document.getElementById('answerInput'),
      resultIcon: document.getElementById('resultIcon'),
      resultText: document.getElementById('resultText'),
      correctAnswer: document.getElementById('correctAnswer'),
      userAnswer: document.getElementById('userAnswer'),
      nextBtn: document.getElementById('nextBtn')
    };
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    this.elements.answerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAnswer();
    });

    this.elements.nextBtn.addEventListener('input', () => {
      this.startNewRound();
    });

    // Prevent non-numeric input
    this.elements.answerInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // Fix the event listener for next button
    this.elements.nextBtn.addEventListener('click', () => {
      this.startNewRound();
    });
  }

  /**
   * Start a new round of the game
   */
  startNewRound() {
    this.clearTimers();
    this.gameState = 'question';
    this.currentNumber = this.generateRandomNumber(this.currentLength);
    
    this.showQuestionSection();
    this.displayNumber(this.currentNumber);
    this.startQuestionTimer();
  }

  /**
   * Generate a random number of specified length
   * @param {number} length - The number of digits to generate
   * @returns {string} Random number as string
   */
  generateRandomNumber(length) {
    let number = '';
    for (let i = 0; i < length; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return number;
  }

  /**
   * Display the number with proper grouping
   * @param {string} number - The number to display
   */
  displayNumber(number) {
    const groupedNumber = this.groupDigits(number);
    this.elements.numberDisplay.textContent = groupedNumber;
  }

  /**
   * Group digits according to the specified rules
   * @param {string} number - The number to group
   * @returns {string} Grouped number with spaces
   */
  groupDigits(number) {
    const length = number.length;
    
    if (length === 6) {
      return `${number.slice(0, 3)} ${number.slice(3)}`;
    } else if (length === 7) {
      return `${number.slice(0, 3)} ${number.slice(3)}`;
    } else if (length === 8) {
      return `${number.slice(0, 4)} ${number.slice(4)}`;
    } else if (length === 9) {
      return `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
    } else if (length === 10) {
      return `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
    }
    
    // Default grouping for other lengths
    return number;
  }

  /**
   * Start the question timer (3 seconds)
   */
  startQuestionTimer() {
    let timeLeft = 3;
    
    this.updateTimer(timeLeft);
    
    this.timers.question = setInterval(() => {
      timeLeft--;
      this.updateTimer(timeLeft);
      
      if (timeLeft <= 0) {
        this.startPause();
      }
    }, 1000);
  }

  /**
   * Update the timer display
   * @param {number} timeLeft - Time remaining in seconds
   */
  updateTimer(timeLeft) {
    this.elements.timer.textContent = `Time remaining: ${timeLeft} second${timeLeft !== 1 ? 's' : ''}`;
  }

  /**
   * Start the pause period (1 second)
   */
  startPause() {
    this.clearTimers();
    this.gameState = 'pause';
    
    this.hideQuestionSection();
    this.elements.timer.textContent = 'Get ready to answer...';
    
    this.timers.pause = setTimeout(() => {
      this.startAnswerPhase();
    }, 1000);
  }

  /**
   * Start the answer phase
   */
  startAnswerPhase() {
    this.gameState = 'answer';
    this.clearTimers();
    
    this.showAnswerSection();
    this.elements.answerInput.focus();
  }

  /**
   * Handle the user's answer submission
   */
  handleAnswer() {
    const userAnswer = this.elements.answerInput.value.trim();
    
    if (!userAnswer) {
      return;
    }

    const isCorrect = userAnswer === this.currentNumber;
    this.updateScore(isCorrect);
    this.showResult(isCorrect, userAnswer);
    
    this.gameState = 'result';
  }

  /**
   * Update the score based on the answer
   * @param {boolean} isCorrect - Whether the answer was correct
   */
  updateScore(isCorrect) {
    if (isCorrect) {
      this.score++;
      this.checkForLengthIncrease();
    } else {
      this.score = Math.max(0, this.score - 1);
    }
    
    this.updateScoreDisplay();
  }

  /**
   * Check if the score warrants an increase in digit length
   */
  checkForLengthIncrease() {
    if (this.score > 10 && this.currentLength < 10) {
      this.currentLength++;
      this.elements.currentLength.textContent = this.currentLength;
    }
  }

  /**
   * Update the score display
   */
  updateScoreDisplay() {
    this.elements.score.textContent = this.score;
  }

  /**
   * Show the result of the answer
   * @param {boolean} isCorrect - Whether the answer was correct
   * @param {string} userAnswer - The user's answer
   */
  showResult(isCorrect, userAnswer) {
    this.hideAnswerSection();
    this.showResultSection();
    
    if (isCorrect) {
      this.showCorrectResult();
    } else {
      this.showIncorrectResult(userAnswer);
    }
  }

  /**
   * Show correct answer result
   */
  showCorrectResult() {
    this.elements.resultIcon.textContent = '✓';
    this.elements.resultIcon.className = 'result-icon correct';
    this.elements.resultText.textContent = 'Correct!';
    this.elements.resultText.className = 'result-text correct';
    
    this.elements.correctAnswer.style.display = 'none';
    this.elements.userAnswer.style.display = 'none';
  }

  /**
   * Show incorrect answer result
   * @param {string} userAnswer - The user's answer
   */
  showIncorrectResult(userAnswer) {
    this.elements.resultIcon.textContent = '✗';
    this.elements.resultIcon.className = 'result-icon incorrect';
    this.elements.resultText.textContent = 'Wrong!';
    this.elements.resultText.className = 'result-text incorrect';
    
    this.elements.correctAnswer.textContent = `Correct answer: ${this.groupDigits(this.currentNumber)}`;
    this.elements.correctAnswer.style.display = 'block';
    
    this.elements.userAnswer.textContent = `Your answer: ${this.groupDigits(userAnswer)}`;
    this.elements.userAnswer.style.display = 'block';
  }

  /**
   * Show the question section
   */
  showQuestionSection() {
    this.elements.questionSection.style.display = 'block';
    this.elements.answerSection.style.display = 'none';
    this.elements.resultSection.style.display = 'none';
  }

  /**
   * Hide the question section
   */
  hideQuestionSection() {
    this.elements.questionSection.style.display = 'none';
  }

  /**
   * Show the answer section
   */
  showAnswerSection() {
    this.elements.answerSection.style.display = 'block';
    this.elements.answerInput.value = '';
  }

  /**
   * Hide the answer section
   */
  hideAnswerSection() {
    this.elements.answerSection.style.display = 'none';
  }

  /**
   * Show the result section
   */
  showResultSection() {
    this.elements.resultSection.style.display = 'block';
  }

  /**
   * Clear all active timers
   */
  clearTimers() {
    Object.values(this.timers).forEach(timer => {
      if (timer) {
        clearTimeout(timer);
        clearInterval(timer);
      }
    });
    this.timers = {};
  }

  /**
   * Reset the game to initial state
   */
  resetGame() {
    this.score = 0;
    this.currentLength = 6;
    this.updateScoreDisplay();
    this.elements.currentLength.textContent = this.currentLength;
    this.startNewRound();
  }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new NumberMemoryGame();
});
