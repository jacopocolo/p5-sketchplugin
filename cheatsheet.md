## Color
### Settings
##### background()
It sets the background color of the p5canvas artboard. The default color is white. It accepts hex, rgb and rgba values.
You can call it like this:
```javascript
background("#00FF00")
```
or
```javascript
background(0,255,0)
```
or
```javascript
background(0,255,0,100) //Alpha values are defined in this notation from 0 to 255
```

##### fill()
Sets the color used for Fills. The default fill color is white. It accepts hex, rgb and rgba values.
You can call it like this:
```javascript
fill("#FF0000")
```
or
```javascript
fill(255,0,0)
```
or
```javascript
fill(255,0,0,100) //Alpha values are defined in this notation from 0 to 255
```

##### noFill()
Removes Fills. If both noStroke() and noFill() are called, nothing will be drawn.

##### noStroke()
Removes Borders. If both noStroke() and noFill() are called, nothing will be drawn.

##### stroke()
Sets the color used for Borders. The default fill color is black. It accepts hex, rgb and rgba values.

You can call it like this:
```javascript
stroke("#00FF00")
```
or
```javascript
stroke(0,255,0)
```
or
```javascript
stroke(0,255,0,100) //Alpha values are defined in this notation from 0 to 255
```

## Shape
### 2D Primitives
##### arc(x,y,w,h,start,stop)
Draw an arc. The arc has center in (x, y), has a width of w and an height of h. Start and stop are starting point and ending point of the angle measured in radians. P5.js has another argument for arc: OPEN, CHORD or PIE. Currently all arcs drawn as PIE.

You can call it like this:
```javascript
arc(250,250,500,100,0,PI)
```

##### ellipse(x,y,w,h)
Draws an ellipse (oval). The ellipse has center in (x, y), has a width of w and an height of h.

You can call it like this:
```javascript
ellipse(250,250,500,100)
```

##### line(x1,y1,x2,y2)
Draws a line (a direct path between two points). The line starts in (x1,y1) and ends in (x2,y2). To color a line, use the stroke() function. A line cannot be filled, therefore the fill() function will not affect the color of a line. Lines are drawn with a width of one pixel by default, but this can be changed with the strokeWeight() function.

You can call it like this:
```javascript
line(0,0,100,100)
```

##### point()
Draws a point (a 1x1 rectangle). The point has a top left corner in (x1,y1). The color of the point is determined by the current stroke.

You can call it like this:
```javascript
point(150,150)
```

#### quad(x1,y1,x2,y2,x3,y3,x4,y4)
Draw a quad. A quad is a quadrilateral, a four sided polygon. It is similar to a rectangle, but the angles between its edges are not constrained to ninety degrees. The first pair of parameters (x1,y1) sets the first vertex and the subsequent pairs should proceed clockwise or counter-clockwise around the defined shape.

You can call it like this:
```javascript
quad(38, 31, 86, 20, 69, 63, 30, 76);
```

#### rect(x,y,w,h)
Draws a rectangle. A rectangle is a four-sided shape with every angle at ninety degrees. The rectangle has a top left corner in (x,y), has a width of w and a height of h.

You can call it like this:
```javascript
rect(30, 20, 55, 55);
```

### triangle(x1,y1,x2,y2,x3,y3)
Draws a triangle. A triangle is a plane created by connecting three points. The three points are located in (x1,y1), (x2,y2) and (x3,y3).

You can call it like this:
```javascript
triangle(30, 75, 58, 20, 86, 75);
```

### Attributes
#### strokeCap(CAP)
Sets the style for rendering line endings. The options are: SQUARE, PROJECT, and ROUND. The default cap is SQUARE.

You can call it like this:
```javascript
strokeCap(SQUARE);
strokeCap(PROJECT);
strokeCap(ROUND);
```

#### strokeJoin(JOIN)
Sets the style of the joints which connect line segments. These joints are either mitered, beveled, or rounded and specified with the corresponding parameters MITER, BEVEL, and ROUND. The default joint is MITER.

You can call it like this:
```javascript
strokeJoin(MITER);
strokeJoin(BEVEL);
strokeJoin(ROUND);
```

#### strokeWeight(n)
Sets the width (Thickness of the border) of the stroke used for lines, points, and the border around shapes. All widths are set in units of pixels.

You can call it like this:
```javascript
strokeWeight(4);
```

### Curves
#### bezier(x1,y1,x2,y2,x3,y3,x4,y4)
Draws a cubic Bezier curve on the screen. These curves are defined by a series of anchor and control points. The first two parameters (x1,y1) specify the first anchor point and the last two parameters (x4,y4) specify the other anchor point, which become the first and last points on the curve. The middle parameters (x2,y2) and (x3,y3) specify the two control points which define the shape of the curve. Approximately speaking, control points "pull" the curve towards them.

You can call it like this:
```javascript
bezier(85, 20, 10, 10, 90, 90, 15, 80);
```

### Vertex
#### beginShape()
#### vertex(x1,x1)
#### bezierVertex(x2,y2,x3,y3,x4,y4)
#### endShape(CLOSE)

Using the beginShape() and endShape() functions allow creating more complex forms. beginShape() begins recording vertices for a shape and endShape() stops recording. A vertex has two parameters that define its position (x1,y1). A bezier vertex has six parameters that define the position of two control points — (x2,y2) and (y3,y3) — and one anchor point of a Bezier curve (x4,y4).

You can call it like this:
```javascript
beginShape();
vertex(10, 10);
vertex(30, 20);
bezierVertex(80, 0, 80, 75, 30, 75);
vertex(10, 10);
endShape();
```

## Constants
#### HALF_PI
HALF_PI is a mathematical constant with the value 1.57079632679489661923. It is half the ratio of the circumference of a circle to its diameter. It is useful in combination with the trigonometric functions sin() and cos().

You can call it like this:
```javascript
arc(50, 50, 80, 80, 0, HALF_PI);
```

#### PI
PI is a mathematical constant with the value 3.14159265358979323846. It is the ratio of the circumference of a circle to its diameter. It is useful in combination with the trigonometric functions sin() and cos().

You can call it like this:
```javascript
arc(50, 50, 80, 80, 0, PI);
```

#### QUARTER_PI
QUARTER_PI is a mathematical constant with the value 0.7853982. It is one quarter the ratio of the circumference of a circle to its diameter. It is useful in combination with the trigonometric functions sin() and cos().

You can call it like this:
```javascript
arc(50, 50, 80, 80, 0, QUARTER_PI);
```

#### TAU
TAU is an alias for TWO_PI, a mathematical constant with the value 6.28318530717958647693. It is twice the ratio of the circumference of a circle to its diameter. It is useful in combination with the trigonometric functions sin() and cos().

You can call it like this:
```javascript
arc(50, 50, 80, 80, 0, TAU);
```

#### TWO_PI
TWO_PI is a mathematical constant with the value 6.28318530717958647693. It is twice the ratio of the circumference of a circle to its diameter. It is useful in combination with the trigonometric functions sin() and cos().

You can call it like this:
```javascript
arc(50, 50, 80, 80, 0, TWO_PI);
```

## Structure
#### setup()
The setup() function is called once when the program starts. It's used to define initial environment properties such as screen size and background color.

Note: Variables declared within setup() are not accessible within other functions, including draw().

You can call it like this:
```javascript
function setup() {
  createCanvas(200,200);
  background(0);
}
```

#### draw()
Called directly after setup(), the draw() function executes the lines of code contained inside from top to bottom, drawing shapes and applying properties. In Sketch the draw function is always called only once. p5.js for Sketch is used to draw static images.

You can call it like this:
```javascript
function draw() {
  line(0,0,100,100);
}
```

#### push()
#### pop()
The push() function saves the current drawing style settings and transformations, while pop() restores these settings. Note that these functions are always used together. They allow you to change the style and transformation settings and later return to what you had. When a new state is started with push(), it builds on the current style and transform information. The push() and pop() functions can be embedded to provide more control.

You can call them like this:
```javascript
ellipse(0, 50, 33, 33);
push();  // Start a new drawing state
strokeWeight(10);
fill(204, 153, 0);
translate(50, 0);
ellipse(0, 50, 33, 33);
pop();  // Restore original state
ellipse(100, 50, 33, 33);
```

## Environment
#### width
System variable that stores the width of the drawing artboard.  

You can use it like this:
```javascript
rect(0,0,width,height) //will draw a rectangle startin in (0,0), as tall and as wide as the artboard
```
#### height
System variable that stores the height of the drawing artboard.

You can use it like this:
```javascript
rect(0,0,width,height) //will draw a rectangle startin in (0,0), as tall and as wide as the artboard
```

## Rendering
#### createCanvas()
Creates a canvas element in the document, and sets the dimensions of it in pixels. This method should be called only once at the start of setup.

You can call it like this:
```javascript
createCanvas(200,200) //Will create an artboard of 200 x 200 pixels
```

There's not a way — YET — to create multiple canvases.

## Transform
#### rotate(angle)
Rotates a shape the amount specified. The angle must be specified in radians but you can convert degrees in radians using the radians() function.

You can call it like this:
```javascript
rotate(PI/5)
rect(0,0,100,100)
```

Note: rotate behaviour is not 100% consistent with p5.js. In Sketch, rotation always happens from the center of the shape.

#### translate(x,y)
Specifies an amount to displace objects within the artboard. The x parameter specifies left/right translation, the y parameter specifies up/down translation.

You can call it like this:
```javascript
translate(30, 20);
rect(0,0,100,100)
```

## Data
### Array Functions
append()
arrayCopy()
concat()
reverse()
shorten()
shuffle()
sort()
splice()
subset()

### Conversion
float()
int()
str()
boolean()
byte()
char()
unchar()
hex()
unhex()

### String Functions
join()
match()
matchAll()
nf()
nfc()
nfp()
nfs()
split()
splitTokens()
trim()

### Loading & Displaying
image()

symbol()
This function does not exist in p5.js for browser.

get([])
This function does not exist in p5.js for browser.

### Calculation
abs()
ceil()
constrain()
dist()
exp()
floor()
lerp()
log()
mag()
map()
max()
min()
norm()
pow()
round()
sq()
sqrt()

### Noise
noise()
noiseDetail()
noiseSeed()
Random
randomSeed()
random()
randomGaussian()

### Trigonometry
acos()
asin()
atan()
atan2()
cos()
sin()
tan()
degrees()
radians()

## Typography

### Attributes
textAlign()
textLeading()
textSize()

### Loading & Displaying
text()
textFont()
