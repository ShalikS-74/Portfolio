export class RedBlockGameEngine {
  constructor(canvas, difficulty = 'easy') {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.difficulty = difficulty;
    this.canvasWidth = 400;
    this.canvasHeight = 300;

    // Set canvas size
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;

    // Game settings based on difficulty
    this.setupDifficultySettings();

    // Game state
    this.running = false;
    this.gameOver = false;
    this.mouseDown = false;
    this.touchActive = false;

    // Player
    this.player = {
      x: 180,
      y: 130,
      size: this.playerSize,
      color: '#ef4444',
      borderColor: '#eab308',
      borderWidth: 3
    };

    // Enemies
    this.enemies = [];
    this.enemyDirs = [];
    this.enemyCount = this.getEnemyCount();

    // Timing
    this.startTime = null;
    this.survivalTime = 0;
    this.lastTime = 0;

    // Controls
    this.setupControls();

    // High scores
    this.highScore = this.getHighScore();
  }

  setupDifficultySettings() {
    switch (this.difficulty) {
      case 'hard':
        this.playerSize = 45;
        this.invincibilityDuration = 2000; // 2 seconds
        this.baseEnemySpeed = 2;
        this.speedIncreaseInterval = 1500; // 1.5 seconds
        break;
      case 'impossible':
        this.playerSize = 30;
        this.invincibilityDuration = 1000; // 1 second
        this.baseEnemySpeed = 4; // Twice normal speed
        this.speedIncreaseInterval = 1000; // 1 second
        break;
      case 'medium':
        this.playerSize = 30;
        this.invincibilityDuration = 5000; // 5 seconds
        this.baseEnemySpeed = 2;
        this.speedIncreaseInterval = 2000; // 2 seconds
        break;
      default: // easy
        this.playerSize = 30;
        this.invincibilityDuration = 5000; // 5 seconds
        this.baseEnemySpeed = 2;
        this.speedIncreaseInterval = 2500; // 2.5 seconds
    }
  }

  getEnemyCount() {
    switch (this.difficulty) {
      case 'impossible':
        return 8;
      case 'medium':
        return 5;
      case 'hard':
        return 5;
      default:
        return 3;
    }
  }

  setupControls() {
    // Mouse controls
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseleave', this.handleMouseUp.bind(this));

    // Touch controls for mobile
    this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
    this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
  }

  handleMouseDown(e) {
    if (!this.running || this.gameOver) return;
    this.mouseDown = true;
    this.updatePlayerPosition(e);
  }

  handleMouseUp() {
    this.mouseDown = false;
  }

  handleMouseMove(e) {
    if (!this.running || this.gameOver || !this.mouseDown) return;
    this.updatePlayerPosition(e);
  }

  handleTouchStart(e) {
    e.preventDefault();
    if (!this.running || this.gameOver) return;
    this.touchActive = true;
    this.updatePlayerPositionFromTouch(e);
  }

  handleTouchEnd(e) {
    e.preventDefault();
    this.touchActive = false;
  }

  handleTouchMove(e) {
    e.preventDefault();
    if (!this.running || this.gameOver || !this.touchActive) return;
    this.updatePlayerPositionFromTouch(e);
  }

  updatePlayerPosition(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Scale to canvas coordinates
    const scaleX = this.canvasWidth / rect.width;
    const scaleY = this.canvasHeight / rect.height;

    const canvasX = x * scaleX;
    const canvasY = y * scaleY;

    // Center player on cursor, keep inside canvas bounds
    this.player.x = Math.max(0, Math.min(canvasX - this.player.size / 2, this.canvasWidth - this.player.size));
    this.player.y = Math.max(0, Math.min(canvasY - this.player.size / 2, this.canvasHeight - this.player.size));
  }

  updatePlayerPositionFromTouch(e) {
    const rect = this.canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    // Scale to canvas coordinates
    const scaleX = this.canvasWidth / rect.width;
    const scaleY = this.canvasHeight / rect.height;

    const canvasX = x * scaleX;
    const canvasY = y * scaleY;

    // Center player on touch, keep inside canvas bounds
    this.player.x = Math.max(0, Math.min(canvasX - this.player.size / 2, this.canvasWidth - this.player.size));
    this.player.y = Math.max(0, Math.min(canvasY - this.player.size / 2, this.canvasHeight - this.player.size));
  }

  start() {
    this.reset();
    this.running = true;
    this.gameOver = false;
    this.startTime = Date.now();
    this.lastTime = this.startTime;
    this.spawnEnemies();
    this.gameLoop();
  }

  reset() {
    // Reset player position
    this.player.x = 180;
    this.player.y = 130;

    // Clear enemies
    this.enemies = [];
    this.enemyDirs = [];

    // Reset timing
    this.startTime = null;
    this.survivalTime = 0;
    this.currentEnemySpeed = this.baseEnemySpeed;

    // Reset game state
    this.gameOver = false;
  }

  spawnEnemies() {
    this.enemies = [];
    this.enemyDirs = [];
    const enemySize = 50;
    const minDistance = 80; // Minimum distance from player

    for (let i = 0; i < this.enemyCount; i++) {
      let enemy, x, y;

      // Determine shape - impossible mode has mostly rectangles
      const isRectangle = this.difficulty === 'impossible' || i % 2 === 0;

      // Find position that's far enough from player
      let attempts = 0;
      do {
        x = Math.random() * (this.canvasWidth - enemySize);
        y = Math.random() * (this.canvasHeight - (isRectangle ? enemySize * 2 : enemySize));
        attempts++;
      } while (this.getDistance(x, y, this.player.x, this.player.y) < minDistance && attempts < 100);

      enemy = {
        x: x,
        y: y,
        width: enemySize,
        height: isRectangle ? enemySize * 2 : enemySize,
        color: '#3b82f6',
        borderColor: '#1e40af',
        borderWidth: 3,
        isRectangle: isRectangle
      };

      this.enemies.push(enemy);

      // Random direction (ensure not zero)
      const dirX = Math.random() > 0.5 ? 1 : -1;
      const dirY = Math.random() > 0.5 ? 1 : -1;
      this.enemyDirs.push({ x: dirX, y: dirY });
    }
  }

  getDistance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }

  gameLoop() {
    if (!this.running) return;

    const currentTime = Date.now();
    const deltaTime = currentTime - this.lastTime;

    if (!this.gameOver) {
      this.update(deltaTime);
      this.render();
      requestAnimationFrame(() => this.gameLoop());
    }

    this.lastTime = currentTime;
  }

  update(deltaTime) {
    // Update survival time
    this.survivalTime = (Date.now() - this.startTime) / 1000;

    // Move enemies
    this.moveEnemies(deltaTime);

    // Increase difficulty over time
    this.increaseDifficulty();

    // Check collisions (only after invincibility period)
    if (this.survivalTime >= this.invincibilityDuration / 1000 && this.checkCollision()) {
      this.endGame();
    }
  }

  moveEnemies(deltaTime) {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      const dir = this.enemyDirs[i];

      // Calculate new position
      let newX = enemy.x + dir.x * this.currentEnemySpeed;
      let newY = enemy.y + dir.y * this.currentEnemySpeed;

      // Bounce off walls
      if (newX <= 0 || newX + enemy.width >= this.canvasWidth) {
        dir.x *= -1;
        newX = enemy.x + dir.x * this.currentEnemySpeed;
      }

      if (newY <= 0 || newY + enemy.height >= this.canvasHeight) {
        dir.y *= -1;
        newY = enemy.y + dir.y * this.currentEnemySpeed;
      }

      // Occasionally change direction randomly (5% chance)
      if (Math.random() < 0.05) {
        dir.x = Math.random() > 0.5 ? 1 : -1;
        dir.y = Math.random() > 0.5 ? 1 : -1;
      }

      // Update position
      enemy.x = newX;
      enemy.y = newY;
    }
  }

  increaseDifficulty() {
    const speedIncrease = Math.floor(this.survivalTime / (this.speedIncreaseInterval / 1000));
    this.currentEnemySpeed = this.baseEnemySpeed + speedIncrease;
  }

  checkCollision() {
    for (const enemy of this.enemies) {
      if (this.rectIntersect(
        this.player.x, this.player.y, this.player.size, this.player.size,
        enemy.x, enemy.y, enemy.width, enemy.height
      )) {
        return true;
      }
    }
    return false;
  }

  rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  }

  render() {
    // Clear canvas
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Draw player
    this.drawPlayer();

    // Draw enemies
    this.drawEnemies();

    // Draw survival time
    this.drawSurvivalTime();
  }

  drawPlayer() {
    const isInvincible = this.survivalTime < this.invincibilityDuration / 1000;

    // Draw player rectangle
    this.ctx.fillStyle = this.player.color;
    this.ctx.fillRect(this.player.x, this.player.y, this.player.size, this.player.size);

    // Draw border (yellow during invincibility with blinking effect)
    if (isInvincible) {
      const shouldShowBorder = this.shouldShowInvincibilityBorder();
      if (shouldShowBorder) {
        this.ctx.strokeStyle = this.player.borderColor;
        this.ctx.lineWidth = this.player.borderWidth;
        this.ctx.strokeRect(this.player.x, this.player.y, this.player.size, this.player.size);
      }
    }
  }

  shouldShowInvincibilityBorder() {
    const remainingTime = this.invincibilityDuration / 1000 - this.survivalTime;

    if (this.invincibilityDuration <= 2000) {
      // For impossible mode (1-2 seconds), blink for the whole duration
      return Math.floor(this.survivalTime * 5) % 2 === 0;
    } else {
      // For other modes, solid border until last 2 seconds, then blink
      if (remainingTime > 2) {
        return true;
      } else {
        return Math.floor((this.survivalTime - (this.invincibilityDuration / 1000 - 2)) * 5) % 2 === 0;
      }
    }
  }

  drawEnemies() {
    for (const enemy of this.enemies) {
      this.ctx.fillStyle = enemy.color;
      this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

      this.ctx.strokeStyle = enemy.borderColor;
      this.ctx.lineWidth = enemy.borderWidth;
      this.ctx.strokeRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
  }

  drawSurvivalTime() {
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '16px Arial';
    this.ctx.fillText(`Time: ${this.survivalTime.toFixed(2)}s`, 10, 25);
  }

  endGame() {
    this.gameOver = true;
    this.running = false;

    // Update high score
    if (this.survivalTime > this.highScore) {
      this.highScore = this.survivalTime;
      this.saveHighScore();
    }

    // Draw game over screen
    this.drawGameOver();

    // Auto restart after 2 seconds
    setTimeout(() => {
      this.start();
    }, 2000);
  }

  drawGameOver() {
    // Clear and redraw background
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Draw game over text
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 24px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Game Over!', this.canvasWidth / 2, this.canvasHeight / 2 - 20);

    this.ctx.font = '18px Arial';
    this.ctx.fillText(`Survived: ${this.survivalTime.toFixed(2)}s`, this.canvasWidth / 2, this.canvasHeight / 2 + 10);

    if (this.survivalTime >= this.highScore) {
      this.ctx.fillStyle = '#eab308';
      this.ctx.fillText('New High Score! 🎉', this.canvasWidth / 2, this.canvasHeight / 2 + 40);
    }

    this.ctx.textAlign = 'left';
  }

  getHighScore() {
    const key = `redBlockHighScore_${this.difficulty}`;
    return parseFloat(localStorage.getItem(key) || '0');
  }

  saveHighScore() {
    const key = `redBlockHighScore_${this.difficulty}`;
    localStorage.setItem(key, this.highScore.toString());
  }

  getHighScores() {
    const scores = {};
    ['easy', 'medium', 'hard', 'impossible'].forEach(difficulty => {
      scores[difficulty] = parseFloat(localStorage.getItem(`redBlockHighScore_${difficulty}`) || '0');
    });
    return scores;
  }

  destroy() {
    // Remove event listeners
    this.canvas.removeEventListener('mousedown', this.handleMouseDown);
    this.canvas.removeEventListener('mouseup', this.handleMouseUp);
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.canvas.removeEventListener('mouseleave', this.handleMouseUp);
    this.canvas.removeEventListener('touchstart', this.handleTouchStart);
    this.canvas.removeEventListener('touchend', this.handleTouchEnd);
    this.canvas.removeEventListener('touchmove', this.handleTouchMove);

    this.running = false;
  }
}