var trex, trexAnimation, edges, ground, groundImage, invisibleGround, cloudImage, obstaclesImage, obstacles2Image, obstacles3Image, obstacles4Image, obstacles5Image, obstacles6Image, obstaclesGroup, cloudsGroup, trexImageCollided, restart, restartImage, gameOver, gameOverImage;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

function preload() {
  trexAnimation=loadAnimation("trex1.png","trex3.png","trex4.png");
  trexImageCollided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstaclesImage = loadImage("obstacle1.png");
  obstacles2Image = loadImage("obstacle2.png");
  obstacles3Image = loadImage("obstacle3.png");
  obstacles4Image = loadImage("obstacle4.png");
  obstacles5Image = loadImage("obstacle5.png");
  obstacles6Image = loadImage("obstacle6.png");
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
trex = createSprite(50, height - 40, 20, 50);
  trex.addAnimation("trexRunning",trexAnimation);
  trex.scale = 0.5;
  
  edges = createEdgeSprites();
  
  ground = createSprite(width/2,height-10,width,2);
  ground.x = ground.width/2;
  ground.addImage("groundMoving",groundImage);
  
  invisibleGround = createSprite(width/2,height+50,width,125)
  invisibleGround.visible = false;
  
  restart = createSprite(width/2,height/2);
  restart.addImage("restartButton",restartImage);
  restart.scale = 1;
  restart.visible = false;
  
  gameOver = createSprite(width/2,height/2-80);
  gameOver.addImage("gameOverText",gameOverImage);
  gameOver.scale = 1;
  gameOver.visible = false;
  
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
}

function draw() {
  background("white");
  textSize(20)
  text("Score(s): " + score, 1100, 60);
console.log(trex.y)
  if(gameState === PLAY){
  ground.velocityX = -(7 + score/100);
  
  score = score + Math.round(getFrameRate()/60);
    
  if(keyDown("space") && trex.y >= 733){
    trex.velocityY = -10;
  }
    
  //same as doing trex.velocityY = trex.velocityY + 0.8
  trex.velocityY += 0.45;
    
 if(ground.x < 0){
 ground.x = ground.width/2;
  }
  
  spawnClouds();
  spawnObstacles();  
    
   if(trex.isTouching(obstaclesGroup)){
    gameState = END;
  }
  }
    
  else if(gameState === END){
  trex.velocityY = 0;
  ground.velocityX = 0;
  cloudsGroup.setVelocityXEach(0);
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setLifetimeEach(-1);
  obstaclesGroup.setLifetimeEach(-1);
  trex.addImage("collided",trexImageCollided);
  restart.visible = true;
  gameOver.visible = true;
  if(mousePressedOver(restart)){
     Restart();
    }
  }
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds() {
  if(frameCount % 60 === 0){
  var clouds = createSprite(width/2+880,height,width,10);
  clouds.velocityX = -(6 + score/100);
  clouds.addImage("cloudMoving",cloudImage);
  clouds.scale = 1.3;  
  clouds.y = random(125,400);
  clouds.depth = trex.depth;
  trex.depth += 1;
  clouds.lifetime = displayWidth;
  cloudsGroup.add(clouds);
  }
}

function spawnObstacles() {
if(frameCount % 60 === 0){
  var obstacle = createSprite(width/2+880,height-40,width,40);
  obstacle.velocityX = -(8 + score/100);
  var rand = Math.round(random(1,6));
  
  switch(rand){
         case 1:obstacle.addImage(obstaclesImage);
         break;
         case 2:obstacle.addImage(obstacles2Image);
         break;
         case 3:obstacle.addImage(obstacles3Image);
         break;
         case 4:obstacle.addImage(obstacles4Image);
         break;
         case 5:obstacle.addImage(obstacles5Image);
         break;
         case 6:obstacle.addImage(obstacles6Image);
         break;
         
         default:break;
         }
  
  obstacle.scale = 0.7;
  obstacle.lifetime = displayWidth;
  obstaclesGroup.add(obstacle);
}
}

function Restart(){
  gameState = PLAY;
  trex.changeAnimation("trexRunningAgain",trexAnimation);
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score = 0;
  restart.visible = false;
  gameOver.visible = false;
}