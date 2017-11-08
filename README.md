# p5.sketchplugin
## Create rich and editable graphics inside Sketch using only few lines of JavaScript

p5.sketchplugin is a plugin for running some [p5.js](http://p5js.org/) code inside Sketch. You write simple JavaScript — using the powerful p5.js functions — and it creates editable layers in a new artobard.

After you run the code, all the functions you called are rendered as native Sketch objects: this means that you can tweak every single object you create when you are done. Your code will rendered in the same artboard every time your run it. If you want to keep a copy, duplicate the artboard.

Read more at: [jacopocolo.com/p5sketchplugin/](http://www.jacopocolo.com/p5sketchplugin/)

## Installation

### [Download the latest version here](https://github.com/jacopocolo/p5-sketchplugin/releases)

## Limitations

p5.sketchplugin doesn't match the whole p5.js library but it gives you access to most of the basic functions for drawing on an artboard. Take a look at the [reference](#reference) below to see what is available and how to call these functions.

The vast majority of the functions implemented match the behaviour available in p5.js. You can copy and paste code from the [p5.js website examples](https://p5js.org/examples/) and in most cases it will simply work. If it doesn't, take a look at the [debugging](#debugging-your-code) section for tips on how to adjust your code.

A warning: you are about to execute code inside Sketch. The plugin is designed to act only on a single artboard and tested heavily, but bugs and broken code could still be dangerous. Save your work before using this plugin.

## Reference

- [Color](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#color)
  * Settings
    + [background()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#backgroundcolor)
    + [fill()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#fillcolor)
    + [noFill()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#nofill)
    + [noStroke()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#nostroke)
    + [stroke()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#strokecolor)
- [Shape](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#shape)
  * 2D Primitives
    + [arc()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#arcxywhstartstop)
    + [ellipse()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#ellipsexywh)
    + [line()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#linex1y1x2y2)
    + [point()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#pointx1y1)
    + [quad()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#quadx1y1x2y2x3y3x4y4)
    + [rect()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#rectxywh)
    + [triangle()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#trianglex1y1x2y2x3y3)
  * Attributes
    + [strokeCap()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#strokecapcap)
    + [strokeJoin()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#strokejoinjoin)
    + [strokeWeight()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#strokeweightn)
  * Curves
    + [bezier()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#bezierx1y1x2y2x3y3x4y4)
    + [Vertex](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#vertex)
    + [beginShape()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#beginshape)
    + [vertex()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#vertexx1x1)
    + [bezierVertex()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#beziervertexx2y2x3y3x4y4)
    + [endShape()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#endshapeclose)
- [Constants](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#constants)
    + [HALF_PI](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#half_pi)
    + [PI](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#pi)
    + [QUARTER_PI](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#quarter_pi)
    + [TAU](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#tau)
    + [TWO_PI](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#two_pi)
- [Structure](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#structure)
    + [setup()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#setup)
    + [draw()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#draw)
    + [push()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#push)
    + [pop()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#pop)
- [Environment](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#environment)
    + [width](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#width)
    + [height](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#height)
- [Rendering](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#rendering)
    + [createCanvas()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#createcanvas)
- [Transform](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#transform)
    + [rotate()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#rotateangle)
    + [translate()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#translatexy)
- [Data](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#data)
  * Array Functions
    + [append()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#appendarrayvalue)
    + [arrayCopy()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#arraycopysrcsrcpositiondstdstpositionlength)
    + [concat()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#concatab)
    + [reverse()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#reverselist)
    + [shorten()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#shortenlist)
    + [shuffle()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#shufflearraybool)
    + [sort()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#sortlistcount)
    + [splice()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#splicelistvalueposition)
    + [subset()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#subsetliststartcount)
  * Loading & Displaying
    + [image()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#imagenamexy)
    + [symbol()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#symbolnamexy)
    + [get()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#geturl)
  * Calculation
    + [abs()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#absn)
    + [ceil()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#ceiln)
    + [constrain()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#constrainnlowhigh)
    + [dist()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#distx1y1x2y2)
    + [exp()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#expn)
    + [floor()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#floorn)
    + [lerp()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#lerpstartstopamt)
    + [logarithm()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#logarithmn)
    + [mag()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#magab)
    + [map()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#mapvaluestart1stop1start2stop2)
    + [max()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#maxn0)
    + [min()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#minn0)
    + [norm()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#normvaluestartstop)
    + [pow()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#powne)
    + [round()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#roundn)
    + [sq()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#sqn)
    + [sqrt()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#sqrtn)
  * Noise
    + [noise()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#noisexyz)
  * Random
    + [random()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#randomminmax)
  * Trigonometry
    + [cos()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#cosangle)
    + [sin()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#sinangle)
    + [tan()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#tanangle)
    + [degrees()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#degreesangle)
    + [radians()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#radiansangle)
- [Typography](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#typography)
  * Attributes
    + [textAlign()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#textalignhorizalign)
    + [textLeading()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#textleadingn)
    + [textSize()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#textsizesize)
  * Loading & Displaying
    + [text()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#textstrxyx2y2)
    + [textFont()](https://github.com/jacopocolo/p5-sketchplugin/blob/master/reference.md#textfontfontname)

## Debugging your code
Debugging in Sketch is not simple. Sketch doesn’t have a console but relies on macOS Console for debugging. If your code is not working as expected, you can take a look there and see if something pops up. If you are running macOS Sierra or above, see [this thread](http://sketchplugins.com/d/50-i-can-t-get-anymore-debugging-from-console-app-system-log) to configure your Console to catch Sketch issues.

Even before looking at the console, however, do this:
- check if the functions you are using are documented in the reference page and if you are using the right parameters.
- remember that in p5.js the draw function is called continuously while in p5.sketchplugin it's called only once. Consider if you need to wrap your function in a loop to achieve what you want.

## To-do list

### 1.0

- Get it running with Sketch Runner

- Review Github presentation

### Future releases

- get() broke with Sketch 47. Figure out how to support it again

- Store latest code in [preferences](http://mail.sketchplugins.com/pipermail/dev_sketchplugins.com/2015-February/003019.html)?

- Implement 'rgb(255,255,255)' and 'rgba(255,255,255,1)' notations for fill and stroke

- Set a default for create canvas so it create a canvas even if the function is not actually called

- Implement border radius for rect()

- Implement blendMode()

- Allow users to create multiple canvas artboards? Maybe?

- Figure out if it's possible to import external libraries?
