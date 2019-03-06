let textTyped = "Sean";
let myFont;
let fontSize = 200;
let textImg;
let colorMapImg;

let pixDensity = 6;
let shapeSize = 6;
let randAmount = 100;
let shape = 'Circle'
let finishPosArray = [];
let startPosArray = [];
let increment = 100;
let myCounter = 0;
let sizeSlider;
let pixelDensitySlider;
let fontSizeSlider
let shapeRadio
let textPoints
let filled = 1;
let animate = false;

let checkFilledBox;

function preload() {
    myFont = loadFont("data/FreeSansBold.ttf");
    colorMapImg = loadImage('data/gejtrivx.png');
}

function setup() {
    let canvas = createCanvas(600, 500);
    canvas.parent('canvasHolder');

    createTextGraphic();

    // textPoints = 
    colorMapImg.loadPixels();
    
    sizeSlider = createSlider(1, 20, 6);
    sizeSlider.mouseReleased(update);
    sizeSlider.parent('sizeSlider');

    pixelDensitySlider = createSlider(1, 20, 6);
    pixelDensitySlider.mouseReleased(update);
    pixelDensitySlider.parent('pixelDensitySlider');

    fontSizeSlider = createSlider(100, 800, 200);
    fontSizeSlider.mouseReleased(update);
    fontSizeSlider.parent('fontSizeSlider');

    txtBox = createInput(textTyped);
    txtBox.class("txtBox");
    txtBox.input(update);
    txtBox.parent('txtBox');

    checkFilledBox = createCheckbox('Filled', true);
    checkFilledBox.changed(update);
    checkFilledBox.parent('checkFilledBox');

    shapeRadio=  createRadio()
    shapeRadio.option('Circle')
    shapeRadio.option('Rectangle')
    shapeRadio.option('Line')
    shapeRadio.changed(update)
    shapeRadio.parent('shapeRadio')
}

function createTextGraphic() {
    //console.log("check")
    textImg = createGraphics(width, height);
    textImg.pixelDensity(1);
    textImg.background(255);
    textImg.textFont(myFont);
    textImg.textSize(fontSize);
    textImg.textAlign(CENTER);

    // textImg.text(textTyped, width / 2, fontSize);
    textPoints = myFont.textToPoints(textTyped,width/2,height/2,fontSize)
    // console.log(textPoints);
    
    textImg.loadPixels();
}

function createPosArrays() {
    // for (let x = 0; x < textImg.width; x += pixDensity) {
    //     for (let y = 0; y < textImg.height; y += pixDensity) {
    //         // Calculate the index for the pixels array from x and y
    //         let index = (x + y * textImg.width) * 4;

    //         // Gets the r value of the pixels from the image
    //         let r = textImg.pixels[index];

    //         if (r < 128) {
    //             let rValue = colorMapImg.pixels[index];
    //             let gValue = colorMapImg.pixels[index + 1];
    //             let bValue = colorMapImg.pixels[index + 2];
    //             let fillColor = color(rValue, gValue, bValue);

    //             // finishArray.push({
    //             //     xPos: x
    //             //     , yPos: y
    //             //     , fill: fillColor
    //             // });
    //             // startPosArray.push({
    //             //     xPos: x + random(-randomAmount, randomAmount)
    //             //     , yPos: y + random(-textImg.height, textImg.height)
    //             //     , fill: fillColor
    //             // })
    //             finishPosArray.push({
    //               x: x, 
    //               y: y,
    //               fill: fillColor
    //             })
    //             console.log(finishPosArray);
                
    //         }

    //     }
    // }
}

function draw() {
    background(0,50);
    // noLoop()
    // noFill();
    // noStroke();

    image(textImg,0,0)
    for (let i = 0; i < textPoints.length; i++) {
      const	pint = textPoints[i];
      
      stroke(0,255,0)
      strokeWeight(4)
      line(Math.floor(pint.x)-300,pint.y,pint.x+50,pint.y+50)
    }

    // for (let i = 0; i < finishPosArray.length - 1; i++) {
    //     if (filled == 1) {
    //         noStroke;
    //         fill(finishPosArray[i].fill);
    //         // console.log(finishPosArray[i].fill);
            
    //     }
    //     else {
    //         //console.log("no Fill")
    //         noFill();
    //         stroke(finishPosArray[i].fill);
    //     }
    //     //stroke(finishPosArray[i].fill)
    //     //fill(finishPosArray[i].fill);

    //     ellipse(finishPosArray[i].x, finishPosArray[i].x, shapeSize, shapeSize);


    // }
    
}

function update() {
    shapeSize = sizeSlider.value();
    pixDensity = pixelDensitySlider.value();
    fontSize = fontSizeSlider.value();
    textTyped = txtBox.value();
    shape = shapeRadio.value()
    

    if (checkFilledBox.checked() == true) {
        filled = true;
    }
    else {
        filled = false;
    }
    startPosArray = [];
    finishPosArray = [];
    createTextGraphic();
    createPosArrays();
}

function keyReleased() {
    // export png
    if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
}