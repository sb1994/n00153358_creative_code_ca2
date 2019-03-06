let textTyped = "Sean";
let myFont;
let fontSize = 200;
let textImg;
let colorMapImg;

let angle = 0.0;
let jitter = 0.0;
let pixDensity = 6;
let shapeSize = 6;
let randAmount = 100;
let shape = "Circle";
let finishPosArray = [];
let startPosArray = [];
let increment = 100;
let myCounter = 0;
let sizeSlider;
let pixelDensitySlider;
let fontSizeSlider;
let shapeRadio;
let textPoints;
let filled = 1;
let animate = false;

let checkFilledBox;

function preload() {
  myFont = loadFont("data/FreeSansBold.ttf");
  colorMapImg = loadImage("data/gejtrivx.png");
}

function setup() {
  let canvas = createCanvas(600, 500);
  canvas.parent("canvasHolder");

  createTextGraphic();

  // textPoints =
  colorMapImg.loadPixels();

  sizeSlider = createSlider(1, 20, 6);
  sizeSlider.mouseReleased(update);
  sizeSlider.parent("sizeSlider");

  fontSizeSlider = createSlider(100, 800, 200);
  fontSizeSlider.mouseReleased(update);
  fontSizeSlider.parent("fontSizeSlider");

  txtBox = createInput(textTyped);
  txtBox.class("txtBox");
  txtBox.input(update);
  txtBox.parent("txtBox");

  checkFilledBox = createCheckbox("Filled", true);
  checkFilledBox.changed(update);
  checkFilledBox.parent("checkFilledBox");

  shapeRadio = createRadio();
  shapeRadio.option("Circle");
  shapeRadio.option("Rectangle");
  shapeRadio.option("Line");
  shapeRadio.changed(update);
  shapeRadio.parent("shapeRadio");
}

function createTextGraphic() {
  //console.log("check")
  textImg = createGraphics(width, height);
  textImg.pixelDensity(1);
  textImg.background(255);
  textImg.textFont(myFont);
  textImg.textSize(fontSize);
  textImg.textAlign(CENTER);

  //turns the input to points
  textPoints = myFont.textToPoints(textTyped, width / 2, height / 2, fontSize);

  textImg.loadPixels();
}

function draw() {
  background(0, 50);
  // noLoop()
  // noFill();
  // noStroke();

  // image(textImg,0,0)
  for (let i = 0; i < textPoints.length; i++) {
    if (shape === "Line") {
      const pint = textPoints[i];

      stroke(0, 52, 200);
      // strokeWeight(4);
      line(Math.floor(pint.x) - 300, pint.y, mouseX, mouseY);
    }
    if (shape === "Rectangle") {
      if (filled) {
        const pint = textPoints[i];
        // noFill();
        fill(0, 52, 200);
        rectMode(CENTER);
        // strokeWeight(4);
        rect(
          Math.floor(pint.x) - 300,
          pint.y,
          mouseX + shapeSize,
          mouseY + shapeSize
        );
      } else {
        const pint = textPoints[i];
        noFill();
        stroke(0, 52, 200);
        rectMode(CENTER);
        // strokeWeight(4);
        rect(Math.floor(pint.x) - 300, pint.y, mouseX, mouseY);
      }
    }
    if (shape === "Circle") {
      if (filled) {
        const pint = textPoints[i];
        // noFill();
        fill(0, 52, 200);
        ellipse(Math.floor(pint.x) - 300, pint.y, mouseX, mouseY);
      } else {
        const pint = textPoints[i];
        noFill();
        stroke(0, 52, 200);
        ellipse(Math.floor(pint.x) - 300, pint.y, mouseX, mouseY);
      }
    }
  }
}

function update() {
  shapeSize = sizeSlider.value();
  fontSize = fontSizeSlider.value();
  textTyped = txtBox.value();
  shape = shapeRadio.value();

  if (checkFilledBox.checked() == true) {
    filled = true;
  } else {
    filled = false;
  }
  // startPosArray = [];
  // finishPosArray = [];
  createTextGraphic();
  // createPosArrays();
}

function keyReleased() {
  // export png
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), "png");
}
