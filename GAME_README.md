# Number Memory Game

A single-page HTML/CSS/JavaScript game designed to test your ability to memorize numerical digits.

## How to Play

1. **Start the Game**: Click the "Start Game" button to begin
2. **Memorize**: A random number will appear on screen for 2.5 seconds
3. **Recall**: After a brief pause, enter the number you remember
4. **Score**: Get points for correct answers, lose points for wrong ones
5. **Progress**: The game gets harder as you improve!

## Game Rules

- **Initial Level**: Starts with 6-digit numbers
- **Display Time**: Numbers are shown for 2.5 seconds
- **Pause**: 0.5 second pause between display and input
- **Scoring**: 
  - +1 point for correct answers
  - -1 point for wrong answers (score never goes below 0)
- **Level Progression**:
  - Score 0-4: 6 digits
  - Score 5-11: 7 digits
  - Score 12-18: 8 digits
  - Score 19-25: 9 digits
  - Score 26-32: 10 digits
  - Score 33+: Increases by 1 digit for every 7 points

## Digit Grouping

Numbers are displayed with spaces for easier reading:
- **6 digits**: 123 456
- **7 digits**: 123 4567
- **8 digits**: 1234 5678
- **9 digits**: 123 456 789
- **10 digits**: 123 456 7890
- **11+ digits**: 1234 5678 9012 345

## Features

- Clean, responsive design
- Real-time score tracking
- Level up/down notifications
- Input validation (digits only)
- Automatic progression
- Keyboard support (Enter key to submit)

## How to Run

1. Download all three files:
   - `index.html`
   - `styles.css`
   - `game.js`
2. Open `index.html` in any modern web browser
3. No server or installation required!

## Browser Compatibility

Works in all modern browsers that support ES6+ JavaScript:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Game Controls

- **Mouse**: Click buttons and input fields
- **Keyboard**: 
  - Enter key to submit answers
  - Tab to navigate between elements
  - Only numeric input allowed

Enjoy testing your memory skills!
