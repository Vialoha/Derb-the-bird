// Average browser window size = 1366 x 784
// General guideline: canvas size of 800x600 pixels for simple browser games

/* STEPS:

  1.Create the Canvas and draw on it (background, derb, obstacles)
  2.Move the player
  3.Define the player to the limits of the canvas
  4.Keyboard controls
  5.Game over
  6.Collision detection
  7.Track the score and win
  8.Restart
  9.Finishing up

 */

  //const canvas = document.getElementById('canvas');
  //const ctx = canvas.getContext('2d');
  // window.onload: add the first screen with the start game button and instructions, after the window loads totally
  

/* STEPS

  Title: "A Derb`s life" ?
  
  6.Function reStart
    6.1 Button Restart - eventListener
    6.2 Start new game 

  7.Finishing up (sounds? original drawings?)

 */
  const canvas = document.getElementById("game-area");
  const ctx = canvas.getContext("2d");
  const backgroundImg = new Image;
  backgroundImg.src = "./Images/background.png";
  const derbImg = new Image();
  derbImg.src = "./images/theDerb.png";
  const obstaclesImg = new Image();
  obstaclesImg.src = "./images/Tuna.png";
  let obstacles = [];
  let frames = 0;
  let derbLives= 3;
<<<<<<< HEAD
=======

>>>>>>> 6366c6168d1d30028034dbfe40e36afd2bcd6166
  let obstaclesImages = ["./Images/panties.png", "./Images/flipFlop.png", "./Images/Tuna.png"]
  
   
  const backgroundImage = {

    img: backgroundImg,
    x: 0,
    speed: -3,

    move: function() {
      this.x += this.speed;
      this.x %= canvas.width;
    },

    draw: function() {
      ctx.drawImage(this.img, this.x, 0, 3000, 784);    
      ctx.drawImage(this.img, this.x - this.img.width, 0, 3000, 784);                    
      ctx.drawImage(this.img, this.x - this.img.width*2, 0, 3000, 784);
    },

    update(){
      this.move();
      this.draw();
    }
  };


  window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
    };

    function startGame() {
      
      document.getElementById("game-instructions").style.display = "none";
      document.getElementsByClassName("game-intro")[0].style.display = "none";
      document.getElementById("game-area").style.display="block";
      updateGame();
      
    }
  };

let requestId

  function updateGame() {
    // add reset function here
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.update(); //includes move and draw method for the background
    derb.update(); // includes move and draw method for Derb
    generateObstacles();
    collisionDetection(derb, obstacles);
    score();
    playerLives();
    checkGameOver();

    requestId = requestAnimationFrame(updateGame);

    if (checkGameOver()){
      cancelAnimationFrame(requestId);
    }
  };


      class Player {
       constructor() {
        this.x = 150;   // define initial position for Derb x
        this.y = 150;   // define initial position for Derb y
        this.img = derbImg;
        this.width = 150     // 150 size of derb
        this.height = 120    // 150 size of derb
      }
  
          draw() {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height); //Define the size of derb
          }

          move(){
            document.onkeydown = event => {
              const key = event.keyCode;
              switch (key) {
                case 38: // up
                  if(this.y >=0) this.y -=30;
                  break;
                case 40: // down
                  this.y +=30;
                  if (this.y >= canvas.height) {this.y = canvas.height}; 
                  //canvas.height/width doesn't work here. Has to be the px limit of the canvas (to be defined on html)
                  break;
                case 37: // left
                  if (this.x >=0) this.x -=30;
                  break;
                case 39: // right
                  if (this.x < canvas.width) this.x +=30;
                  //canvas.height/width doesn't work here. Has to be the px limit of the canvas (to be defined on html)
                  else this.x=0;
                  break;
              }
            }
          }

          update(){
            this.draw();
            this.move();
          }
      }

    let derb = new Player();



      class Obstacles {

        constructor(){
          this.img = obstaclesImg;
          this.x = 700;   // objects always come from the right
          this.y = Math.random() * (700 - 50) + 50;   // objects can come from any height, 700 is the max height! 70 is min
          this.speed = 2;
          this.width = 150; // size of obstacle
          this.height = 150; //size of obstacles
        }

        draw(){
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }

        move(){
          this.x -=this.speed;
        }

        update() {
          this.draw();
          this.move();
        }
      }
      
      
      function generateObstacles(){

        for(i = 0; i < obstacles.length; i++) {
          obstacles[i].x += -1;
          obstacles[i].update();
        }

          let collision = obstacles.some(function(obstacle, index) {
            
            return collisionDetection(derb, obstacle) && obstacles.splice(index, 1);
            
          }); 

          if (collision) {
          derbLives -= 1;                              
         
          return;
        }
      

        frames+=1;
        if(frames%100 === 0){
          obstacles.push(new Obstacles);
        };    
      }



      // Detect Collision
      function collisionDetection (derb, obstacle) {

        if (derb.x < obstacle.x + obstacle.width &&
          derb.x + derb.width > obstacle.x &&
          derb.y + derb.height > obstacle.y &&
          derb.y < obstacle.y + obstacle.height) {
          
          return true;
          }

        else {
          return false;
        }
      }
      

      // Game over

      function checkGameOver(){
        if(derbLives === 0) {
          document.getElementById("game-area").style.display = "none";
          document.getElementById("game-over").style.display = "block";
          return true;
        }
      }


      //Restart button


      //Lives

        function playerLives(){
          ctx.font = "20px Lato"
          ctx.fillStyle = 'black';
          ctx.fillText(`Lives: ${derbLives}`, 600, 60);
          }


      //Score and // Win GAME !
        function score(){
          let points = Math.floor(frames / 60);
          ctx.font = "20px Lato"
          ctx.fillStyle = 'black';
          ctx.fillText(`Score: ${points}`, 600, 30);

          if (points>20){
            document.getElementById("game-area").style.display = "none";
            document.getElementById("winner").style.display = "block";
          }
        }


        //Restart button
        document.getElementById("restartButton").onclick = () => {
          restartGame();
        };

        function restartGame(){
          document.getElementById("game-over").style.display = "none";
          document.getElementById("game-area").style.display = "block";
          resetGame();
          startGame();
          
        }


        function resetGame() { 
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          backgroundImage.update();
          derb.x = 150;
          derb.y = 150;
          derb.update()
          obstacles = [];
          derbLives = 3;
          frames = 0;
        }

        
