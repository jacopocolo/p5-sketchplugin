# p5*Sketchapp
##### Version: 0.9

p5*Sketchapp is a plugin for running some [p5.js](http://p5js.org/) code inside Sketch.

p5*Sketchapp doesn't match the whole p5.js API but it gives you access to most of the basic functions for drawing on an artboard. Take a look at the reference page to see what is available.

The vast majority of the functions implemented match the behaviour available in p5.js. You can copy and paste code from the p5.js website examples and in most cases it will simply work.

A warning: you are about to execude code inside Sketch. The plugin is designed to act only on a single artboard and tested heavily, but bugs and broken code could still be dangerous. Save your work before using this plugin.

## Reference

- [Color](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#color)
  * Settings
    + [background()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#backgroundcolor)
    + [fill()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#fillcolor)
    + [noFill()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#nofill)
    + [noStroke()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#nostroke)
    + [stroke()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#strokecolor)
- [Shape](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#shape)
  * 2D Primitives
    + [arc()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#arcxywhstartstop)
    + [ellipse()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#ellipsexywh)
    + [line()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#linex1y1x2y2)
    + [point()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#pointx1y1)
    + [quad()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#quadx1y1x2y2x3y3x4y4)
    + [rect()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#rectxywh)
    + [triangle()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#trianglex1y1x2y2x3y3)
  * Attributes
    + [strokeCap()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#strokecapcap)
    + [strokeJoin()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#strokejoinjoin)
    + [strokeWeight()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#strokeweightn)
  * Curves
    + [bezier()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#bezierx1y1x2y2x3y3x4y4)
    + [Vertex](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#vertex)
    + [beginShape()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#beginshape)
    + [vertex()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#vertexx1x1)
    + [bezierVertex()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#beziervertexx2y2x3y3x4y4)
    + [endShape()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#endshapeclose)
- [Constants](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#constants)
    + [HALF_PI](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#half_pi)
    + [PI](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#pi)
    + [QUARTER_PI](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#quarter_pi)
    + [TAU](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#tau)
    + [TWO_PI](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#two_pi)
- [Structure](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#structure)
    + [setup()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#setup)
    + [draw()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#draw)
    + [push()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#push)
    + [pop()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#pop)
- [Environment](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#environment)
    + [width](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#width)
    + [height](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#height)
- [Rendering](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#rendering)
    + [createCanvas()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#createcanvas)
- [Transform](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#transform)
    + [rotate()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#rotateangle)
    + [translate()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#translatexy)
- [Data](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#data)
  * Array Functions
    + [append()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#appendarrayvalue)
    + [arrayCopy()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#arraycopysrcsrcpositiondstdstpositionlength)
    + [concat()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#concatab)
    + [reverse()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#reverselist)
    + [shorten()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#shortenlist)
    + [shuffle()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#shufflearraybool)
    + [sort()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#sortlistcount)
    + [splice()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#splicelistvalueposition)
    + [subset()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#subsetliststartcount)
  * Loading & Displaying
    + [image()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#imagenamexy)
    + [symbol()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#symbolnamexy)
    + [get()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#geturl)
  * Calculation
    + [abs()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#absn)
    + [ceil()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#ceiln)
    + [constrain()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#constrainnlowhigh)
    + [dist()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#distx1y1x2y2)
    + [exp()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#expn)
    + [floor()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#floorn)
    + [lerp()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#lerpstartstopamt)
    + [logarithm()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#logarithmn)
    + [mag()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#magab)
    + [map()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#mapvaluestart1stop1start2stop2)
    + [max()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#maxn0)
    + [min()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#minn0)
    + [norm()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#normvaluestartstop)
    + [pow()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#powne)
    + [round()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#roundn)
    + [sq()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#sqn)
    + [sqrt()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#sqrtn)
  * Noise
    + [noise()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#noisexyz)
  * Random
    + [random()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#randomminmax)
  * Trigonometry
    + [cos()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#cosangle)
    + [sin()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#sinangle)
    + [tan()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#tanangle)
    + [degrees()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#degreesangle)
    + [radians()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#radiansangle)
- [Typography](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#typography)
  * Attributes
    + [textAlign()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#textalignhorizalign)
    + [textLeading()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#textleadingn)
    + [textSize()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#textsizesize)
  * Loading & Displaying
    + [text()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#textstrxyx2y2)
    + [textFont()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/cheatsheet.md#textfontfontname)

## Debugging your sketch
Debugging in Sketch is not simple. Sketch doesn’t have a console but relies on macOS Console for debugging. If your code is not working as expected, you can take a look there and see if something pops up. If you are running macOS Sierra or above, see [this thread](http://sketchplugins.com/d/50-i-can-t-get-anymore-debugging-from-console-app-system-log) to configure your Console to catch Sketch issues.

Even before looking at the console, however, do this:
- check if the functions you are using are documented in the reference page and if you are using the right parameters.
- remember that in p5.js the draw function is called continuously while in p5*Sketchapp it's called only once. Consider if you need to wrap your function in a loop to achieve what you want.

## To-do list

### 1.0
- Reset artboard with the drawingContext

- Test all the calc functions

- Add to UI:
  - Bug report & feedback link
  - Debug tips
  - Warning
  - Cheatsheet with current API

### Future releases

- Implement 'rgb(255,255,255)' and 'rgba(255,255,255,1)' notations for fill and stroke

- Set a default for create canvas so it create a canvas even if the function is not actually called

- Implement border radius for rect()

- Implement blendMode()

- Allow users to create multiple canvas artboards? Maybe?

- Figure out if it's possible to import external libraries?
