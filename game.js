/**
 * Number Memory Game
 * A game to test the ability to memorize numerical digits
 */

class NumberMemoryGame {
  constructor() {
    this.score = 0;
    this.currentLength = 6;
    this.isGameActive = false;
    this.currentQuestion = '';
    this.timers = [];
    
    // DOM elements
    this.elements = {
      score: document.getElementById('score'),
      levelInfo: document.getElementById('levelInfo'),
      questionContainer: document.getElementById('questionContainer'),
      question: document.getElementById('question'),
      answerContainer: document.getElementById('answerContainer'),
      answerInput: document.getElementById('answerInput'),
      submitBtn: document.getElementById('submitBtn'),
      resultContainer: document.getElementById('resultContainer'),
      result: document.getElementById('result'),
      correctAnswer: document.getElementById('correctAnswer'),
      userAnswer: document.getElementById('userAnswer'),
      startBtn: document.getElementById('startBtn'),
      resetBtn: document.getElementById('resetBtn'),
    };
    
    this.initializeEventListeners();
  }

  /**
   * Initialize all event listeners
   */
  initializeEventListeners() {
    this.elements.startBtn.addEventListener('click', () => this.startGame());
    this.elements.resetBtn.addEventListener('click', () => this.resetGame());
    this.elements.submitBtn.addEventListener('click', () => this.checkAnswer());
    this.elements.answerInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.checkAnswer();
      }
    });
    
    // Only allow digits in input
    this.elements.answerInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }

  /**
   * Start the game
   */
  startGame() {
    this.isGameActive = true;
    this.elements.startBtn.style.display = 'none';
    this.elements.resetBtn.style.display = 'inline-block';
    this.elements.answerInput.focus();
    
    this.nextRound();
  }

  /**
   * Reset the game to initial state
   */
  resetGame() {
    this.clearAllTimers();
    this.score = 0;
    this.currentLength = 6;
    this.isGameActive = false;
    this.currentQuestion = '';
    
    this.updateScore();
    this.hideLevelInfo();
    this.elements.question.textContent = '';
    this.elements.answerContainer.style.display = 'none';
    this.elements.resultContainer.style.display = 'none';
    this.elements.startBtn.style.display = 'inline-block';
    this.elements.resetBtn.style.display = 'none';
    this.elements.answerInput.value = '';
  }

  /**
   * Move to the next round
   */
  nextRound() {
    if (!this.isGameActive) return;
    
    this.generateQuestion();
    this.showQuestion();
    
    // Hide question after 2.5 seconds
    const questionTimer = setTimeout(() => {
      this.hideQuestion();
      
      // Show answer input after 0.5 second pause
      const pauseTimer = setTimeout(() => {
        this.showAnswerInput();
      }, 500);
      
      this.timers.push(pauseTimer);
    }, 2500);
    
    this.timers.push(questionTimer);
  }

  /**
   * Generate a random number of the current length
   */
  generateQuestion() {
    const min = Math.pow(10, this.currentLength - 1);
    const max = Math.pow(10, this.currentLength) - 1;
    this.currentQuestion = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Display the question with proper digit grouping
   */
  showQuestion() {
    const formattedNumber = this.formatNumberWithGroups(this.currentQuestion);
    this.elements.question.textContent = formattedNumber;
    this.elements.questionContainer.style.display = 'block';
  }

  /**
   * Hide the question
   */
  hideQuestion() {
    this.elements.question.textContent = '';
  }

  /**
   * Show the answer input section
   */
  showAnswerInput() {
    this.elements.answerContainer.style.display = 'block';
    this.elements.answerInput.focus();
    this.elements.submitBtn.disabled = false;
  }

  /**
   * Check the user's answer
   */
  checkAnswer() {
    const userAnswer = this.elements.answerInput.value.trim();
    
    // Validate input length
    if (userAnswer.length !== this.currentLength) {
      this.showLengthError();
      return;
    }
    
    // Check if answer is correct
    const isCorrect = parseInt(userAnswer) === this.currentQuestion;
    
    if (isCorrect) {
      this.handleCorrectAnswer();
    } else {
      this.handleIncorrectAnswer(userAnswer);
    }
    
    // Clear input and hide answer section
    this.elements.answerInput.value = '';
    this.elements.answerContainer.style.display = 'none';
    
    // Show result for 1 second then move to next round
    const resultTimer = setTimeout(() => {
      this.elements.resultContainer.style.display = 'none';
      this.nextRound();
    }, 1000);
    
    this.timers.push(resultTimer);
  }

  /**
   * Show error for incorrect input length
   */
  showLengthError() {
    this.elements.result.textContent = 'Wrong number of digits!';
    this.elements.result.className = 'result incorrect';
    this.elements.correctAnswer.textContent = `Expected: ${this.currentLength} digits`;
    this.elements.userAnswer.textContent = `You entered: ${this.elements.answerInput.value.length} digits`;
    this.elements.resultContainer.style.display = 'block';
    
    // Clear error after 2 seconds
    const errorTimer = setTimeout(() => {
      this.elements.resultContainer.style.display = 'none';
    }, 2000);
    
    this.timers.push(errorTimer);
  }

  /**
   * Handle correct answer
   */
  handleCorrectAnswer() {
    this.score++;
    this.updateScore();
    this.checkLevelUp();
    
    this.elements.result.textContent = '✓ Correct!';
    this.elements.result.className = 'result correct';
    this.elements.correctAnswer.textContent = '';
    this.elements.userAnswer.textContent = '';
    this.elements.resultContainer.style.display = 'block';
  }

  /**
   * Handle incorrect answer
   */
  handleIncorrectAnswer(userAnswer) {
    this.score = Math.max(0, this.score - 1);
    this.updateScore();
    this.checkLevelDown();
    
    this.elements.result.textContent = '✗ Wrong!';
    this.elements.result.className = 'result incorrect';
    this.elements.correctAnswer.textContent = `Correct: ${this.formatNumberWithGroups(this.currentQuestion)}`;
    this.elements.userAnswer.textContent = `Your answer: ${userAnswer}`;
    this.elements.resultContainer.style.display = 'block';
  }

  /**
   * Update the score display
   */
  updateScore() {
    this.elements.score.textContent = this.score;
  }

  /**
   * Check if player should level up
   */
  checkLevelUp() {
    const newLength = this.calculateNewLength();
    if (newLength > this.currentLength) {
      this.currentLength = newLength;
      this.showLevelInfo('Level Up!');
    }
  }

  /**
   * Check if player should level down
   */
  checkLevelDown() {
    const newLength = this.calculateNewLength();
    if (newLength < this.currentLength) {
      this.currentLength = newLength;
      this.showLevelInfo('Level Down!');
    }
  }

  /**
   * Calculate the new length based on score
   */
  calculateNewLength() {
    if (this.score < 5) return 6;
    if (this.score < 12) return 7;
    if (this.score < 19) return 8;
    if (this.score < 26) return 9;
    if (this.score < 33) return 10;
    
    // For scores 33+, increase by 1 for every 7 points
    return 10 + Math.floor((this.score - 33) / 7) + 1;
  }

  /**
   * Show level change information
   */
  showLevelInfo(message) {
    this.elements.levelInfo.textContent = message;
    
    // Hide level info after 2 seconds
    const levelTimer = setTimeout(() => {
      this.hideLevelInfo();
    }, 2000);
    
    this.timers.push(levelTimer);
  }

  /**
   * Hide level change information
   */
  hideLevelInfo() {
    this.elements.levelInfo.textContent = '';
  }

  /**
   * Format number with proper digit grouping based on length
   */
  formatNumberWithGroups(number) {
    const numberStr = number.toString();
    const length = numberStr.length;
    
    if (length <= 6) {
      // 6 digits: two groups of three (e.g., 123 456)
      return numberStr.replace(/(\d{3})(\d{3})/, '$1 $2');
    } else if (length === 7) {
      // 7 digits: one group of three, one of four (e.g., 123 4567)
      return numberStr.replace(/(\d{3})(\d{4})/, '$1 $2');
    } else if (length === 8) {
      // 8 digits: two groups of four (e.g., 1234 5678)
      return numberStr.replace(/(\d{4})(\d{4})/, '$1 $2');
    } else if (length === 9) {
      // 9 digits: three groups of three (e.g., 123 456 789)
      return numberStr.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    } else if (length === 10) {
      // 10 digits: two groups of three, one of four (e.g., 123 456 7890)
      return numberStr.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    } else {
      // More than 10 digits: groups of 4, last group contains remaining
      const groups = [];
      for (let i = 0; i < length; i += 4) {
        groups.push(numberStr.slice(i, i + 4));
      }
      return groups.join(' ');
    }
  }

  /**
   * Clear all active timers
   */
  clearAllTimers() {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers = [];
  }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new NumberMemoryGame();
});
