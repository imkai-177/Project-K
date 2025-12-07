'use strict';

let secretNum = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// Check Button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage('❌No Number!');
  }
  // when guess number is correct
  else if (guess === secretNum) {
    displayMessage('🎉You guess the Right One');
    document.querySelector('.number').textContent = secretNum;
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
  }
  // when guess number is wrong
  else if (guess !== secretNum) {
    if (score > 1) {
      displayMessage(
        guess > secretNum
          ? '📈Wrong Answer...Your answer is too high'
          : '📉Wrong Answer...Your answer is too low'
      );
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥You Lost the Game!');
      document.querySelector('.score').textContent = '0';
    }
  }
});

// Again Button
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNum = Math.trunc(Math.random() * 20) + 1;

  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});

// Enter KEY
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') document.querySelector('.check').click();
});

// ESC KEY
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') document.querySelector('.again').click();
});
