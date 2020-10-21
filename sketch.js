var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground;
var monkey , monkey_running;
var banana ,bananas, bananaImage, obstacle, obstacles, obstacleImage;
var FoodGroup, obstacleGroup;
var score;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(800,400);
  text("Score: "+ score, 500,50);
  
  //create monkey
  monkey = createSprite(100,300,50,50);
  monkey.addAnimation("runmonkey", monkey_running);
  monkey.scale = 0.3;
  
  //create invisible ground
  ground = createSprite(400,370,800,10);
  ground.velocityX = -3;
  ground.visible = false;
  
  //create bananas and obstacles group
  bananas = createGroup();
  obstacles = createGroup(); 
  
  score = 0;
}


function draw() {
  background("lightblue");
  text("Survival Time: "+score,500,50);
  
  
  if(gameState === PLAY){
      
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    //move the ground
    ground.velocityX = -4;    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space")&& monkey.y>= 150) {
        monkey.velocityY = -12;
    }
    
   //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
  
    //spawn obstacles and banana
    spawnbanana();
    spawnobstacle();
    
    
    if(bananas.isTouching(monkey)){
      bananas.destroyEach();
    }
        
    if(obstacles.isTouching(monkey)){
        gameState = END;
        obstacles.destroyEach();
    }
  } else if (gameState === END) {
      ground.velocityX = 0;
      monkey.velocityY = 0;
     
    
     obstacles.setLifetimeEach(-1);
     bananas.setLifetimeEach(-1);
     
     obstacles.setVelocityXEach(0);
     bananas.setVelocityXEach(0);
     textSize(30);
     text("Restart Game", 400,200);
  }
  
    drawSprites();
}

function spawnbanana()
{
 if(frameCount % 80 === 0)
 {
    banana = createSprite(random(200,600),random(50,300),10,30);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -3; 
    banana.lifetime = 100;
    bananas.add(banana);
   
 }
  
}

function spawnobstacle()
{
  if(frameCount % 300 === 0)
  {  
    obstacle = createSprite(700,random(250,380),100,50);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.3;
    obstacle.velocityX = -5;
    obstacle.lifetime = 150;
    obstacles.add(obstacle);
  }
  
  
}



