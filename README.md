#P5Sketch (on hiatus, waiting to have time to update the API)
#####Version: 0.0.1

![p5Sketch](http://i.imgur.com/DzCuF8S.jpg "There’s an undocumented thing in this screenshot!")

P5Sketch is a plugin for running [p5.js](http://p5js.org/) code inside Sketch. The idea is to allow designers to draw complex graphics and work somewhat easily with dynamic datasets, with very few lines of code. (I.e.: with this thing you can finally draw proper pie charts in Sketch!)

The plugin is in very very early stages of development and I’m open to both help and suggestions from anyone (please use the [issues](https://github.com/jacopocolo/p5-sketchplugin/issues) tab for bugs and discussions). At the moment this repository is here for me and for anyone who want to try out this thing before it’s ready.

A warning: I didn’t experience crashes, not even when running completely broken while loops, but I strongly suggest you to save your work before running the plugin or working on a clean file.

If you still want to try this thing out, here’s how to do it.

##Instructions

P5Sketch works somewhat like p5.js: in the plugin package there’s a file called sketch.js. Inside the file there are two functions setup() and draw(). Inside these two functions you call other functions that draw stuff on the canvas.

Inside setup() you must call a createCanvas function, setting up a canvas to draw in.

Inside draw() you can call your drawing functions.

An example (the one you will find as a default in the sketch.js file) is:

```javascript
setup() {
createCanvas(500,500) //It creates a 500x500 pixels artboard to draw in
}

draw() {
line(0,0,100,100) //It draws a line that starts in x: 0 y: 0 and ends in x: 100 y: 100
}
```

As of today, the only way to edit this sketch.js file is to do it manually, opening the sketch plugin folder, opening the sketchplugin package and editing the sketch.js file with a code editor and then running the plugin from the plugin menu (Sketch is not the best in keeping up with updates in the plugin folder so you might have to run it few times before you see actual changes in the canvas). I hope to improve the experience adding a user interface for this plugin soon.

P5.js is an extremely powerful framework, able to do a lot of things: 2d graphics, raster manipulation, 3d… At the moment this plugin allows to call a very limited selection of functions, mostly 2d primitives. Here’s the list of functions you can call as of today:

- [Setup functions](https://github.com/jacopocolo/p5-sketchplugin/#setup-functions)
- [2d primitives](https://github.com/jacopocolo/p5-sketchplugin/#2d-primitives)
- [Attributes functions](https://github.com/jacopocolo/p5-sketchplugin/#attributes-functions)
- [Utility functions](https://github.com/jacopocolo/p5-sketchplugin/#utility-functions)

##[Setup functions](#setup-functions)

####createCanvas(width, height)

This function checks if a canvas artboard already exists and if it doesn’t it draws it. If the canvas already exists, it deletes all the layers inside and draw new ones. The idea is to mimic the behaviour of the Processing canvas, where every time you run the code, you create something new.

You can call it like this:
```javascript
createCanvas(500, 500)
```
and it will create a 500x500 pixels artboard called p5canvas. If you don’t have a canvas in your page, it will create a new one to the left of the artboard to the most left.


####background(color)

It sets the background color of the p5canvas artboard. The default color is white. It accepts both hex and rgb values.

You can call it like this:
```javascript
background("#00FF00")
```
or
```javascript
background("rgb(0,255,0)")
```

##[2D primitives](#2d-primitives)

####point(x, y)

A simple point. Sketch doesn’t really have a point shape so here it’s drawn as a 1x1 pixel rectangle. It does have a fill color, it doesn’t have a stroke color. 

You can call it like this:
```javascript
point(100,100)
```
and it will draw a 1x1 pixel rectangle in 100, 100.


####line(x1, y1, x2, y2)

A simple line from x1, y1 to x2, y2. It sadly doesn’t behave like the Sketch line but as a path. I.E.: you cannot edit it as a line. It doesn’t have a fill color, it has a stroke color.

You can call it like this:
```javascript
line(0,0,100,100)
```
and it will draw a line starting at 0,0 and ending at 100,100.


####rect(x, y, w, h)

A rectangle that starts from x, y and has a height of h and a width of w. The angles are always at 90 degrees. It has both a fill and a stroke color. 

You can call it like this:
```javascript
rect(0,0,100,200)
```
and it will draw a rectangle with the top left corner in 0,0 and with a width of 100 pixels and a height of 200 pixels.


####quad(x1, y1, x2, y2, x3, y3, x4, y4)

A four sided polygon. With corners in x1,y1 x2,y2 x3,y3 x4,y4. It has both a fill and a stroke color. 

You can call it like this:
```javascript
quad(0,0,100,200,400,400,200,90)
```
and it will draw a shape with corners in 0,0 100,200 400,400 and 200,90.


####triangle(x1, y1, x2, y2, x3, y3)

A three sided polygon. With corners in x1,y1 x2,y2 x3,y3. It has both a fill and a stroke color.

You can call it like this:
```javascript
triangle(0,0,100,200,400,400)
```
and it will draw a shape with corners in 0,0 100,200 400,400.


####ellipse(a, b, c, d)

An ellipse centered in (a, b) and with a width of c and an height of d. It has both a fill and a stroke color.

You can call it like this:
```javascript
ellipse(250,250,500,100)
```
and it will draw an ellipse centred in 250,250 with a width of 500 and an height of 100. If you want a perfect circle, you must use the same value for c and d.

####arc(a,b,c,d,start,stop)

An arc with the center in (a, b) a width of c and an height of d, Start and stop are starting point and ending point of the angle measured in radians. You can use degreesToRadians(degrees) to convert from degrees to radians. It has both a fill and a stroke color

You can call it like this:
```javascript
arc(250,250,500,100,0,PI)
```
and it will draw an arc centred in 250,250, with a width of 500 and an height of 100. The arc starts at 0 and stops at PI, going clockwise. The plugin will generate a shape with two intersecting shapes for every arc you draw.


####text(str, x, y, x2, y2)

A text block with str as content, placred in (x, y) and with optional values of (x2, y2) to set the width and the height of the bounding box. If x2 and y2 are not set the bounding box will wrap around the text. It doesn’t have a fill color, it has a stroke color.

You can call it like this:
```javascript
text("Hello world",10,10,100,200)
```
and it will draw a text layer that says "Hello world" with the upper left corner in 10,10 and a width of 100 and a height of 200 pixels.


####bezier(x1,y1,x2,y2,x3,y3,x4,y4)

A Bezier curve. The curve starts in x1,y1 and ends in x4,y4. x2,y2 and x3,y3 are the control points for the curve. It has both a fill and a stroke color.

You can call it like this:
```javascript
bezier(85, 20, 10, 10, 90, 90, 15, 80);
```
and it will draw a bezier curve starting in 85,20 and ending in 15,80. The control point for the beginning of the curve is in 20,10 and the control point for the end of the curve is in 90,90.


##[Attributes functions](#attributes-functions)

####textSize(size)

It sets the size of the text in pixels. 

You can call it like this:
```javascript
textSize(24)
```
and it will set the size of a text() to 24 pixels. The default text size is 12.


####textFont(textFont)

It sets the font of the text. The default font is Helvetica.

You can call it like this:
```javascript
textFont("Georgia")
```
and it will set the font of text() to Georgia. If you want to set bold, light or else you need to use the full name like this: textFont("Georgia Bold").


####fill(color)

It sets the color of the fill. The default fill color is white. It accepts both hex and rgb values. It doesn’t accept (yet) RGBA values. 

You can call it like this:
```javascript
fill("#0000FF")
```
or
```javascript
fill("rgb(0,0,255)")
```

####stroke(color)

It sets the color of the border. The default stroke color is black. It accepts both hex and rgb values. It doesn’t accept (yet) RGBA values. 

You can call it like this:
```javascript
stroke("#FF0000")
```
or
```javascript
stroke("rgb(255,0,0)")
```

####strokeWeight(weight)

It sets the thickness of the border in pixels. The default thickness is 1.  

You can call it like this:
```javascript
strokeWeight(8)
```

####noStroke()

It removes the stroke from the shape.

You can call it like this:
```javascript
noStroke()
```

##[Utility functions](#utility-functions)

####random(min, max)

It returns a random number. Takes either 0, 1 or 2 arguments. If no argument is given, returns a random number between 0 and 1. If one argument is given, returns a random number between 0 and the number. If two arguments are given, returns a random number between them, inclusive.

You can call it like this:
```javascript
random()
```
or
```javascript
random(10)
```
or
```javascript
random(1, 100)
```

##Debugging your sketch
Sketch doesn’t have a console but relies on the OSX Console for debugging. If your Sketch is not working properly, the plugin crashed or something else happened, you’ll find out there. Keep it open when running the plugin.

##Messy to-do list

- Set a default for create canvas so it create a canvas even if the function is not actually called

- ~~Set a default background color when background color is not set and artboard is already created~~

- ~~Code “read just from file”~~

- ~~Default should use Sketch default colors: “#D8D8D8” for fill, “#979797” for stroke~~

- ~~Implement beginShape(), vertex(), bezierVertex(), endShape()~~

- ~~Implement cos(), sin() and tan()~~

- ~~Implement [all the calculation functions](http://p5js.org/reference/#group-Math)~~

- Test all the calc functions

- Implement blendMode()

- ~~Implement push() and pop()~~

- Add translate() and rotate() in push and pop

- ~~Implement translate()~~

- ~~Limit code layer width~~

- ~~Have p5Code artboard update its size based on code length~~

- ~~Improve p5Code resizing~~

- ~~Implement noise()~~

- ~~Implement noFill()~~

- ~~Implement map()~~

- ~~Make consistent functions for fill() and stroke()~~

- ~~Implement rgba for both fill() and stroke()~~

- ~~Implement rotate()~~

- Implement border radius for rect()

- ~~Implement strokeCap()~~
