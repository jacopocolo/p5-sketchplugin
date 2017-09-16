# Full API Reference

## Color
### Creating & Reading
~alpha()~: not implemented
~blue()~: not implemented
~brightness()~: not implemented
~color()~: not implemented
~green()~: not implemented
~hue()~: not implemented
~lerpColor()~: not implemented
~lightness()~: not implemented
~red()~: not implemented
~saturation()~: not implemented

### Setting
background()
~clear()~: doesn't make sense in Sketch
~colorMode()~
fill()
noFill()
noStroke()
stroke()

## Shape
### 2D Primitives
arc()
ellipse()
line()
point()
quad()
rect()
triangle()

### Attributes
~ellipseMode()~: not implemented
~noSmooth()~: doesn't make sense in Sketch
~rectMode()~: not implemented
~smooth()~: doesn't make sense in Sketch
strokeCap()
strokeJoin()
strokeWeight()

### Curves
bezier()
~bezierPoint()~: not implemented
~bezierTangent()~: not implemented
~curve()~: not implemented
~curveTightness()~: not implemented
~curvePoint()~: not implemented
~curveTangent()~: not implemented

### Vertex
~beginContour()~: not implemented
beginShape()
bezierVertex()
~curveVertex()~: not implemented
~endContour()~: not implemented
endShape()
~quadraticVertex()~: not implemented
vertex()

### 3D Models
~loadModel()~: not implemented
~model()~: not implemented

### 3D Primitives
~plane()~: not implemented
~box()~: not implemented
~sphere()~: not implemented
~cylinder()~: not implemented
~cone()~: not implemented
~ellipsoid()~: not implemented
~torus()~: not implemented

## Constants
HALF_PI
PI
QUARTER_PI
TAU
TWO_PI

## Structure
~preload()~: doesn't make sense in Sketch
setup()
draw()
~remove()~: doesn't make sense in Sketch
~noLoop()~: doesn't make sense in Sketch
~loop()~: doesn't make sense in Sketch
push()
pop()
~redraw()~: doesn't make sense in Sketch

## Environment
~print()~: doesn't make sense in Sketch
~frameCount~: doesn't make sense in Sketch
~focused~: doesn't make sense in Sketch
~cursor()~: doesn't make sense in Sketch
~frameRate()~: doesn't make sense in Sketch
~noCursor()~: doesn't make sense in Sketch
~displayWidth~: doesn't make sense in Sketch
~displayHeight~: doesn't make sense in Sketch
~windowWidth~: doesn't make sense in Sketch
~windowHeight~: doesn't make sense in Sketch
~windowResized()~: doesn't make sense in Sketch
width
height
~fullscreen()~: doesn't make sense in Sketch
~pixelDensity()~: doesn't make sense in Sketch
~displayDensity()~: doesn't make sense in Sketch
~getURL()~: not implemented
~getURLPath()~: not implemented
~getURLParams()~: not implemented

## Rendering
createCanvas()
~resizeCanvas()~: not implemented
~noCanvas()~: not implemented
~createGraphics()~: not implemented
~blendMode()~: not implemented

## Transform
~applyMatrix()~: not implemented
~resetMatrix()~: not implemented
rotate()
~rotateX()~: not implemented
~rotateY()~: not implemented
~rotateZ()~: not implemented
~scale()~: not implemented
~shearX()~: not implemented
~shearY()~: not implemented
translate()

## Data
### Dictionary
~p5.TypedDict~: not implemented
~p5.NumberDict~: not implemented

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

## Image
~createImage()~: not implemented
~saveCanvas()~: not implemented
~saveFrames()~: not implemented
~p5.Image~: not implemented

### Loading & Displaying
~loadImage()~: doesn't make sense in Sketch
image()
~tint()~: not implemented
~noTint()~: not implemented
~imageMode()~: not implemented

### Pixels
~pixels~: not implemented
~blend()~: not implemented
~copy()~: not implemented
~filter()~: not implemented
~get()~: not implemented
~loadPixels()~: not implemented
~set()~: not implemented
~updatePixels()~: not implemented

## Math
~createVector()~: not implemented
~p5.Vector~: not implemented

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
~angleMode()~: not implemented

## Typography
### Attributes
textAlign()
textLeading()
textSize()
~textStyle()~: not implemented
~textWidth()~: not implemented
~textAscent()~: not implemented
~textDescent()~: not implemented

### Loading & Displaying
~loadFont()~: doesn't make sense in Sketch
text()
textFont()

### Font
~p5.Font~: not implemented

## Lights, Camera
### Camera
~camera()~: not implemented
~perspective()~: not implemented
~ortho()~: not implemented

### Lights
~ambientLight()~: not implemented
~directionalLight()~: not implemented
~pointLight()~: not implemented

### Material
~normalMaterial()~: not implemented
~texture()~: not implemented
~ambientMaterial()~: not implemented
~specularMaterial()~: not implemented

~p5.RendererGL~: not implemented
