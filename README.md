# p5*Sketchapp
##### Version: 0.9
p5*Sketchapp is a plugin for running some [p5.js](http://p5js.org/) code inside Sketch.

p5*Sketchapp doesn't match the whole p5.js API but it gives you access to most of the basic functions for drawing on an artboard. Take a look at the reference page to see what is available.

The vast majority of the functions implemented match the behaviour available in p5.js. You can copy and paste code from the p5.js website examples and in most cases it will simply work.

A warning: you are about to execude code inside Sketch. The plugin is designed to act only on a single artboard and tested heavily, but bugs and broken code could still be dangerous. Save your work before using this plugin.

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
