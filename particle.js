let stamina_slow = false;

let stamina = 780;
let walk = 1;
let sprint = 3;
let health = 780;

let cheatStamina = false;


let fear = false;

class Particle{
  
  constructor(x, y, m){
    this.pos = createVector(x, y);
    this.vel = createVector(0, 1);
    this.acc = createVector(0, 0);
    this.height = 800;
    this.width = 800;
    
    this.r = 16 ;

  }
  
  movement(){

  
    
  if (keyIsDown(UP_ARROW)) {
      this.pos.add(0, -walk);
  }

  if (keyIsDown(DOWN_ARROW)) {
      this.pos.add(0, walk);
  }

  if (keyIsDown(LEFT_ARROW)) {
      this.pos.add(-walk, 0);
  }

  if (keyIsDown(RIGHT_ARROW)) {
      this.pos.add(walk, 0);
  }
  
    ///////////////////////////////////////
    
  if (keyIsDown(UP_ARROW) && keyIsDown(SHIFT) && stamina > 0 && stamina_slow == false) {
      this.pos.add(0, -sprint);
      
      
  }

  if (keyIsDown(DOWN_ARROW) && keyIsDown(SHIFT) && stamina > 0 && stamina_slow == false) {
      this.pos.add(0, sprint);
    
  }

  if (keyIsDown(LEFT_ARROW) && keyIsDown(SHIFT) && stamina > 0 && stamina_slow == false) {
      this.pos.add(-sprint, 0);
    
  }

  if (keyIsDown(RIGHT_ARROW) && keyIsDown(SHIFT) && stamina > 0 && stamina_slow == false) {
      this.pos.add(sprint, 0);
    
  }
  
    //////////////////////////////////////////
    
  if(keyIsDown(UP_ARROW) && keyIsDown(SHIFT) && stamina > 0 && stamina_slow == false && cheatStamina == false ||
     keyIsDown(DOWN_ARROW) && keyIsDown(SHIFT) && stamina > 0 && stamina_slow == false && cheatStamina == false ||
     keyIsDown(LEFT_ARROW) && keyIsDown(SHIFT) && stamina > 0 && stamina_slow == false && cheatStamina == false ||
     keyIsDown(RIGHT_ARROW) && keyIsDown(SHIFT) && stamina > 0 && stamina_slow == false && cheatStamina == false){
      
     stamina = stamina - 3;
      
     }
    
  if(stamina < 781 && stamina_slow == false){
    stamina += 0.5;
  }
    
  if(stamina <= 0){
    stamina_slow = true;
  }
  
  if(stamina_slow == true && stamina < 50){
    stamina += 0.25;
  }
  else if(stamina_slow == true && stamina >= 50){
    stamina_slow = false;
  } 

  //////////////////////////////////////////////////

  if(keyIsDown(70) && stamina > 0 && stamina_slow == false ){

      fear = true;
  }
  else{
    fear = false;
  }
  
  if(fear && stamina > 0  && cheatStamina == false ){
    stamina = stamina - 3;
  }

  ////////////////////////////////////////////////////

  if(keyIsDown(67) && keyIsDown(83) && cheatStamina == false){
    cheatStamina = true;
  }
  if(keyIsDown(88) && keyIsDown(83) && cheatStamina == true){
    cheatStamina = false;
  }

  }
  
  apply(force){
    this.acc = force;
    this.vel.add(acc);
    
  }
  
  
  
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
  
  show(){
    if(fear){
      image(sheap2, this.pos.x - 16 , this.pos.y - 36, 52, 52  );
    }
    else{
      image(sheap1, this.pos.x - 16, this.pos.y - 16, 32, 32);
    }
   /* stroke(255,100);
    strokeWeight(2);
    fill(255, 100);
    ellipse(this.pos.x, this.pos.y, this.r *2);  */

      
    }
    
  stamina(){
    stroke(255, 100, 0);
    strokeWeight(2);
    fill(0, 0, 255);
    rect(10, 40, stamina, 20);
    
  }
  
  health(){
    stroke(255, 100, 0);
    strokeWeight(2);
    fill(0, 255, 0);
    rect(10, 10, health, 20);
    
    
  }
  
  edges1() {
    if (this.pos.y >= this.height-this.r) {
      this.pos.y = this.height-this.r;
    } else if(this.pos.y <= 155 + this.r)
      {
      this.pos.y = 155 +this.r;
    }

    if (this.pos.x >= this.width-this.r) {
      this.pos.x = this.width-this.r; 
    } else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
    }
  }
  
  }
class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(1, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = random(1, 1.5);
    this.maxForce = 0.25;
    this.r = 16;
    

    this.wanderTheta = PI / 2;

    
  }
  

  separation(vehicle) {
    let perceptionRadius = 20;
    let steering = createVector();
    let total = 0;
    for (let other of seekers) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.pos, other.pos);
        diff.div(d * d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  

  flock(vehicle) {
    
    let separation = this.separation(vehicle);

    separation.mult(1);

    this.acc.add(separation);
  }
  
  

  seek(target) {

      if(target.x - this.pos.x < 100 && target.y - this.pos.y < 100 && fear == false)
    {
       let force = p5.Vector.sub(target, this.pos);
      force.setMag(this.maxSpeed);
      force.sub(this.vel);
      force.limit(this.maxForce);
      this.applyForce(force);
    }   
    else {
      let force = p5.Vector.sub(target, this.pos);
      force.setMag(this.maxSpeed-0.7);
      force.sub(this.vel);
      force.limit(this.maxForce);
      this.applyForce(force);
    }

  }
  
  wander() {
    let wanderPoint = this.vel.copy();
    wanderPoint.setMag(100);
    wanderPoint.add(this.pos);
   

    let wanderRadius = 50;
   

    let theta = this.wanderTheta + this.vel.heading();

    let x = wanderRadius * cos(theta);
    let y = wanderRadius * sin(theta);
    wanderPoint.add(x, y);
    

    let steer = wanderPoint.sub(this.pos);
    steer.setMag(this.maxForce);
    this.applyForce(steer);

    let displaceRange = 0.3;
    this.wanderTheta += random(-displaceRange, displaceRange);
  }
  

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {
    image(wolf1, this.pos.x - 8, this.pos.y - 14, );
   
  }
  edges2() {
    if (this.pos.y >= this.height-this.r) {
      this.pos.y = this.height-this.r;
    } else if(this.pos.y <= 155 + this.r)
      {
      this.pos.y = 155 +this.r;
    }

    if (this.pos.x >= this.width-this.r) {
      this.pos.x = this.width-this.r; 
    } else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
    }
  }
}