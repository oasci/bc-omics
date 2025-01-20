let dnaElongationSketch = (p) => {
  let canvas;
  let nucleotides = [];
  let templateSequence = [];
  let primerSequence = [];
  let nucleotideNumber = 70;
  let nucleotideSize = 20;
  let baseTextSize = 11;
  let sequenceStartX = 10;
  let sequenceY;
  const nucleotideTypes = ['A', 'T', 'C', 'G'];
  const nucleotideColors = {
    'A': [239, 71, 111],
    'T': [17, 138, 178],
    'C': [255, 209, 102],
    'G': [6, 214, 160]
  };
  const elongateFactor = 2.5;  // How far away until we attach nucleotide

  let speedSlider, restartButton;
  let aspectRatio = 4/3;

  p.setup = () => {
    // Placeholder size, will be updated in windowResized
    canvas = p.createCanvas(100, 100);
    canvas.parent("dna-elongation-container");

    speedSlider = p.createSlider(0.5, 5, 2, 0.1);
    restartButton = p.createButton('Restart');
    restartButton.mousePressed(startAnimation);

    p.windowResized();
    startAnimation();
  };

  p.windowResized = () => {
    let containerWidth = p.select('#dna-elongation-container').width;
    let canvasHeight = containerWidth / aspectRatio;
    p.resizeCanvas(containerWidth, canvasHeight);

    // Update variables that depend on canvas size
    nucleotideSize = p.width / 40;
    sequenceY = p.height / 2;
    nucleotideNumber = Math.floor(p.width / (nucleotideSize + 5) * 2);

    // Calculate new text size
    currentTextSize = (baseTextSize * p.width) / 600;

    // Reposition interface elements
    speedSlider.position(canvas.position().x + 5, canvas.position().y + 10);
    speedSlider.style('width', p.width / 4 + 'px');
    restartButton.position(canvas.position().x + 8, canvas.position().y + 45);
    restartButton.style('font-size', currentTextSize + 'px');

    // Restart the animation to adjust for new size
    startAnimation();
  };

  function startAnimation() {
    nucleotides = [];
    templateSequence = [];
    primerSequence = [];

    // Generate initial DNA sequence
    for (let i = 0; i < p.width / (nucleotideSize + 5); i++) {
      let base = p.random(nucleotideTypes);
      templateSequence.push(base);
    }

    // Initialize complementary strand with first 3 nucleotides
    for (let i = 0; i < 3; i++) {
      primerSequence.push(getComplementaryBase(templateSequence[i]));
    }

    // Generate random nucleotides
    for (let i = 0; i < nucleotideNumber; i++) {
      createRandomNucleotide();
    }
  }

  p.draw = () => {
    p.background(245);

    p.textSize(currentTextSize);
    p.textAlign(p.LEFT, p.CENTER);
    let speedTextX = p.width / 4 + 20;
    let speedTextY = 23;
    p.text("Speed factor: " + speedSlider.value().toFixed(1), speedTextX, speedTextY);

    // Draw DNA sequence
    drawtemplateSequence();

    // Update and draw nucleotides
    for (let nucleotide of nucleotides) {
      nucleotide.update();
      nucleotide.display();
    }

    // Check for elongation
    checkElongation();
  };

  function drawtemplateSequence() {
    // Draw primer strand
    for (let i = 0; i < templateSequence.length; i++) {
      let x = sequenceStartX + i * (nucleotideSize + 5);
      drawNucleotide(x, sequenceY - 15, templateSequence[i], 255);
    }

    // Draw complementary strand
    for (let i = 0; i < primerSequence.length; i++) {
      let x = sequenceStartX + i * (nucleotideSize + 5);
      drawNucleotide(x, sequenceY + 15, primerSequence[i], 255);
    }
  }

  function drawNucleotide(x, y, type, alpha) {
    let color = nucleotideColors[type];
    p.fill(color[0], color[1], color[2], alpha);
    p.noStroke();

    if (type === 'A' || type === 'T') {
      p.ellipse(x, y, nucleotideSize);
    } else {
      p.rectMode(p.CENTER);
      p.square(x, y, nucleotideSize);
    }

    p.fill(0);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(currentTextSize * 0.9);
    p.text(type, x, y);
  }

  function checkElongation() {
    if (primerSequence.length < templateSequence.length) {
      let nextBaseIndex = primerSequence.length;
      let targetBase = getComplementaryBase(templateSequence[nextBaseIndex]);
      let targetX = sequenceStartX + nextBaseIndex * (nucleotideSize + 5);
      let targetY = sequenceY + 15;

      for (let i = nucleotides.length - 1; i >= 0; i--) {
        let nucleotide = nucleotides[i];
        if (nucleotide.type === targetBase &&
            p.dist(nucleotide.x, nucleotide.y, targetX, targetY) < nucleotideSize * elongateFactor) {
          primerSequence.push(targetBase);
          nucleotides.splice(i, 1);
          createRandomNucleotide();
          break;
        }
      }
    }

    // Check if the complementary sequence is fully grown
    if (primerSequence.length === templateSequence.length) {
      nucleotides = [];  // Clear all moving nucleotides
    }
  }

  function getComplementaryBase(base) {
    switch(base) {
      case 'A': return 'T';
      case 'T': return 'A';
      case 'C': return 'G';
      case 'G': return 'C';
    }
  }

  function createRandomNucleotide() {
    let maxAttempts = 50;
    let attempt = 0;
    let x, y;

    do {
      x = p.random(nucleotideSize, p.width - nucleotideSize);
      y = p.random(nucleotideSize, p.height - nucleotideSize);
      attempt++;
    } while (isPositionOccupied(x, y) && attempt < maxAttempts);

    if (attempt < maxAttempts) {
      nucleotides.push(new Nucleotide(x, y, p.random(nucleotideTypes)));
    }
  }

  function isPositionOccupied(x, y) {
    for (let nucleotide of nucleotides) {
      if (p.dist(x, y, nucleotide.x, nucleotide.y) < nucleotideSize * 1.5) {
        return true;
      }
    }
    return false;
  }

  class Nucleotide {
    constructor(x, y, type) {
      this.x = x;
      this.y = y;
      this.type = type;
      this.vx = p.random(-2, 2);
      this.vy = p.random(-2, 2);
      this.minSpeed = 1.0;
      this.maxSpeed = 3.0;
    }

    update() {
      // Update speed based on slider value
      this.minSpeed = 1.0 * speedSlider.value();
      this.maxSpeed = 3.0 * speedSlider.value();

      this.x += this.vx;
      this.y += this.vy;

      // Clamp the velocity to stay within a range
      this.clampVelocity();

      // Check if out of bounds, remove if true
      if (this.x < -nucleotideSize*0.1 || this.x > p.width + nucleotideSize*0.1 ||
          this.y < -nucleotideSize*0.1 || this.y > p.height + nucleotideSize*0.1) {
        let index = nucleotides.indexOf(this);
        if (index > -1) {
          nucleotides.splice(index, 1);
          createRandomNucleotide(); // Replace with a new nucleotide
        }
        return; // Exit the function early since this nucleotide is removed
      }

      // Bounce off walls
      if (this.x < nucleotideSize / 2 || this.x > p.width - nucleotideSize / 2) this.vx *= -1;
      if (this.y < nucleotideSize / 2 || this.y > p.height - nucleotideSize / 2) this.vy *= -1;

      // Collision with other nucleotides
      for (let other of nucleotides) {
        if (other !== this && this.collidesWith(other)) {
          this.resolveCollision(other);
        }
      }
    }


    clampVelocity() {
      let speed = p.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed < this.minSpeed) {
        let scale = this.minSpeed / speed;
        this.vx *= scale;
        this.vy *= scale;
      } else if (speed > this.maxSpeed) {
        let scale = this.maxSpeed / speed;
        this.vx *= scale;
        this.vy *= scale;
      }
    }

    collidesWith(other) {
      return p.dist(this.x, this.y, other.x, other.y) < nucleotideSize;
    }

    resolveCollision(other) {
      let dx = other.x - this.x;
      let dy = other.y - this.y;
      let distance = p.sqrt(dx * dx + dy * dy);

      if (distance < nucleotideSize) {
        // Normal vector (direction of impact)
        let nx = dx / distance;
        let ny = dy / distance;

        // Calculate relative velocity in the direction of the normal
        let dvx = other.vx - this.vx;
        let dvy = other.vy - this.vy;
        let dotProduct = dvx * nx + dvy * ny;

        // If velocities are separating, don't resolve the collision
        if (dotProduct > 0) return;

        // Reverse velocities along the normal (1D elastic collision)
        let impulse = 2 * dotProduct / 2;  // assuming equal mass, impulse divided by combined mass

        this.vx += impulse * nx;
        this.vy += impulse * ny;
        other.vx -= impulse * nx;
        other.vy -= impulse * ny;

      }
    }


    display() {
      drawNucleotide(this.x, this.y, this.type, 255);
    }
  }
};

let dnaElongation = new p5(dnaElongationSketch);
