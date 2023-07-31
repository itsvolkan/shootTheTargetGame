document.addEventListener('DOMContentLoaded', () => {
  //Author Volkan Aydogdu, 000908933
    const gameContainer = document.getElementById('game-container');
    const scoreDisplay = document.getElementById('score');
    const levelDisplay = document.getElementById('level');
    const startButton = document.getElementById('start-button');
    const exitButton = document.getElementById('exit-button');
    const targetLine = document.getElementById('target-line');
    const gameOverBox = document.getElementById('game-over-box');
    const gameOver = document.getElementById('game-over');
    const bgColorPicker = document.getElementById('bg-color-picker');

    let score = 0;
    let level = 1;
    let gameInterval;
    let gameRunning = false;
    let clickedBalloons = [];
    let animationSpeed = 2;
    let balloonCount = 1;
    const levelScores = [100, 300, 500, 700, 900];



    bgColorPicker.addEventListener('change', () => {
      const bgColor = bgColorPicker.value;
      document.body.style.backgroundColor = bgColor;
      
  });


const toggleButton = document.getElementById('toggle-button');
const bilgiKutucugu = document.getElementById('bilgi-kutucugu');


toggleButton.addEventListener('click', () => {
    if (bilgiKutucugu.style.display === 'none') {
        bilgiKutucugu.style.display = 'block'; 
    } else {
        bilgiKutucugu.style.display = 'none'; 
    }
});



    

    function showGameOver() {
        gameOverBox.style.display = 'block';
        startButton.disabled = false;
        startButton.classList.remove('active');
        startButton.removeEventListener('click', startGame);
        document.addEventListener('keydown', handleKeyPress);
      
        const resetNote = document.createElement('div');
        resetNote.classList.add('reset-note');
        resetNote.textContent = 'Press F5 to Reset';
        gameOverBox.appendChild(resetNote);
      }

  
    function createBalloon() {
      const balloon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      balloon.setAttribute('cx', Math.random() * 90 + 5 + '%');
      balloon.setAttribute('cy', '-10');
      balloon.setAttribute('r', '20');
      balloon.setAttribute('fill', getRandomColor());
      gameContainer.appendChild(balloon);
  
      balloon.addEventListener('click', () => {
        if (gameRunning) {
          gameContainer.removeChild(balloon);
          score += 10;
          scoreDisplay.textContent = score;
          clickedBalloons.push(balloon);
        }
      });
  
      animateBalloon(balloon);
    }
  
    function animateBalloon(balloon) {
      let cy = -10;
      const animationInterval = setInterval(() => {
        if (gameRunning) {
          cy += animationSpeed;
          balloon.setAttribute('cy', cy);
          if (cy > 380) {
            clearInterval(animationInterval);
            gameContainer.removeChild(balloon);
            if (!document.querySelector('circle')) {
              endGame();
            }
          }
          if (cy >= 380 && !clickedBalloons.includes(balloon)) {
            endGame();
          }
        }
      }, 30);
    }
  
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  
    function levelUp() {
      level++;
      levelDisplay.textContent = `Level ${level}`;
      balloonCount += 2;
      animationSpeed += 0.5;
      clearInterval(gameInterval);
      gameInterval = setInterval(createBalloon, 2000 / balloonCount);
      showLevelUpMessage();
    }
  
    function showLevelUpMessage() {
      const levelUpMessage = document.createElement('div');
      levelUpMessage.classList.add('level-up-message');
      levelUpMessage.textContent = `Level Up! You reached Level ${level}!`;
      document.body.appendChild(levelUpMessage);
  
      setTimeout(() => {
        document.body.removeChild(levelUpMessage);
      }, 2000);
    }
  
    function startGame() {
      score = 0;
      level = 1;
      scoreDisplay.textContent = score;
      levelDisplay.textContent = `Level ${level}`;
      gameRunning = true;
      gameOverBox.style.display = 'none';
      startButton.disabled = true;
      clickedBalloons = [];
      startButton.classList.add('active');
      gameInterval = setInterval(createBalloon, 2000);
    }
  
    function stopGame() {
      gameRunning = false;
      clearInterval(gameInterval);
      removeAllBalloons();
      startButton.classList.remove('active');
    }

    function handleKeyPress(event) {
        if (event.code === 'F5') {
          resetGame();
          location.reload(); 
        }
      }
  
    function removeAllBalloons() {
      const balloons = document.querySelectorAll('circle');
      balloons.forEach(balloon => {
        gameContainer.removeChild(balloon);
      });
    }
  
    function endGame() {
      stopGame();
      gameOverBox.style.display = 'block';
      startButton.disabled = false;
      startButton.classList.remove('active');
      newGameButton.style.display = 'block';
      newGameButton.addEventListener('click', startNewGameOnce);
    }
  
    function startNewGameOnce() {
      newGameButton.removeEventListener('click', startNewGameOnce); 
      gameOverBox.style.display = 'none';
      newGameButton.style.display = 'none';
      clickedBalloons = []; 
      enableStartButton(); 
      startGame();
    }
  
    function isBalloon(element) {
      return element.tagName === 'circle';
    }
  
    function disableStartButton() {
      startButton.disabled = true;
      startButton.classList.remove('active');
    }
  
    function enableStartButton() {
      startButton.disabled = false;
      startButton.classList.add('active');
    }
  
    gameContainer.addEventListener('click', (event) => {
      if (gameRunning && isBalloon(event.target)) {
        score += 10;
        scoreDisplay.textContent = score;
        if (score >= levelScores[level - 1]) {
          levelUp();
        }
      } else if (gameRunning) {
        score -= 10; 
        scoreDisplay.textContent = score;
      }
    });
  
    startButton.addEventListener('click', () => {
      startGame();
    });
  
    exitButton.addEventListener('click', () => {
      stopGame();
      window.close();
    });
  });
  