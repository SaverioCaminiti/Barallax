# Barallax

A simple JS library for nice parallax effects on CSS backgrounds.

Barallax support two parallax effects: _slow down background_ and _boxed backgroud_.
The former is the one you can see on Spotify website, Google Play, and many other websites; the latter is used for example by WhatsApp to scroll photos in chat or by the Meteo iOS7 app in list mode if you have many locations.

*Barallax is based on requestAnimationFrame rather than CSS 3D transformations.*

## Usage

In your html file you must include JQuery and the main Barallax.js file.
```html
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="/yourpath/Barallax.js"></script>
```

### Slow down background

To use this effect start by adding some nice background to your page body via CSS, something like this:
```css
body {
	background: #eee url(bg.png) 50% 0px no-repeat;
	background-size: 100% auto;
}
```
And let Barallax slow down the way it scrolls by manipulating `background-position` for you
```js
var barallax = new Barallax();
barallax.addSlowBackground($("body"), "50%", .25);
```
Open to [sample1](http://saveriocaminiti.github.io/Barallax/samples/sample1.html) to see this in action.

The method `addSlowBackground()` has 3 parameters:
* target element(s): whose `background-position` should be manipulated. This must be a JQuery object (corresponding to either a single element or to a set of elements in the page DOM).
* horizontal background position: this is simply the horizontal component of `background-position`, use either a percentage or a pixel value here.
* speed multiplier: this tells how slow the background should move with respect to the page scrolling. E.g., if the speed is .25 and the page scrolls by 200px the vertical component of `background-position` will be 200*.25 = 50px.


Notice that you can manipulate the `background-position` of any element based on page scrolling, you're not limited to the body background.

Moreover, you can add several elements to the same instance of Barallax by calling `addSlowBackground()` more than one time.

Barallax can also monitor the scrolling of block elements other than the main page. Simply specify which block you want Barallax to monitor whe you create it:
```js
var barallax = new Barallax($('#myScrollingBlock'));
```
The parameter must be a JQuery object and if it refers to a set of elements, only the first one is used.
Then you simply call `addSlowBackground()` to add targets.
You can even have several instances of Barallax that monitor different scrollable elements.

Open to [sample2](http://saveriocaminiti.github.io/Barallax/samples/sample2.html) to see this in action.

A few final remarks on speed mnultiplier:
* speed > 1 let the background scroll faster than the page/block, this may be used for some cool effect.
* negative speed values let the background scroll in opposite direction with respect to the page/block, kind of crazy.


### Boxed background
To apply this effect you simply have to specify target and horizontal background position, the vetical background position is automatically interpolade between 0 and 100% based on the relative position of each target with respect to the scrolling block (or page).
```js
barallax.addBoxedBackground($(".myTarget"), "50%");
```
This effect assumes that the target is inside the scrolling block, if it is not true you may see something strange due to the fact that vetical background position goes below 0% or over 100%.

Refer to [sample3](http://saveriocaminiti.github.io/Barallax/samples/sample3.html) for a WhatsApp-like chat effect and to [sample4](http://saveriocaminiti.github.io/Barallax/samples/sample4.html) for something that resembles the iOS meteo location list.

### Remove
What to remove a background scroll effect previously associated? Just retain the value returned by and add method and use the appropriate remove method. 
```js
ref = barallax.addSlowBackground($("#myTarget"), "50%", .5);
...
barallax.removeSlowBackground(ref);
```

```js
ref = barallax.addBoxedBackground($("#myTarget"), "0%");
...
barallax.removeBoxedBackground(ref);
```

### Update
Barallax watch for window resize events to update correctly but if you create a Barallax instance for a scrolling block and this block is resized without a window resize (e.g., programmatically) then you have to force the Barallax instance to update manually.
```js
barallax.update();
```


## Credits

Barallax by [Saverio Caminiti](http://saverio.caminiti.eu/) released under MIT license.

Barallax depends on [JQuery](http://jquery.com/) and  uses [requestAnimationFrame polyfill](https://gist.github.com/paulirish/1579671) by Erik Möller.
