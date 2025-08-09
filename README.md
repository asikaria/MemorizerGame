# Number Memory Game

A challenging memory game where players test their ability to memorize strings of numerical digits.

## 🎮 How to Play

1. **Memorize**: A random number appears on screen for 3 seconds
2. **Wait**: There's a 1-second pause with the number hidden
3. **Answer**: Enter the number you memorized
4. **Score**: Get points for correct answers, lose points for wrong ones
5. **Progress**: Difficulty increases as your score improves

## 🎯 Game Rules

- **Starting Length**: 6 digits
- **Display Time**: 3 seconds to memorize
- **Pause**: 1 second with number hidden
- **Scoring**: +1 for correct, -1 for incorrect (score never goes below 0)
- **Difficulty Increase**: When score exceeds 10, digit length increases by 1
- **Maximum Length**: 10 digits

## 🔢 Digit Grouping

Numbers are displayed in groups for easier memorization:
- **6 digits**: `123 456`
- **7 digits**: `123 4567`
- **8 digits**: `1234 5678`
- **9 digits**: `123 456 789`
- **10 digits**: `123 456 7890`

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Running the Game
1. Open `index.html` in your web browser
2. The game starts automatically
3. Follow the on-screen instructions

### Development Setup
If you want to modify the game:

```bash
# Install dependencies (if you want to use linting/formatting)
npm install

# Run linting
npm run lint

# Format code
npm run format
```

## 🛠️ Technical Details

### Files Structure
- `index.html` - Main HTML structure
- `styles.css` - Game styling and responsive design
- `game.js` - Game logic and functionality

### Technologies Used
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with responsive design
- **JavaScript (ES6+)**: Class-based game architecture
- **CSS Grid/Flexbox**: Layout management
- **CSS Animations**: Smooth transitions and effects

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎨 Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Clean UI**: Light, modern interface with smooth animations
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Input Validation**: Only numeric input allowed
- **Real-time Scoring**: Live score updates
- **Progress Tracking**: Visual feedback on current digit length

## 🔧 Customization

The game is easily customizable:

- **Timing**: Modify display and pause durations in `game.js`
- **Styling**: Update colors and layout in `styles.css`
- **Scoring**: Adjust scoring rules and difficulty progression
- **Digit Lengths**: Change starting length and maximum limits

## 📱 Mobile Experience

- Touch-friendly interface
- Responsive design for all screen sizes
- Optimized input handling for mobile devices
- Smooth animations that work on mobile browsers

## 🎯 Game Strategy Tips

- Focus on the digit groups rather than individual numbers
- Use the visual spacing to your advantage
- Practice with shorter numbers first
- Take advantage of the pause time to mentally review

## 🤝 Contributing

Feel free to contribute improvements:
- Bug fixes
- New features
- UI/UX enhancements
- Performance optimizations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Enjoy testing your memory skills!** 🧠✨
