# Index
- [Color](#color)
  * [Settings](#settings)
    + [background()](#backgroundcolor)
    + [fill()](#fillcolor)
    + [noFill()](#nofill)
    + [noStroke()](#nostroke)
    + [stroke()](#strokecolor)
- [Shape](#shape)
  * [2D Primitives](#2d-primitives)
    + [arc()](#arcxywhstartstop)
    + [ellipse()](#ellipsexywh)
    + [line()](#linex1y1x2y2)
    + [point()](#pointx1y1)
    + [quad()](#quadx1y1x2y2x3y3x4y4)
    + [rect()](#rectxywh)
    + [triangle()](#trianglex1y1x2y2x3y3)
  * [Attributes](#attributes)
    + [strokeCap()](#strokecapcap)
    + [strokeJoin()](#strokejoinjoin)
    + [strokeWeight()](#strokeweightn)
  * [Curves](#curves)
    + [bezier()](#bezierx1y1x2y2x3y3x4y4)
    + [Vertex](#vertex)
    + [beginShape()](#beginshape)
    + [vertex()](#vertexx1x1)
    + [bezierVertex()](#beziervertexx2y2x3y3x4y4)
    + [endShape()](#endshapeclose)
- [Constants](#constants)
    + [HALF_PI](#half_pi)
    + [PI](#pi)
    + [QUARTER_PI](#quarter_pi)
    + [TAU](#tau)
    + [TWO_PI](#two_pi)
- [Structure](#structure)
    + [setup()](#setup)
    + [draw()](#draw)
    + [push()](#push)
    + [pop()](#pop)
- [Environment](#environment)
    + [width](#width)
    + [height](#height)
- [Rendering](#rendering)
    + [createCanvas()](#createcanvas)
- [Transform](#transform)
    + [rotate()](#rotateangle)
    + [translate()](#translatexy)
- [Data](#data)
  * [Array Functions](#array-functions)
    + [append()](#appendarrayvalue)
    + [arrayCopy()](#arraycopysrcsrcpositiondstdstpositionlength)
    + [concat()](#concatab)
    + [reverse()](#reverselist)
    + [shorten()](#shortenlist)
    + [shuffle()](#shufflearraybool)
    + [sort()](#sortlistcount)
    + [splice()](#splicelistvalueposition)
    + [subset()](#subsetliststartcount)
  * [Loading & Displaying](#loading--displaying)
    + [image()](#imagenamexy)
    + [symbol()](#symbolnamexy)
    + [get()](#geturl)
  * [Calculation](#calculation)
    + [abs()](#absn)
    + [ceil()](#ceiln)
    + [constrain()](#constrainnlowhigh)
    + [dist()](#distx1y1x2y2)
    + [exp()](#expn)
    + [floor()](#floorn)
    + [lerp()](#lerpstartstopamt)
    + [logarithm()](#logarithmn)
    + [mag()](#magab)
    + [map()](#mapvaluestart1stop1start2stop2)
    + [max()](#maxn0)
    + [min()](#minn0)
    + [norm()](#normvaluestartstop)
    + [pow()](#powne)
    + [round()](#roundn)
    + [sq()](#sqn)
    + [sqrt()](#sqrtn)
  * [Noise](#noise)
    + [noise()](#noisexyz)
  * [Random](#random)
    + [random()](#randomminmax)
  * [Trigonometry](#trigonometry)
    + [cos()](#cosangle)
    + [sin()](#sinangle)
    + [tan()](#tanangle)
    + [degrees()](#degreesangle)
    + [radians()](#radiansangle)
- [Typography](#typography)
  * [Attributes](#attributes1)
    + [textAlign()](#textalignhorizalign)
    + [textLeading()](#textleadingn)
    + [textSize()](#textsizesize)
  * [Loading & Displaying](#loading--displaying-1)
    + [text()](#textstrxyx2y2)
    + [textFont()](#textfontfontname)

# Color
## Settings
### background(color)
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

### fill(color)
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

### noFill()
Removes Fills. If both noStroke() and noFill() are called, nothing will be drawn.

### noStroke()
Removes Borders. If both noStroke() and noFill() are called, nothing will be drawn.

### stroke(color)
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

# Shape
## 2D Primitives
### arc(x,y,w,h,start,stop)
Draw an arc. The arc has center in (x, y), has a width of w and an height of h. Start and stop are starting point and ending point of the angle measured in radians. P5.js has another argument for arc: OPEN, CHORD or PIE. Currently all arcs drawn as PIE.

You can call it like this:
```javascript
arc(250,250,500,100,0,PI)
```

### ellipse(x,y,w,h)
Draws an ellipse (oval). The ellipse has center in (x, y), has a width of w and an height of h.

You can call it like this:
```javascript
ellipse(250,250,500,100)
```

### line(x1,y1,x2,y2)
Draws a line (a direct path between two points). The line starts in (x1,y1) and ends in (x2,y2). To color a line, use the stroke() function. A line cannot be filled, therefore the fill() function will not affect the color of a line. Lines are drawn with a width of one pixel by default, but this can be changed with the strokeWeight() function.

You can call it like this:
```javascript
line(0,0,100,100)
```

### point(x1,y1)
Draws a point (a 1x1 rectangle). The point has a top left corner in (x1,y1). The color of the point is determined by the current stroke.

You can call it like this:
```javascript
point(150,150)
```

### quad(x1,y1,x2,y2,x3,y3,x4,y4)
Draw a quad. A quad is a quadrilateral, a four sided polygon. It is similar to a rectangle, but the angles between its edges are not constrained to ninety degrees. The first pair of parameters (x1,y1) sets the first vertex and the subsequent pairs should proceed clockwise or counter-clockwise around the defined shape.

You can call it like this:
```javascript
quad(38, 31, 86, 20, 69, 63, 30, 76);
```

### rect(x,y,w,h)
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

## Attributes
### strokeCap(CAP)
Sets the style for rendering line endings. The options are: SQUARE, PROJECT, and ROUND. The default cap is SQUARE.

You can call it like this:
```javascript
strokeCap(SQUARE);
strokeCap(PROJECT);
strokeCap(ROUND);
```

### strokeJoin(JOIN)
Sets the style of the joints which connect line segments. These joints are either mitered, beveled, or rounded and specified with the corresponding parameters MITER, BEVEL, and ROUND. The default joint is MITER.

You can call it like this:
```javascript
strokeJoin(MITER);
strokeJoin(BEVEL);
strokeJoin(ROUND);
```

### strokeWeight(n)
Sets the width (Thickness of the border) of the stroke used for lines, points, and the border around shapes. All widths are set in units of pixels.

You can call it like this:
```javascript
strokeWeight(4);
```

## Curves
### bezier(x1,y1,x2,y2,x3,y3,x4,y4)
Draws a cubic Bezier curve on the screen. These curves are defined by a series of anchor and control points. The first two parameters (x1,y1) specify the first anchor point and the last two parameters (x4,y4) specify the other anchor point, which become the first and last points on the curve. The middle parameters (x2,y2) and (x3,y3) specify the two control points which define the shape of the curve. Approximately speaking, control points "pull" the curve towards them.

You can call it like this:
```javascript
bezier(85, 20, 10, 10, 90, 90, 15, 80);
```

### Vertex
### beginShape()
### vertex(x1,x1)
### bezierVertex(x2,y2,x3,y3,x4,y4)
### endShape(CLOSE)

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

# Constants
### HALF_PI
HALF_PI is a mathematical constant with the value 1.57079632679489661923. It is half the ratio of the circumference of a circle to its diameter. It is useful in combination with the trigonometric functions sin() and cos().

You can call it like this:
```javascript
arc(50, 50, 80, 80, 0, HALF_PI);
```

### PI
PI is a mathematical constant with the value 3.14159265358979323846. It is the ratio of the circumference of a circle to its diameter. It is useful in combination with the trigonometric functions sin() and cos().

You can call it like this:
```javascript
arc(50, 50, 80, 80, 0, PI);
```

### QUARTER_PI
QUARTER_PI is a mathematical constant with the value 0.7853982. It is one quarter the ratio of the circumference of a circle to its diameter. It is useful in combination with the trigonometric functions sin() and cos().

You can call it like this:
```javascript
arc(50, 50, 80, 80, 0, QUARTER_PI);
```

### TAU
TAU is an alias for TWO_PI, a mathematical constant with the value 6.28318530717958647693. It is twice the ratio of the circumference of a circle to its diameter. It is useful in combination with the trigonometric functions sin() and cos().

You can call it like this:
```javascript
arc(50, 50, 80, 80, 0, TAU);
```

### TWO_PI
TWO_PI is a mathematical constant with the value 6.28318530717958647693. It is twice the ratio of the circumference of a circle to its diameter. It is useful in combination with the trigonometric functions sin() and cos().

You can call it like this:
```javascript
arc(50, 50, 80, 80, 0, TWO_PI);
```

# Structure
### setup()
The setup() function is called once when the program starts. It's used to define initial environment properties such as screen size and background color.

Note: Variables declared within setup() are not accessible within other functions, including draw().

You can call it like this:
```javascript
function setup() {
  createCanvas(200,200);
  background(0);
}
```

### draw()
Called directly after setup(), the draw() function executes the lines of code contained inside from top to bottom, drawing shapes and applying properties. In Sketch the draw function is always called only once. p5.js for Sketch is used to draw static images.

You can call it like this:
```javascript
function draw() {
  line(0,0,100,100);
}
```

### push()
### pop()
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

# Environment
### width
System variable that stores the width of the drawing artboard.  

You can use it like this:
```javascript
rect(0,0,width,height) //will draw a rectangle starting in (0,0), as tall and as wide as the artboard
```
### height
System variable that stores the height of the drawing artboard.

You can use it like this:
```javascript
rect(0,0,width,height) //will draw a rectangle starting in (0,0), as tall and as wide as the artboard
```

# Rendering
### createCanvas()
Creates a canvas element in the document, and sets the dimensions of it in pixels. This method should be called only once at the start of setup.

You can call it like this:
```javascript
createCanvas(200,200) //Will create an artboard of 200 x 200 pixels
```

There's not a way — YET — to create multiple canvases.

# Transform
### rotate(angle)
Rotates a shape the amount specified. The angle must be specified in radians but you can convert degrees in radians using the radians() function.

You can call it like this:
```javascript
rotate(PI/5)
rect(0,0,100,100)
```

Note: rotate behaviour is not 100% consistent with p5.js. In Sketch, rotation always happens from the center of the shape.

### translate(x,y)
Specifies an amount to displace objects within the artboard. The x parameter specifies left/right translation, the y parameter specifies up/down translation.

You can call it like this:
```javascript
translate(30, 20);
rect(0,0,100,100)
```

# Data
## Array Functions
### append(array,value)
Adds a value to the end of an array. Extends the length of the array by one. Maps to Array.push().

### arrayCopy(src,srcPosition,dst,dstPosition,length)
Copies an array (or part of an array) to another array. The src array is copied to the dst array, beginning at the position specified by srcPosition and into the position specified by dstPosition. The number of elements to copy is determined by length. Note that copying values overwrites existing values in the destination array. To append values instead of overwriting them, use concat().

The simplified version with only two arguments, arrayCopy(src, dst), copies an entire array to another of the same size. It is equivalent to arrayCopy(src, 0, dst, 0, src.length).

Using this function is far more efficient for copying array data than iterating through a for() loop and copying each element individually.

### concat(a,b)
Concatenates two arrays, maps to Array.concat(). Does not modify the input arrays.

### reverse(list)
Reverses the order of an array, maps to Array.reverse()

### shorten(list)
Decreases an array by one element and returns the shortened array, maps to Array.pop().

### shuffle(array,[bool])
Randomizes the order of the elements of an array.

### sort(list,[count])
Sorts an array of numbers from smallest to largest, or puts an array of words in alphabetical order. The original array is not modified; a re-ordered array is returned. The count parameter states the number of elements to sort. For example, if there are 12 elements in an array and count is set to 5, only the first 5 elements in the array will be sorted.

### splice(list,value,position)
Inserts a value or an array of values into an existing array. The first parameter specifies the initial array to be modified, and the second parameter defines the data to be inserted. The third parameter is an index value which specifies the array position from which to insert data. (Remember that array index numbering starts at zero, so the first position is 0, the second position is 1, and so on.)

### subset(list,start,[count])
Extracts an array of elements from an existing array. The list parameter defines the array from which the elements will be copied, and the start and count parameters specify which elements to extract. If no count is given, elements will be extracted from the start to the end of the array. When specifying the start, remember that the first array element is 0. This function does not change the source array.

## Loading & Displaying
### image(name,x,y)
Add an image to the artboard. The “name” parameter is the exact name of an existing symbol in string format. The image is placed in (x,y) and maintains the same width and height as defined in the symbol.

You can call it like this:
```javascript
image("logo",30, 20);
```

### symbol(name,x,y)
Add a symbol to the artboard. This function does not exist in p5.js for browser. The “name” parameter is the exact name of an existing symbol in string format. The image is placed in (x,y) and maintains the same width and height as defined in the symbol.

You can call it like this:
```javascript
symbol("button",30, 20);
```

### get([url])
Returns a .json from a url that you can use in your script. This function does not exist in p5.js for browser but it mimics what jQuery's get would do. The square brackets inside the round brackets are mandatory.

You can call it like this:
```javascript
var json = get(['http://api.open-notify.org/astros.json']);
```

## Calculation
### abs(n)
Calculates the absolute value (magnitude) of a number. Maps to Math.abs(). The absolute value of a number is always positive.

### ceil(n)
Calculates the closest int value that is greater than or equal to the value of the parameter. Maps to Math.ceil(). For example, ceil(9.03) returns the value 10.

### constrain(n,low,high)
Constrains a value between a minimum and maximum value.

### dist(x1,y1,x2,y2)
Calculates the distance between two points.

### exp(n)
Returns Euler's number e (2.71828...) raised to the power of the n parameter. Maps to Math.exp().

### floor(n)
Calculates the closest int value that is less than or equal to the value of the parameter. Maps to Math.floor().

### lerp(start,stop,amt)
Calculates a number between two numbers at a specific increment. The amt parameter is the amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc. The lerp function is convenient for creating motion along a straight path and for drawing dotted lines.

### logarithm(n)
Calculates the natural logarithm (the base-e logarithm) of a number. This function expects the n parameter to be a value greater than 0.0. Maps to Math.log().

Note: in p5.js this function is called just log(). Sketch however uses log() for logging items to macOS console. Since log() is extremely useful for debugging, I decided to rename this function.

### mag(a,b)
Calculates the magnitude (or length) of a vector. A vector is a direction in space commonly used in computer graphics and linear algebra. Because it has no "start" position, the magnitude of a vector can be thought of as the distance from the coordinate 0,0 to its x,y value. Therefore, mag() is a shortcut for writing dist(0, 0, x, y).

### map(value,start1,stop1,start2,stop2)
Re-maps a number from one range to another.

### max(n0)
Determines the largest value in a sequence of numbers, and then returns that value. max() accepts any number of Number parameters, or an Array of any length.

### min(n0)
Determines the smallest value in a sequence of numbers, and then returns that value. min() accepts any number of Number parameters, or an Array of any length.

### norm(value,start,stop)
Normalizes a number from another range into a value between 0 and 1. Identical to map(value, low, high, 0, 1). Numbers outside of the range are not clamped to 0 and 1, because out-of-range values are often intentional and useful.

### pow(n,e)
Facilitates exponential expressions. The pow() function is an efficient way of multiplying numbers by themselves (or their reciprocals) in large quantities. For example, pow(3, 5) is equivalent to the expression 33333 and pow(3, -5) is equivalent to 1 / 33333. Maps to Math.pow().

### round(n)
Calculates the integer closest to the n parameter. For example,
round(133.8) returns the value 134. Maps to Math.round().

### sq(n)
Squares a number (multiplies a number by itself). The result is always a positive number, as multiplying two negative numbers always yields a positive result. For example, -1 * -1 = 1.

### sqrt(n)
Calculates the square root of a number. The square root of a number is always positive, even though there may be a valid negative root. The square root s of number a is such that s*s = a. It is the opposite of squaring. Maps to Math.sqrt().

## Noise
### noise(x,[y],[z])
Returns the Perlin noise value at specified coordinates. Perlin noise is a random sequence generator producing a more natural ordered, harmonic succession of numbers compared to the standard random() function

## Random
### random([min],[max])
Return a random floating-point number. Takes either 0, 1 or 2 arguments. If no argument is given, returns a random number from 0 up to (but not including) 1. If one argument is given and it is a number, returns a random number from 0 up to (but not including) the number. If one argument is given and it is an array, returns a random element from that array. If two arguments are given, returns a random number from the first argument up to (but not including) the second argument.

## Trigonometry
### cos(angle)
Calculates the cosine of an angle. Parameters need to be entered in Radians, you can convert from degrees to radians with radians(). Values are returned in the range -1 to 1.

### sin(angle)
Calculates the sine of an angle. Parameters need to be entered in Radians, you can convert from degrees to radians with radians(). Values are returned in the range -1 to 1.

### tan(angle)
Calculates the tangent of an angle. Parameters need to be entered in Radians, you can convert from degrees to radians with radians(). This function takes into account the current angleMode. Values are returned in the range -1 to 1.

### degrees(angle)
Converts radians to degrees.

### radians(angle)
Converts degrees to radians.

# Typography
## Attributes
### textAlign(horizAlign)
Sets the current alignment for drawing text. Accepts LEFT, CENTER, or RIGHT as parameters.

You can call it like this:
```javascript
textAlign(CENTER);
text("Lorem ipsum",0,0,100,100);
```

### textLeading(n)
Sets the spacing, in pixels, between lines of text. This setting will be used in all subsequent calls to the text() function.

You can call it like this:
```javascript
textLeading(8);
text("Lorem ipsum dolor sit amet",0,0,100,100);
```

### textSize(size)
Sets the current font size. This size will be used in all subsequent calls to the text() function. Font size is measured in pixels.

You can call it like this:
```javascript
textSize(26);
text("Lorem ipsum dolor sit amet",0,0,100,100);
```

## Loading & Displaying
### text(str,x,y,[x2],[y2])
Draws text to the screen. Displays the information specified in the first parameter on the screen in the position specified by the additional parameters. A default font will be used unless a font is set with the textFont() function and a default size will be used unless a font is set with textSize(). Change the color of the text with the fill() function. Change the outline of the text with the stroke() and strokeWeight() functions.

The text displays in relation to the textAlign() function, which gives the option to draw to the left, right, and center of the coordinates.

The x2 and y2 parameters define a rectangular area to display within and may only be used with string data.

You can call it like this:
```javascript
text("Lorem ipsum dolor sit amet",0,0,100,100);
```

### textFont(fontName)
Sets the current font that will be drawn with the text() function.

You can call it like this:
```javascript
textFont("Georgia")
text("Lorem ipsum dolor sit amet",0,0,100,100);
```
