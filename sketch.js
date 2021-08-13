var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;

  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;



  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
  
}

function draw() {
  background(200);
  if(gameState==="play"){

  
  
  if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("LEFT_ARROW")){
      ghost.x=ghost.x-3
    }

    if(keyDown("RIGHT_ARROW")){
      ghost.x=ghost.x+3
    }

    if(keyDown("space")){
      ghost.velocityY=-3

    }
    ghost.velocityY=ghost.velocityY+0.8

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }

    spawnDoor();


    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();

      gameState="end";

    }
    drawSprites()

    
  }

  if(gameState==="end"){

    text("GAMEOVER",230,250)


  }

}

function spawnDoor(){
  if(frameCount%200===0){

  door=createSprite(200,-50);
  climber=createSprite(200,10);
  invisibleBlock=createSprite(200,15)

  door.addImage(doorImg);
  climber.addImage(climberImg);
  invisibleBlock.width=climber.width;
  invisibleBlock.height=2;
  
  

  door.x=Math.round(random(120,300))
  invisibleBlock.x=door.x

  door.velocityY=3;

  climber.x=door.x
  climber.velocityY=3;
  invisibleBlock.velocityY=3;

  door.lifetime=200;
  climber.lifetime=200;
  invisibleBlock.lifetime=200;


  doorsGroup.add(door);
  invisibleBlockGroup.add(invisibleBlock);

  ghost.depth=door.depth;
  ghost.depth+=1

  
  climbersGroup.add(climber);
  
 
 

  

  
  
  
  
  
  


  }
}
