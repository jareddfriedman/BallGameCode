var a = 0; // arbitrary, used differently in different levels
var b = 0;
var c = 0;

var c1x = 0; // positioning for circle in level 1
var c1y = 0;

var c2x1 = 0; // positioning for circles in level 2
var c2x2 = 0;
var c2y = 0;

var xmaker = 0; // used to define "chain" in level 2
var xmaker2 = 0;

var ccw = 0; // used to define counterclockwise motion in level 3

var lev = 1; // sets level

var ww; // window width
var wh; // window height (these have to be called globally but are defined in "draw")

var timer = 0; //used to delay stuff

function setup() {
  createCanvas (windowWidth, windowHeight);
  
}

function draw() {
ww = windowWidth;
wh = windowHeight;


// level 1 - the object is to click on the circle

  if (lev == 1) {
    
    background(255, 0, 0);

    if (a === 0) {
    b = 50;
    c = 50;
    c1x = ww/2;
    c1y = wh/2;}
    
    if (a > 0) {
      b++;
      c++;
      if (b >= 150) {
        b = 150;
        c = 150;
      c1x = ww/2;
      c1y = c1y + 5 + ((c1y - 300) * (c1y - 300) / 12000)}
      
      if (c1y >= (ww - 50)) {
        a = 0;
        b = 0;
        c = 0;
        lev = 2;
      }
  
    }
    
    fill(255);
    stroke(0);
    strokeWeight(2);
    
    ellipse (c1x, c1y, b, c);
    

  }
  
// level 2 - the object is to drag each circle to the edge of the screen
  
  if (lev == 2) {
    
    background(255, 127, 0);

    if (a === 0) {
    c2x1 = (ww/2) - 50;
    c2x2 = (ww/2) + 50;
    c2y = wh/2;}
    
    if (a == 1) {
      c2x1 = mouseX;
      xmaker = ww/2 - 50;
      
      for(var i = 1; i<=(ww/2-c2x1)/100; i ++) {
      ellipse(xmaker, c2y, 100, 100)
        xmaker -= 100;
      }}
      
   if (a == 2) {
     c2x1 = 50;
     xmaker = ww/2 - 50;
     for(var i = 1; i<=(ww/2-c2x1)/100; i ++) {
      ellipse(xmaker, c2y, 100, 100)
        xmaker -= 100;}
   }

    
    if (b == 1) {
      c2x2 = mouseX;
      xmaker2 = ww/2 + 50;
      
      for(var i = 1; i<=(c2x2-ww/2)/100; i ++) {
      ellipse(xmaker2, c2y, 100, 100)
        xmaker2 += 100;
      }
      
    }
      
   if (b == 2) {
     c2x2 = ww-50;
     xmaker2 = ww/2 + 50;
     for(var i = 1; i<=(c2x2-ww/2)/100; i ++) {
      ellipse(xmaker2, c2y, 100, 100)
        xmaker2 += 100;}
   }


    fill(255, 0, 255);
    stroke(0);
    strokeWeight(2);
    ellipse (c2x1, c2y, 100, 100);
    
    fill(0, 255, 255);
    stroke(0);
    strokeWeight(2);
    ellipse (c2x2, c2y, 100, 100);
    
  if (a + b == 4) {
    
    fill(0, random(127, 200), random(200, 255));
    
     c2x1 = 50;
     xmaker = ww/2 - 50;
     for(var i = 1; i<=(ww/2-c2x1)/100; i ++) {
      ellipse(xmaker, random(wh/2 - 20, wh/2 + 20), 100, 100)
        xmaker -= 100;}
     c2x2 = ww-50;
     xmaker2 = ww/2 + 50;
     for(var i = 1; i<=(c2x2-ww/2)/100; i ++) {
      ellipse(xmaker2, random(wh/2 - 20, wh/2 + 20), 100, 100)
        xmaker2 += 100;}
        
  timer ++
  
if (timer >= 240) {
  a = 0;
  b = 0;
  lev = 3}
  
  } 
  }
  
// level 3 - the object is to spin the three balls counterclockwise until they break apart
  
if (lev == 3) {

background(255, 255, 0);

translate (ww/2, wh/2);

  c = atan2(mouseX-ww/2, mouseY-wh/2);
  
  if (b < c) {
    ccw = ccw + (abs(b-c)*5);
  }
  
  else if (b > c)
  {ccw = ccw - .629}

  
  if(ccw < 255){
    a = 0;
  fill(128 + (ccw/2), ccw, 128 + (ccw/2));
  stroke(0);
  strokeWeight(3);
  
  ellipse(50 * sin(c - (PI * 2/3)), 50 * cos(c - (PI * 2/3)), 87, 87);
  ellipse(50 * sin(c), 50 * cos(c), 87, 87);
  ellipse(50 * sin(c + (PI * 2/3)), 50 * cos(c + (PI * 2/3)), 87, 87);}
  
  else {
    
  fill(255);
  stroke(0);
  strokeWeight(3);
  
  ellipse(50 * sin(c - (PI * 2/3)) - a, 50 * cos(c - (PI * 2/3)) + a, 87, 87);
  ellipse(50 * sin(c) + a, 50 * cos(c) + a, 87, 87);
  ellipse(50 * sin(c + (PI * 2/3)) + a, 50 * cos(c + (PI * 2/3)) - a, 87, 87);
  
  a = a + 5;
}
  
  if (a > 600) {
    ccw = 0;
    a = 0;
    b = 0;
    lev = 4;
  }

b = c;

}

// level 4 - ??

if (lev == 4) 

{
  background (0, 255, 0);
  translate (ww/2, wh/2)
  fill(255);
  textSize(72);
  text ("WATCH THIS SPACE!", -400, 0)
}

} // function



function mousePressed() {
  if (lev == 1 && a === 0 && dist(mouseX, mouseY, c1x, c1y) <= 100)
    {a = 1;}

if (lev == 2 && a === 0 && dist (mouseX, mouseY, c2x1, c2y) <= 50)
    {a = 1;}

if (lev == 2 && b === 0 && dist (mouseX, mouseY, c2x2, c2y) <= 50)
    {b = 1;}
}

function mouseReleased() {
  
if (lev == 2 && a == 1 && c2x1 >= 100)
{a = 0}

if (lev == 2 && a == 1 && c2x1 < 100)
{a = 2;
  c2x1 = 50;}
  
if (lev == 2 && b == 1 && c2x2 <= ww - 200)
{b = 0}

if (lev == 2 && b == 1 && c2x2 >= ww - 200)
{b = 2;
  c2x2 = ww-50;}
}
