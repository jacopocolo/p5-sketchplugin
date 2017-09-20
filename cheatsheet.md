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

quad()
rect()
triangle()

### Attributes
strokeCap()
strokeJoin()
strokeWeight()

### Curves
bezier()

### Vertex
beginShape()
bezierVertex()
endShape()
vertex()

## Constants
HALF_PI
PI
QUARTER_PI
TAU
TWO_PI

## Structure
setup()
draw()
push()
pop()

## Environment
width
height

## Rendering
createCanvas()

## Transform
rotate()
translate()

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
