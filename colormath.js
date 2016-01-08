function isArray(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
}

function isString(obj) {
	return typeof obj === "string";
}

function interpolate(a,b,p) {
	return a + (b - a) * p;
	}

// store color internally as [R,G,B]
function Color(val) {
	var rgb;
	// if [r,g,b]
	if(isArray(val) && val.length > 1) {
		rgb = val;
	// if r,g,b
	}  else if(arguments.length === 3 || arguments.length === 4) {
		rgb = arguments;
        
	// if is a css color name
	}  else if(arguments.length === 1 && isString(val) && !this.isHex(val)) {
		rgb = this.nameToRgb(val);
	}
	// if hex
	else {
		rgb = this.hexToRgb(val);
	}
	this.r = rgb[0];
	this.g = rgb[1];
	this.b = rgb[2];
	this.a = rgb[3] || 1;
}

Color.prototype.cssNames = {
		  "aliceblue": "#f0f8ff",
		  "antiquewhite": "#faebd7",
		  "aqua": "#00ffff",
		  "aquamarine": "#7fffd4",
		  "azure": "#f0ffff",
		  "beige": "#f5f5dc",
		  "bisque": "#ffe4c4",
		  "black": "#000000",
		  "blanchedalmond": "#ffebcd",
		  "blue": "#0000ff",
		  "blueviolet": "#8a2be2",
		  "brown": "#a52a2a",
		  "burlywood": "#deb887",
		  "cadetblue": "#5f9ea0",
		  "chartreuse": "#7fff00",
		  "chocolate": "#d2691e",
		  "coral": "#ff7f50",
		  "cornflowerblue": "#6495ed",
		  "cornsilk": "#fff8dc",
		  "crimson": "#dc143c",
		  "cyan": "#00ffff",
		  "darkblue": "#00008b",
		  "darkcyan": "#008b8b",
		  "darkgoldenrod": "#b8860b",
		  "darkgray": "#a9a9a9",
		  "darkgreen": "#006400",
		  "darkgrey": "#a9a9a9",
		  "darkkhaki": "#bdb76b",
		  "darkmagenta": "#8b008b",
		  "darkolivegreen": "#556b2f",
		  "darkorange": "#ff8c00",
		  "darkorchid": "#9932cc",
		  "darkred": "#8b0000",
		  "darksalmon": "#e9967a",
		  "darkseagreen": "#8fbc8f",
		  "darkslateblue": "#483d8b",
		  "darkslategray": "#2f4f4f",
		  "darkslategrey": "#2f4f4f",
		  "darkturquoise": "#00ced1",
		  "darkviolet": "#9400d3",
		  "deeppink": "#ff1493",
		  "deepskyblue": "#00bfff",
		  "dimgray": "#696969",
		  "dimgrey": "#696969",
		  "dodgerblue": "#1e90ff",
		  "firebrick": "#b22222",
		  "floralwhite": "#fffaf0",
		  "forestgreen": "#228b22",
		  "fuchsia": "#ff00ff",
		  "gainsboro": "#dcdcdc",
		  "ghostwhite": "#f8f8ff",
		  "gold": "#ffd700",
		  "goldenrod": "#daa520",
		  "gray": "#808080",
		  "green": "#008000",
		  "greenyellow": "#adff2f",
		  "grey": "#808080",
		  "honeydew": "#f0fff0",
		  "hotpink": "#ff69b4",
		  "indianred": "#cd5c5c",
		  "indigo": "#4b0082",
		  "ivory": "#fffff0",
		  "khaki": "#f0e68c",
		  "lavender": "#e6e6fa",
		  "lavenderblush": "#fff0f5",
		  "lawngreen": "#7cfc00",
		  "lemonchiffon": "#fffacd",
		  "lightblue": "#add8e6",
		  "lightcoral": "#f08080",
		  "lightcyan": "#e0ffff",
		  "lightgoldenrodyellow": "#fafad2",
		  "lightgray": "#d3d3d3",
		  "lightgreen": "#90ee90",
		  "lightgrey": "#d3d3d3",
		  "lightpink": "#ffb6c1",
		  "lightsalmon": "#ffa07a",
		  "lightseagreen": "#20b2aa",
		  "lightskyblue": "#87cefa",
		  "lightslategray": "#778899",
		  "lightslategrey": "#778899",
		  "lightsteelblue": "#b0c4de",
		  "lightyellow": "#ffffe0",
		  "lime": "#00ff00",
		  "limegreen": "#32cd32",
		  "linen": "#faf0e6",
		  "magenta": "#ff00ff",
		  "maroon": "#800000",
		  "mediumaquamarine": "#66cdaa",
		  "mediumblue": "#0000cd",
		  "mediumorchid": "#ba55d3",
		  "mediumpurple": "#9370db",
		  "mediumseagreen": "#3cb371",
		  "mediumslateblue": "#7b68ee",
		  "mediumspringgreen": "#00fa9a",
		  "mediumturquoise": "#48d1cc",
		  "mediumvioletred": "#c71585",
		  "midnightblue": "#191970",
		  "mintcream": "#f5fffa",
		  "mistyrose": "#ffe4e1",
		  "moccasin": "#ffe4b5",
		  "navajowhite": "#ffdead",
		  "navy": "#000080",
		  "oldlace": "#fdf5e6",
		  "olive": "#808000",
		  "olivedrab": "#6b8e23",
		  "orange": "#ffa500",
		  "orangered": "#ff4500",
		  "orchid": "#da70d6",
		  "palegoldenrod": "#eee8aa",
		  "palegreen": "#98fb98",
		  "paleturquoise": "#afeeee",
		  "palevioletred": "#db7093",
		  "papayawhip": "#ffefd5",
		  "peachpuff": "#ffdab9",
		  "peru": "#cd853f",
		  "pink": "#ffc0cb",
		  "plum": "#dda0dd",
		  "powderblue": "#b0e0e6",
		  "purple": "#800080",
		  "rebeccapurple": "#663399",
		  "red": "#ff0000",
		  "rosybrown": "#bc8f8f",
		  "royalblue": "#4169e1",
		  "saddlebrown": "#8b4513",
		  "salmon": "#fa8072",
		  "sandybrown": "#f4a460",
		  "seagreen": "#2e8b57",
		  "seashell": "#fff5ee",
		  "sienna": "#a0522d",
		  "silver": "#c0c0c0",
		  "skyblue": "#87ceeb",
		  "slateblue": "#6a5acd",
		  "slategray": "#708090",
		  "slategrey": "#708090",
		  "snow": "#fffafa",
		  "springgreen": "#00ff7f",
		  "steelblue": "#4682b4",
		  "tan": "#d2b48c",
		  "teal": "#008080",
		  "thistle": "#d8bfd8",
		  "tomato": "#ff6347",
		  "turquoise": "#40e0d0",
		  "violet": "#ee82ee",
		  "wheat": "#f5deb3",
		  "white": "#ffffff",
		  "whitesmoke": "#f5f5f5",
		  "yellow": "#ffff00",
		  "yellowgreen": "#9acd32"
		};

Color.prototype.nameToRgb = function(name) {
	var hex = Color.prototype.cssNames[name];
	return this.hexToRgb(hex);
}

Color.prototype.clone = function(color) {
	color = color || this;
	return new Color([color.r,color.g,color.b, color.a]);
}	

Color.prototype.toString = function() {
	return this.toHex();
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
Color.prototype.hslToRgb = function(h, s, l){
    var r, g, b;
    // h entered in degrees
    h /= 360;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
Color.prototype.toHsla= function(r,g,b,a){
	r = r || this.r,
	g = g || this.g,
	b = b || this.b,
	a = a || this.a || 1;
	
	r = r/255 || 0,
	g = g/255 || 0,
	b = b/255 || 0,
    max = Math.max(r, g, b),
    min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }

    return [h,s,l,a];
}

Color.prototype.cmykToRgb = function(c,m,y,k){
 
		c = c / 100;
		m = m / 100;
		y = y / 100;
		k = k / 100;
 
		var r = 1 - Math.min( 1, c * ( 1 - k ) + k ),
		g = 1 - Math.min( 1, m * ( 1 - k ) + k ),
		b = 1 - Math.min( 1, y * ( 1 - k ) + k );
 
		r = Math.round(r * 255 );
		g = Math.round(g * 255 );
		b = Math.round(b * 255 );
 
		return [r,g,b];
	}


Color.prototype.toCmyk = function (r,g,b) {
	r = r || this.r,
	g = g || this.g,
	b = b || this.b,
	
	computedC = 0,
	computedM = 0,
	computedY = 0,
	computedK = 0,

	//remove spaces from input RGB values, convert to int
	r = parseInt( (''+r).replace(/\s/g,''),10 ), 
	g = parseInt( (''+g).replace(/\s/g,''),10 ), 
	b = parseInt( (''+b).replace(/\s/g,''),10 ); 

	if ( r==null || g==null || b==null ||
	   isNaN(r) || isNaN(g)|| isNaN(b) )
	{
	 alert ('Please enter numeric RGB values!');
	 return;
	}
	if (r<0 || g<0 || b<0 || r>255 || g>255 || b>255) {
	 alert ('RGB values must be in the range 0 to 255.');
	 return;
	}

	// BLACK
	if (r==0 && g==0 && b==0) {
		computedK = 1;
		return [0,0,0,1];
	}

	computedC = 1 - (r/255);
	computedM = 1 - (g/255);
	computedY = 1 - (b/255);

	var minCMY = Math.min(computedC,
	            Math.min(computedM,computedY));
	computedC = (computedC - minCMY) / (1 - minCMY) ;
	computedM = (computedM - minCMY) / (1 - minCMY) ;
	computedY = (computedY - minCMY) / (1 - minCMY) ;
	computedK = minCMY;

	return [computedC,computedM,computedY,computedK];
}

//convert a hexidecimal color string to 0..255 R,G,B
Color.prototype.hexToRgb = function(hex){
	hex = hex.replace('#','');
	if(hex.length === 3) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	var bigint = parseInt(hex, 16),
    r = (bigint >> 16) & 255,
    g = (bigint >> 8) & 255,
    b = bigint & 255;
    return [r,g,b];
}

//convert 0..255 R,G,B values to a hexidecimal color string
Color.prototype.toHex = function(r,g,b){
	var r = r || this.r,
	g = g || this.g,
	b = b || this.b;
    bin = r << 16 | g << 8 | b;
    return (function(h){
        return '#'+ new Array(7-h.length).join("0")+h
    })(bin.toString(16).toUpperCase())
}

Color.prototype.isHex = function(str) {
	var regex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
	return regex.test(str);
}

Color.prototype.blend = function(rgb, percentage) {
	var percentage = percentage || 0.5, round = Math.round;
	r = round(interpolate(this.r, rgb.r, percentage) ),
	g = round(interpolate(this.g, rgb.g, percentage) ),
	b = round(interpolate(this.b, rgb.b, percentage) );
	a = interpolate(this.a, rgb.a, percentage);
	
	return new Color(r,g,b,a);
}

Color.prototype.steps = function(rgb, steps) {
	var gradient = [], color;
	steps = steps || 2;
	steps +=1;
	for(var percentage = i = 1/steps; percentage<0.99999; percentage += i) {
		console.log(percentage);
		color = Color.prototype.blend.call(this,rgb, percentage);
		gradient.push(color);
	}
	return gradient;
}

Color.prototype._normalizeValue = function(min,max,value) {
	if(value > max) {
		return max;
	} else if(value < min) {
		return min;
	}
	return value;
}

Color.prototype._normalize = function() {
	this.r = this._normalizeValue(0,255,this.r);
	this.g = this._normalizeValue(0,255,this.g);
	this.b = this._normalizeValue(0,255,this.b);
	this.a = this._normalizeValue(0,1,this.a);
}

Color.prototype.add = function() {
	var sum = [this.r, this.g, this.b, this.a], color;
	for(var i = 0; i<arguments.length; i++) {
		color = arguments[i];
		color = ( color instanceof Color)? color : {r:color,g:color,b:color};
		sum[0] += color.r;
		sum[1] += color.g;
		sum[2] += color.b;
	}
	newSum = new Color(sum);
	newSum._normalize(newSum);
	return newSum;
}

Color.prototype.subtract = function() {
	var minuend = [this.r, this.g,this.b,this.a], difference, color;
	for(var i =0; i<arguments.length; i++) {
		color = arguments[i];
		color = ( color instanceof Color)? color : {r:color,g:color,b:color};
		minuend[0] -= color.r;
		minuend[1] -= color.g;
		minuend[2] -= color.b;
	}
	difference = new Color(minuend);
	difference._normalize();
	return difference;
}

Color.prototype.multiply = function() {
	var product=[this.r, this.g, this.b], color;
	
	for(var i = 0; i<arguments.length; i++) {
		color = arguments[i];
		color = ( color instanceof Color)? color : {r:color,g:color,b:color};
		product[0] *= color.r;
		product[1] *= color.g;
		product[2] *= color.b;
	}
	newProduct = new Color(product);
	newProduct._normalize(newProduct);
	return newProduct;
}

Color.prototype.divide = function() {
	var quotient, dividend=[this.r, this.g,this.b];
	for(var i =0; i<arguments.length; i++) {
		color = arguments[i];
		color = ( color instanceof Color)? color : {r:color,g:color,b:color};
		dividend[0] /= color.r;
		dividend[1] /= color.g;
		dividend[2] /= color.b;
	}
	quotient = new Color(dividend);
	quotient._normalize(quotient);
	return quotient;
}

Color.prototype.pow = function() {
	var base=[this.r, this.g,this.b], color, sum = [0,0,0];
	
	for(var i =0; i<arguments.length; i++) {
		color = arguments[i];
		color = ( color instanceof Color)? color : {r:color,g:color,b:color};
		sum[0] = Math.pow(base[0],color.r);
		sum[1] = Math.pow(base[1],color.g);
		sum[2] = Math.pow(base[2],color.b);
		base = sum;
	}
	newSum = new Color(sum);
	newSum._normalize(newSum);
	return newSum;
}

Color.prototype.log = function() {
	var base=[this.r, this.g,this.b], color, sum = [0,0,0];
	
	for(var i =0; i<arguments.length; i++) {
		color = arguments[i];
		color = ( color instanceof Color)? color : {r:color,g:color,b:color};
		sum[0] = Math.log(base[0]) / Math.log(color.r);
		sum[1] = Math.log(base[1]) / Math.log(color.g);
		sum[2] = Math.log(base[2]) / Math.log(color.b);
		base = sum;
	}
	newSum = new Color(sum);
	newSum._normalize(newSum);
	return newSum;
}

Color.prototype.math = function(cb) {
	var color, result;
	result = cb(this.r,this.g,this.b,this.a);
	newResult = new Color(result);
	newResult._normalize(newResult);
	return newResult;
}

Color.prototype.hue= function(h) {
	var color = this,
	percent = arguments[0]/360,
	hsl = Color.prototype.toHsl.call(color);
	
	if(!h) {
		return hsl[0]*360;
	}
	
	degrees = Color.prototype._normalizeValue(0,1,percent);
	newRGB = Color.prototype.hslToRgb(percent,hsl[1], hsl[2]);
	return new Color(newRGB);
}

Color.prototype.saturation = function(s) {
	var color = this,
	hsl = Color.prototype.toHsl.call(color);
	
	if(!s) {
		return hsl[1];
	}

	saturation = Color.prototype._normalizeValue(0,1,s);
	newRGB = Color.prototype.hslToRgb(hsl[0],s, hsl[2]);
	return new Color(newRGB);
}

Color.prototype.lightness = function(l) {
	var color = this,
	hsl = Color.prototype.toHsl.call(color);
	
	if(!l) {
		return hsl[2];
	}
	
	lightness = Color.prototype._normalizeValue(0,1,l);
	newRGB = Color.prototype.hslToRgb(hsl[0],hsl[1], l);
	return new Color(newRGB);
}

Color.prototype.alpha = function() {
	var color=this, alpha=arguments[0];
	if(!arguments.length) {
		return color.a;
	}

	alpha = Color.prototype._normalizeValue(0,1,alpha);
	
	newColor = color.clone();
	newColor.a = alpha;
	return newColor;
}