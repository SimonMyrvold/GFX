class Plain {

  //Bitmap Variables
  Bitmap;
  TempBitmap;
  BitmapSize;
  PixelSize;
  locked;
  size;



  //Draw Function Variables
  drawing;

  startX;
  startY;

  endX;
  endY;

  scrollUp;
  scrollRight;


  constructor() {


    //Construct Bitmap Variables
    this.Bitmap = [];
    this.TempBitmap = [];
    this.BitmapSize = 100;
    this.PixelSize = 1;
    this.locked = false;
    this.size = 0;


    //Construct Draw Function Variables

    this.drawing = false;

    this.startX = 0;
    this.startY = 0;

    this.endX = 0;
    this.endY = 0;

    this.scrollUp = 0;
    this.scrollRight = 0;
  };





  //Sets the size of the canvas to window size
  draw(canvas) {
    canvas.width = window.innerWidth * 0.4;
    canvas.height = window.innerHeight * 0.4;
    //...drawing code...
  }

  //Gets the mouse position in the canvas, used in all code related to mouse interactions on the canvas
  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  //Updates Bitmap array pixel on xy cordiantes with new color
  putPixel(x, y, color) {
    for (let i = 0; i < this.Bitmap.length; i++) {
      if (this.Bitmap[i].x == (Math.floor(x / this.PixelSize)) && this.Bitmap[i].y == (Math.floor(y / this.PixelSize))) {
        this.Bitmap[i].color = color;
      }
    }
  }

  //Updates the temporary Bitmap array pixel on xy cordiantes with new color
  putPixelTemp(x, y, color) {
    for (let i = 0; i < this.Bitmap.length; i++) {
      if (this.TempBitmap[i].x == (Math.floor(x / this.PixelSize)) && this.TempBitmap[i].y == (Math.floor(y / this.PixelSize))) {
        this.TempBitmap[i].color = color;
      }
    }
  }

  //Random number generating function
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //Draw function that just draws pixels using the input xycolor, does not update array
  drawPixel(context, x, y, color) {
    context.fillStyle = color || '#000';
    context.fillRect((x + this.scrollRight) * this.PixelSize, (y + this.scrollUp) * this.PixelSize, this.PixelSize * 1.01, this.PixelSize * 1.01);
  }

  //Sets the size of pixels based on canvas size and bitmap size
  setPixelSize(canvas) {
    this.PixelSize = canvas.width / this.BitmapSize;
  }

  //Generates the Bitmap with bitmapsize * 2 pixels
  generateBitmap() {
    for (let x = 0; x < this.BitmapSize; x++) {
      for (let y = 0; y < this.BitmapSize; y++) {
        var pixel = new Pixel(x, y, "white");

        this.Bitmap.push(pixel);

        var pixel = new Pixel(x, y, "rgba(" + this.getRndInteger(255, 255) + "," + this.getRndInteger(255, 255) + "," + this.getRndInteger(255, 255) + "," + 0 + ")");
        this.TempBitmap.push(pixel)

      }
    }
  }

  //Generates the TempBitmap with bitmapsize * 2 pixels
  generateTempBitmap() {
    for (let x = 0; x < this.BitmapSize; x++) {
      for (let y = 0; y < this.BitmapSize; y++) {

        var pixel = new Pixel(x, y, "rgba(255,255,255,1)");
        this.TempBitmap.push(pixel)

      }
    }
  }

  //Draws everything in the Bitmap array
  DrawBitmap() {
    for (let i = 0; i < (this.BitmapSize * this.BitmapSize); i++) {
      this.setPixelSize(canvas);
      //console.log(this.PixelSize);
      this.drawPixel(context, this.Bitmap[i].x, this.Bitmap[i].y, this.Bitmap[i].color);
    }
  }

  //Draws everything in the TempBitmap array
  DrawTempBitmap() {
    for (let i = 0; i < (this.BitmapSize * this.BitmapSize); i++) {
      this.setPixelSize(canvas);
      //console.log(this.PixelSize);
      this.drawPixel(context, this.TempBitmap[i].x, this.TempBitmap[i].y, this.TempBitmap[i].color);
    }
  }

  scrollContent(direction) {

    switch (direction) {

      case "up":
      this.scrollUp = this.scrollUp + 1;
      console.log(this.scrollUp);
        break;

      case "down":
        this.scrollUp = this.scrollUp - 1;
        console.log(this.scrollUp);

        break;

      case "right":
        this.scrollRight = this.scrollRight + 1;
        console.log(this.scrollRight);
        break;

      case "left":
        this.scrollRight = this.scrollRight - 1;
        console.log(this.scrollRight);
        break;

    }
  }


  //Gets first position for line
  drawLineStart(evt) {
    var pos = this.getMousePos(canvas, evt);
    console.log(pos.x + " " + pos.y)
    this.drawing = true;
    this.startX = pos.x;
    this.startY = pos.y;
  }

  //Gets second position for line
  drawLineEnd(evt) {
    if (this.drawing == true) {
      var pos = this.getMousePos(canvas, evt);
      console.log(pos.x + " " + pos.y)
      this.drawing = false;
      this.endX = pos.x;
      this.endY = pos.y;
      this.drawLine(this.startX, this.startY, this.endX, this.endY, "red");
    }
  }

  //Uses the positions to draw a line
  drawLine(x1, y1, x2, y2, color) {
    // Iterators, counters required by algorithm
    let x, y, dx, dy, dx1, dy1, px, py, xe, ye, i;
    // Calculate line deltas
    dx = x2 - x1;
    dy = y2 - y1;
    // Create a positive copy of deltas (makes iterating easier)
    dx1 = Math.abs(dx);
    dy1 = Math.abs(dy);
    // Calculate error intervals for both axis
    px = 2 * dy1 - dx1;
    py = 2 * dx1 - dy1;
    // The line is X-axis dominant
    if (dy1 <= dx1) {
      // Line is drawn left to right
      if (dx >= 0) {
        x = x1; y = y1; xe = x2;
      } else { // Line is drawn right to left (swap ends)
        x = x2; y = y2; xe = x1;
      }
      this.putPixelTemp(x, y, color); // Draw first pixel
      // Rasterize the line
      for (i = 0; x < xe; i++) {
        x = x + 1;
        // Deal with octants...
        if (px < 0) {
          px = px + 2 * dy1;
        } else {
          if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
            y = y + 1;
          } else {
            y = y - 1;
          }
          px = px + 2 * (dy1 - dx1);
        }
        // Draw pixel from line span at
        // currently rasterized position
        this.putPixelTemp(x, y, color); // Draw first pixel
      }
    } else { // The line is Y-axis dominant
      // Line is drawn bottom to top
      if (dy >= 0) {
        x = x1; y = y1; ye = y2;
      } else { // Line is drawn top to bottom
        x = x2; y = y2; ye = y1;
      }
      this.putPixelTemp(x, y, color); // Draw first pixel
      // Rasterize the line
      for (i = 0; y < ye; i++) {
        y = y + 1;
        // Deal with octants...
        if (py <= 0) {
          py = py + 2 * dx1;
        } else {
          if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
            x = x + 1;
          } else {
            x = x - 1;
          }
          py = py + 2 * (dx1 - dy1);
        }
        // Draw pixel from line span at
        // currently rasterized position
        this.putPixelTemp(x, y, color); // Draw first pixel
      }
    }
  }

}

//Pixel object used for saving pixel data
class Pixel {
  x;
  y;
  color;

  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color
  }
}

//Start event listeners for resizing
function initialize() {
  // Register an event listener to call the resizeCanvas() function 
  // each time the window is resized.
  window.addEventListener('resize', resize, false);
  window.addEventListener('resize', mainCanvas.DrawBitmap, false);
  // Draw canvas border for the first time.
  mainCanvas.draw(canvas);
  resize();
  mainCanvas.size = window.innerWidth * 0.4;
}

function resize() {
  // create a temporary canvas obj to cache the pixel data //
  var temp_cnvs = document.createElement('canvas');
  var temp_cntx = temp_cnvs.getContext('2d');
  // set it to the new width & height and draw the current canvas data into it // 
  temp_cnvs.width = (window.innerWidth * 0.4);
  temp_cnvs.height = (window.innerWidth * 0.4);
  temp_cntx.fillStyle = "white";  // the original canvas's background color
  temp_cntx.fillRect(0, 0, 5, 5);
  temp_cntx.drawImage(canvas, 0, 0);
  // resize & clear the original canvas and copy back in the cached pixel data //
  canvas.width = window.innerWidth * 0.4;
  canvas.height = window.innerWidth * 0.4;
  context.drawImage(temp_cnvs, 0, 0);
}

function refresher() {
  //Info on Line 111
  mainCanvas.DrawBitmap();
  mainCanvas.DrawTempBitmap();
}

function drawShapeStart(evt) {
  var pos = mainCanvas.getMousePos(canvas, evt);
  console.log(pos.x + " " + pos.y)
  mainCanvas.drawing = true;
  mainCanvas.startX = pos.x;
  mainCanvas.startY = pos.y;
}

function drawShapeEnd(evt) {
  if (mainCanvas.drawing == true) {
    var pos = mainCanvas.getMousePos(canvas, evt);
    console.log(pos.x + " " + pos.y)
    mainCanvas.drawing = false;
    mainCanvas.endX = pos.x;
    mainCanvas.endY = pos.y;
    if (selectedTool == "box") {
      drawBox(mainCanvas.startX, mainCanvas.startY, mainCanvas.endX, mainCanvas.endY, selectedColor);
    }
    else if (selectedTool == "circle") {
      drawCricle(mainCanvas.startX, mainCanvas.startY, mainCanvas.endX, mainCanvas.endY, selectedColor);
    }
    else if (selectedTool == "line") {
      mainCanvas.drawLine(mainCanvas.startX, mainCanvas.startY, mainCanvas.endX, mainCanvas.endY, selectedColor);
    }
    else if (selectedTool == "draw") {
      spawnTextBox();
    }
  }
}

function drawBox(x0, y0, x1, y1, color) {
  mainCanvas.drawLine(x0, y0, x0, y1, color);
  mainCanvas.drawLine(x0, y0, x1, y0, color);
  mainCanvas.drawLine(x1, y1, x0, y1, color);
  mainCanvas.drawLine(x1, y1, x1, y0, color);
}

function drawCricle(x0, y0, x1, y1, color) {
  var a = Math.abs(x1 - x0), b = Math.abs(y1 - y0), b1 = b & 1; /* values of diameter */
  var dx = 4 * (1 - a) * b * b, dy = 4 * (b1 + 1) * a * a; /* error increment */
  var err = dx + dy + b1 * a * a, e2; /* error of 1.step */

  if (x0 > x1) { x0 = x1; x1 += a; } /* if called with swapped points */
  if (y0 > y1) y0 = y1; /* .. exchange them */
  y0 += (b + 1) / 2; y1 = y0 - b1;   /* starting pixel */
  a *= 8 * a; b1 = 8 * b * b;

  do {
    mainCanvas.putPixel(x1, y0, color); /*   I. Quadrant */
    mainCanvas.putPixel(x0, y0, color); /*  II. Quadrant */
    mainCanvas.putPixel(x0, y1, color); /* III. Quadrant */
    mainCanvas.putPixel(x1, y1, color); /*  IV. Quadrant */
    e2 = 2 * err;
    if (e2 <= dy) { y0++; y1--; err += dy += a; }  /* y step */
    if (e2 >= dx || 2 * err > dy) { x0++; x1--; err += dx += b1; } /* x step */
  } while (x0 <= x1);

  while (y0 - y1 < b) {  /* too early stop of flat ellipses a=1 */
    mainCanvas.putPixel(x0 - 1, y0, color); /* -> finish tip of ellipse */
    mainCanvas.putPixel(x1 + 1, y0++, color);
    mainCanvas.putPixel(x0 - 1, y1, color);
    mainCanvas.putPixel(x1 + 1, y1--, color);
  }
}


//Canvas Variables
var canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
var context = canvas.getContext("2d");

var mainCanvas = new Plain();

var selectedTool = "";
var selectedColor = "rgba(100,0,0,1)";

var tempContentActive = false;


//Info on Line 236
initialize();

//Info on Line 101
mainCanvas.generateBitmap();
mainCanvas.generateTempBitmap();

//Info on Line 263
setInterval(refresher, 50);


document.getElementById("boxbutton").addEventListener('mousedown', (event) => {

  selectedTool = "box";

})
document.getElementById("circlebutton").addEventListener('mousedown', (event) => {

  selectedTool = "circle";

})
document.getElementById("linebutton").addEventListener('mousedown', (event) => {

  selectedTool = "line";

})
document.getElementById("drawbutton").addEventListener('mousedown', (event) => {

  selectedTool = "draw";

})

document.getElementById("up").addEventListener('mousedown', (event) => {

  mainCanvas.scrollContent("up");

})
document.getElementById("down").addEventListener('mousedown', (event) => {

  mainCanvas.scrollContent("down");

})
document.getElementById("right").addEventListener('mousedown', (event) => {

  mainCanvas.scrollContent("right");

})
document.getElementById("left").addEventListener('mousedown', (event) => {

  mainCanvas.scrollContent("left");

})


canvas.addEventListener('mousedown', (event) => {

  drawShapeStart(event);

})
canvas.addEventListener('mouseup', (event) => {

  drawShapeEnd(event);

})
canvas.addEventListener('mouseleave', (event) => {

  drawShapeEnd(event);

})

//Most letters and Symbols that are defined using 57 numbers
let decimal = "00000000001000001010000101000111110010001001000100000000000000001111000100010011110001000100100010011110000000000000000001110001000100100000010000001000100011100000000000000000111000010010001000100100010010010001110000000000000000001111100100000010000001111000100000011111000000000000000011111001000000100000011100001000000100000000000000000000111110010001001000000100110010001001111100000000000000001000100100010010001001111100100010010001000000000000000001110000010000001000000100000010000011100000000000000000011110000010000001000000100001010000010000000000K000000001001000101000010100001110000100100010010000000000000000010000001000000100000010000001000100111110000000000000000100010011011001010100100010010001001000100000000000000001000100110010010101001001100100010010001000000000000000001110001000100100010010001001000100011100000000000000000111100010001001000100111100010000001000000000000000000000111000100010010001001000100100010001111000000000000000011110001000100100010011110001000100100010000000000000000011100011001001000000111100000001001111000000000000000001111100001000000100000010000001000000100000000000000000010001001000100100010010001001000100011100000000000000000100010010001000101000010100000100000010000000000000000001000100100010010001001000100101010001010000000000000000010001001000100010100000100001101100100010000000000000000100010010001000101000001000000100000010000000000000000001111100000110000110000110000110000011111000000000000000001110001000100100010010001001000100011100000000000000000000100000110000101000000100000010000001000000000000000000111000110110000011000111000110000011111000000000000000011111000001000011000000010001000100011100000000000000000011100001010001101000100100011111000001000000000000000001111000100000011110000001100110110011110000000000000000001110001101100100000011111001000100111110000000000000000111110010001000000100000100000010000001000000000000000000111000100010010001000111000100010001110000000000000000001110001000100100010001111000000100011100000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000100000110000000000000000000100000000000000000000000000010000011000000000000000000001000000000000000000000000000000000010000000000000100000111000101010010100000111000001010011110000010000000000001010001111100010100001010001111100010100000000000000000001000000100000000000000000000000000000000000000000000000010000011100001110000010000000000000100000000000000000000000000000000000000000000000000000000000000000000000000111110000001000000100111110010001001111100000000000000001000000100000010000001111000100010011110000000000000000001110001000000100000010000001000000011100000000000000000000010000001000000100001110001001000011100000000000000000111000100010011110001000000100010001110000000000000000001100001000000100000011000001000000100000000000000000000011110001001000111100000010000001000011100000000000000001000000100000010000001110000100100010010000000000000000000100000000000001000000100000010000001000000000000000000001000000000000010000001000000100000100000000000000000001010000101000010100001100000101000010100000000000000000000100000010000001000000100000010000001000000000000000000101000011110001010100101010010101001010100000000000000001011000110010010001001000100100010010001000000000000000001110001000100100010010001001000100011100000000000000000111000010010001110000100000010000001000000000000000000000011100010010000111000000100000010000001000000000000000010110001100100100000010000001000000100000000000000000000011110010000001000000011100000001001111000000000000000000010000011100000100000010000001000000010000000000000000010001001000100100010010001001000100011110000000000000000100010010001001000100010100001010000010000000000000000000000000100010010001001010100101010001010000000000000000010001001000100010100000100000101000100010000000000000000100010010001001101100011100000100001100000000000000000001111100000110000110000110000110000011111000000000000000001010000101000000000000000000000000000000000000000000000000100000010000010000001000001000000100000000000000000000011100010010000011000011000000000000100000000000000000011001001101100001100001100001101100100110000000000000000011000010010001001000011010010010001111100000000000000000010000010000001000000100000010000000100000000000000000000100000001000000100000010000001000001000000000000000000011100010001001011100101010010111000110000000000";
//Every usable letter
let letterNumber = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9",".",",",";",":","$","#","'","!"," ","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","/","?","%","&","(",")","@"];
//Typing on
var textBox = false;
//Amount of letters on every line
var count = 0;
//Letter format
let bitmap = new Array(8).fill(0).map(() => new Array(7 * count).fill(0));
//Amount of lines, enter key, position on mouse, textbox width
let height = 0, enter = false, pos: { x: any; y: any; }, widthTextBox = 100;
//Amount of letters on every line
let linewidth = []


function spawnTextBox() {
  //Enable typing
  textBox = true;
  //Get mouse position
  pos = mainCanvas.getMousePos(canvas, event);
  //Set amount of words and lines
  count = 0
  height = 0
  //Print out textarea
  drawBox(pos.x + -5*mainCanvas.PixelSize, pos.y + -1*mainCanvas.PixelSize, pos.x + 6*mainCanvas.PixelSize + widthTextBox*mainCanvas.PixelSize, 45*height+pos.y+9*mainCanvas.PixelSize, "black");

}

addEventListener('keydown', function(event) {
  //Current keypress
  const key = event.key;
  //Enter key
  if (key === 'Enter') {
    //Enter is true
    enter = true;
    //Copies current amout of word on line
    linewidth[height] = count;
    //Set new line
    height++;
    //Reset amount of words on line
    count = 0;
    //Remove old textbox then add new one based on height number
    drawBox(pos.x + -5*mainCanvas.PixelSize, pos.y + -1*mainCanvas.PixelSize, pos.x + 6*mainCanvas.PixelSize + widthTextBox*mainCanvas.PixelSize, 45*(height-1)+pos.y+9*mainCanvas.PixelSize, "rgba(0,0,0,0)");
    drawBox(pos.x + -5*mainCanvas.PixelSize, pos.y + -1*mainCanvas.PixelSize, pos.x + 6*mainCanvas.PixelSize + widthTextBox*mainCanvas.PixelSize, 45*height+pos.y+9*mainCanvas.PixelSize, "black");
  } else {
    //Enter is false
    enter = false;
  }
  //Backspace or deletekey
  if (key === "Backspace" || key === "Delete") {
    //If amount of words is more then 0 and the line is 0
    if (count > 0 && height == 0) {
      //Remove 8y*7x
      for (let y = 0; y < 8; y++) {
        for (let x = 7*(count-1); x < 7*count; x++) {
              mainCanvas.putPixelTemp(pos.x+x*mainCanvas.PixelSize, pos.y+y*mainCanvas.PixelSize, "rgba(0,0,0,0)");
          }
        }
      //Remove amount of words by 1
      count--;
      //If amount of words is 0 and height is more then 0
    } else if (height > 0 && count == 0) {
      //Remove old textbox
      drawBox(pos.x + -5*mainCanvas.PixelSize, pos.y + -1*mainCanvas.PixelSize, pos.x + 6*mainCanvas.PixelSize + widthTextBox*mainCanvas.PixelSize, 45*(height)+pos.y+9*mainCanvas.PixelSize, "rgba(0,0,0,0)");
      //Remove amount of lines by 1
      height--;
      //add new textbox based on height number
      drawBox(pos.x + -5*mainCanvas.PixelSize, pos.y + -1*mainCanvas.PixelSize, pos.x + 6*mainCanvas.PixelSize + widthTextBox*mainCanvas.PixelSize, 45*height+pos.y+9*mainCanvas.PixelSize, "black");
      //Set amount of words to previous line
      count = linewidth[height]
      //If amount of words is more then 0 and amount of lines is more then 1
    } else if (height > 0 && count > 0){
        //Remove (35*height+8y)*7x
        for (let y = 0; y < 8; y++) {
          for (let x = 7*(count-1); x < 7*count; x++) {
            mainCanvas.putPixelTemp(pos.x+x*mainCanvas.PixelSize, 45*height+pos.y+y*mainCanvas.PixelSize, "rgba(0,0,0,0)");
          }
        }
      //Remove amount of words by 1
      count--;
    }
  }
  });

//Check what key press
document.onkeypress = function(evt) {
    //Checks if typing is enabled & keypress is not enter
    if (textBox == true && enter != true) {
      evt || window.event;
      //Send keypress as string to letters()
      var charCode = evt.keyCode || evt.which;
      var charStr = String.fromCharCode(charCode);
      letters(charStr)
    };
};

function letters(charStr) {
  //Add 1 on amount of word
  count++;
  //Check if it can find keypress amongst letternumber
  for (let z = 0; z < letterNumber.length; z++) {
  if (charStr == letterNumber[z]) {
     //Slices of 57 numbers from decimal using the position of the key letternumbers*56, (letternumber*56)+56
    let currentletter = decimal.slice(z*56,(z*56)+56);
    //Insert the sliced numbers in correct order into the array  
    for (let a = 0; a < count; a++) {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 7; j++) {
          bitmap[j][i + (7 * a)] = currentletter[j * 7 + i];
      }
    }
  }
}
}

//Checks if amount of word * letter width / 80 is less then 1
if ((count*7)/widthTextBox > 1) {
  //Saves amount of word in line
  linewidth[height] = count
  //Add line
  height++;
  //Set amount of words to 1
  count = 1;
  //Remove old textbox then add new one based on height number
  drawBox(pos.x + -5*mainCanvas.PixelSize, pos.y + -1*mainCanvas.PixelSize, pos.x + 6*mainCanvas.PixelSize + widthTextBox*mainCanvas.PixelSize, 45*(height-1)+pos.y+9*mainCanvas.PixelSize, "rgba(0,0,0,0)");
  drawBox(pos.x + -5*mainCanvas.PixelSize, pos.y + -1*mainCanvas.PixelSize, pos.x + 6*mainCanvas.PixelSize + widthTextBox*mainCanvas.PixelSize, 45*height+pos.y+9*mainCanvas.PixelSize, "black");
}

//If Height is 0
if (height == 0) {
  for (let y = 0; y < 8; y++) {
  //If amount of words is 1
  if (count == 1) {
    for (let x = 0; x < 7*count; x++) {
      //Current number in array is 1
      if (bitmap[y][x] == "1") {
        //Print out letter on mouseclick position + curret pixel position
        mainCanvas.putPixelTemp(pos.x+x*mainCanvas.PixelSize, pos.y+y*mainCanvas.PixelSize, "black");
       }
     } 
     //If count is more then 1
    } else {
      //Sets starting position to (count - 1) * 7 and end position to 7*count
      for (let x = 7*(count-1); x < 7*count; x++) {
        if (bitmap[y][x] == "1") {
          mainCanvas.putPixelTemp(pos.x+x*mainCanvas.PixelSize, pos.y+y*mainCanvas.PixelSize, "black");
        }
      }
    }
  }
  //If amount of lines is higher then 0
} else {
  for (let y = 0; y < 8; y++) {
    //if count = 1
    if (count == 1) {
      for (let x = 0; x < 7*count; x++) {
        if (bitmap[y][x] == "1") {
          //Print out letter on mouseclick position + curret pixel position and y-axis 35*heigt+mouseclick+curret pixel
          mainCanvas.putPixelTemp(pos.x+x*mainCanvas.PixelSize, 45*height+pos.y+y*mainCanvas.PixelSize, "black");
         }
       } 
        // if count is higher then 1
      } else {
        for (let x = 7*(count-1); x < 7*count; x++) {
          if (bitmap[y][x] == "1") {
            mainCanvas.putPixelTemp(pos.x+x*mainCanvas.PixelSize, 45*height+pos.y+y*mainCanvas.PixelSize, "black");
          }
        }
      }
    }
}
}