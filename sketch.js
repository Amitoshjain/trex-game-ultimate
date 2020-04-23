var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudGroup,cloudImage;
var obstacleGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var gameState,PLAY,END ,count;
var restart,restartImage,gameOver,gameOverImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage ("cloud.png");
  obstacle1 = loadImage ("obstacle1.png");
  obstacle2 = loadImage ("obstacle2.png");
  obstacle3 = loadImage ("obstacle3.png");
  obstacle4 = loadImage ("obstacle4.png");
  obstacle5 = loadImage ("obstacle5.png");
  obstacle6 = loadImage ("obstacle6.png");
  restartImage = loadImage ("restart.png");
  gameOverImage = loadImage ("gameOver.png");
}

function setup() {
  createCanvas(600, 200);
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  count = 0;
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation ("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = - (6 + 3 * count / 100);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  cloudGroup = new Group ();
  obstacleGroup = new Group ();
  
  trex.setCollider("circle",0,0,30);  
  gameOver = createSprite (300,90,10,10);
  gameOver.addImage (gameOverImage);
  gameOver.scale = 0.75;
  restart = createSprite (300,130,30,30);
  restart.addImage (restartImage);
  restart.scale = 0.6;
  gameOver.visible = false ;
  restart.visible = false;
  
  
}

function draw() {
  background(180);
  
  trex.debug = true;
  text("Score: "+ count, 480, 60);
  
if (gameState === PLAY) {
    
  if(keyDown("space") && trex.y > 160 ) {
    trex.velocityY = -10;
  }
  trex.velocityY = trex.velocityY + 0.8;
  
  count = count + Math.round(getFrameRate()/60);
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
    spawnCloud ();
  spawnObstacles () ;
  
    if(obstacleGroup.isTouching(trex)){
      gameState = END;
    }
  }
  
  else if(gameState === END) {
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    trex.changeAnimation("collided",trex_collided);
    
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    gameOver.visible = true ;
  restart.visible = true;
  if ( mousePressedOver (restart)) {
        reset () ;
   }
    
  }

  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnCloud () {
  
  if (frameCount % 60 === 0 ) {
  
 var cloud = createSprite (600,100,10,10);
    cloudGroup.add (cloud);
  cloud.addImage (cloudImage);
    cloud.velocityX = -3;
    cloud.y =Math.round (random(80,120));
    cloud.lifeTime = 200 ;
    cloud.depth = trex.depth ;
    trex.depth = trex.depth + 1;
  }
  
}

function spawnObstacles () {
  if (frameCount % 120 === 0) {
   var obstacle = createSprite (600,162,10,10);
    obstacleGroup.add (obstacle);
    
    obstacle.scale = 0.54;
    obstacle.lifetime = 210;
    obstacle.velocityX = - (6 + 3 * count);
  var rand = Math.round (random (1,6));
    switch (rand) {
    case 1 : obstacle.addImage (obstacle1);
            break ;
    case 2 : obstacle.addImage (obstacle2);
            break ;
    case 3 : obstacle.addImage (obstacle3);
            break ;
    case 4 : obstacle.addImage (obstacle4);
            break ;
    case 5 : obstacle.addImage (obstacle5);
            break ;
    case 6 : obstacle.addImage (obstacle6);
            break ;
     default : break;       
        
    }

 }
}

function reset () {
  gameState = PLAY;
  restart.visible = false;
  gameOver.visible = false;
  cloudGroup.destroyEach ();
  obstacleGroup.destroyEach();
  trex.changeAnimation ("running",trex_running);
  count = 0;
  

}
