let particle;
let vehicle;

let gamepaused = false;

let counter = 10;
let seekers = [];

let moving = true;

let reset1 = false;

let lifeCounterHolder = 3;
let lifeCounter = lifeCounterHolder;

let wander = false;
let locations = [];

let currentTime = 0;
let lastTime = 0;
let debounceMs = 1000;

var x = 400;
var y = 400;

function heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

function preload(){
  sheap1 = loadImage('sheap.png');
  wolf1 = loadImage('wolf.png');
  bggrass = loadImage('background_grass.png');
  sheap2 = loadImage('sheap_copy.png')

}

function setup() {
  
  grass = createCanvas(800, 800);
  
  particle = new Particle(x, y, 2);
  //vehicle = new Vehicle(200, 200, 2);
  
  for(var i = 0; i < counter; i++){
    seekers.push(new Vehicle(random(200, 800), random(200, 800), 2));
  }

}

function draw() {
  grass = background(bggrass);
  
  currentTime = millis();
  readyToPlay = (currentTime - lastTime) > debounceMs;



  
  for(let i = 0; i < lifeCounter; i++){
    //toliko življenj kot trenutno ima igralec izriši srčkov
    heart(i * 50 + 50, 100, 30);
  }
  
  if(moving && !gamepaused){
     particle.movement();
     }
  
  
  
  particle.show();
  
  //target = createVector(particleX, particleY)
  particle.stamina();
  particle.health();
  
 
  particlePOS = particle.pos;
  
  
  
  
  for (let i = 0; i < seekers.length; i++) {
    
    
    
    vehiclePOS = seekers[i].pos;
    
    if(vehiclePOS.x <= particle.pos.x + 5 && vehiclePOS.x >= particle.pos.x - 5 &&              vehiclePOS.y <= particle.pos.y + 5 && vehiclePOS.y >= particle.pos.y - 5){
      
      if(health > 0)
       health--;
      if(health == 0 && lifeCounter > 1){
        textSize(50)
        text("PRESS 'SPACE' TO CONTINUE",50, 400 );
        fill(255, 0, 0);
        moving = false;
        gamepaused = true;
        
        if( keyIsDown(32)){
          
          lifeCounter--;
          moving = true;
          gamepaused = false;
          particle.pos.set(400, 400);
          stamina = 780;
          health = 780;
          
        for(let k = 0; k < seekers.length; k++){
          seekers[k].pos.set(random(200, 800), random(200, 800));
        }
      } 
      
        
      }
      
      if( lifeCounter == 1 && health == 0){
        
        moving = false;
        gamepaused = true;
        background(0);
        textSize(64);
        text("PRESS 'R' TO RESTART",50, 400 );
        fill(255, 0, 0);
        reset1 = true;
        
        
      }
      
    }
    if(keyIsDown(82) && reset1 == true){
          lifeCounter = lifeCounterHolder;
          moving = true; 
          gamepaused = false;
          particle.pos.set(400,400);
       stamina = 780;
      health = 780;
          
      for(let l = 0; l < seekers.length; l++){
          seekers[l].pos.set(random(200, 800), random(200, 800));
        }
      reset1 = false;
        }
    
    if(!gamepaused && fear == false){
      seekers[i].seek(particle.pos);
      seekers[i].update();
      seekers[i].show();
      seekers[i].edges2();
    }
    else if(!gamepaused && fear == true){
      seekers[i].wander();
      seekers[i].update();
      seekers[i].show();
      seekers[i].edges2();
      
    }
  
    }
    
  
  
  particle.edges1();

}