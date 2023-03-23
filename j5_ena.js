var hold = false;

function setup() {
  createCanvas(400, 400);
  
  
}

function draw() {
  
  background(0);  
  
  if(hold){
    
    let pos = createVector(200, 200);
  let mouse = createVector(mouseX, mouseY);
  
  let v = p5.Vector.sub(mouse, pos);
 // let m = v.mag();
 //  v.div(m);
    v.normalize();
  v.mult(50);
  
     strokeWeight(4);
    stroke(255);
  translate(width/2, height/2);
    line(0, 0, v.x, v.y);
   
  }
  
  
   
   
}

function mousePressed() {
  
  hold = true;
  
}

function mouseReleased(){
    console.log("test");
  hold = false;
    background(0);
  }