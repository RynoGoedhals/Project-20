var man, manImg, manDead;
var groundImg, ground;
var invGround;

var zombieGroup, zombie1, zombie2, zombie3, zombie4;

var gameOver, restart, gameOverImg, restartImg;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

function preload(){

  manImg = loadAnimation("man1.png","man2.png","man3.png","man4.png","man5.png","man6.png","man7.png","man8.png",)
  groundImg = loadImage("background.jpg");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  manDead = loadAnimation("Dead.png");

  zombie1 = loadImage("zombie1.png");
  zombie2 = loadImage("zombie2.png");
  zombie3 = loadImage("zombie3.png");
  zombie4 = loadImage("zombie4.png");

}

function setup() {
  createCanvas(600,200);

  ground = createSprite(300,1);
  ground.addImage("ground", groundImg);
  ground.scale = 1;

  man = createSprite(100,150,20,20);
  man.addAnimation("running", manImg);
  man.addAnimation("dead", manDead);
  man.scale = 0.3;

  invGround = createSprite(300,200,600,20);
  invGround.visible = false;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.6

  restart = createSprite(300,160);
  restart.addImage(restartImg);
  restart.scale = 0.2;

  zombieGroup = createGroup();

  man.setCollider("circle",0,0,125);
  //man.debug = true;
 
}

function draw() {
  background(0);

  if(gameState === PLAY){

    restart.visible = false;
    gameOver.visible = false;

    spawnZombie();

    score = score + Math.round(frameCount/60);

    man.velocityY = man.velocityY + 0.8;
    man.collide(invGround);
    man.changeAnimation("running");

    if(ground.x < 100){
        ground.x = 300;
      }
    ground.velocityX = -(6 + score/500);

    if(keyDown("space") && man.y >= 100){

      man.velocityY = -10;

    }

    if(zombieGroup.isTouching(man)){

      gameState = END;

    }

  } else if(gameState === END){

    gameOver.visible = true;
    restart.visible = true;
   
    ground.velocityX = 0;
    man.velocityY = 0;
    man.changeAnimation("dead");
   
    zombieGroup.setLifetimeEach(-1);
   
    zombieGroup.setVelocityXEach(0);
 
  }

  if(mousePressedOver(restart)){
    reset();
  }

  drawSprites();

  fill("blue");
  textSize(18);
  text("Score: "+ score, 450, 20);
}

function spawnZombie(){

  if (frameCount % 60 === 0){
    var zombie = createSprite(600,160,10,40);
    zombie.velocityX = -(6 + score/100);
    
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: zombie.addImage(zombie2);
               break;
       case 2: zombie.addImage(zombie3);
               break;
       default: break;
     }
             
  zombie.scale = 0.175;
  zombie.lifetime = 300;
  zombieGroup.add(zombie);
  //zombie.debug = true;
  zombie.setCollider("circle", 0, 0, 100);
 }

}

function reset(){

  gameState = PLAY;

  gameOver.visible = false;
  restart.visible = false;

  zombieGroup.destroyEach();

  score = 0;

}