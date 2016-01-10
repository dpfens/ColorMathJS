var app = angular.module('docsApp', ['ngSanitize', "ngAnimate"]);

app.directive('prism', [function() {
    return {
        restrict: 'E',
        scope: {
        	code: '@',
        	language: '@'
        },
        template: '<pre><code class="language-{{language}}" ng-bind="code">{{ code }}</code></pre>',
        replace: true,
        link: function (scope, element, attrs) {
            element.ready(function() {
                Prism.highlightElement(element.find("code")[0]);
            });
            scope.$watch('code', function(v,o) {
            	if(v!==o) {
            		Prism.highlightElement(element.find("code")[0]);
            	}
			});
        }
    } 
}]);

app.service("docsService", [  function() {
	var docs = [
	    {
		 name: "Color",
		 description: "Used to create a new instance of a Color from raw color data. This constructor accepts CSS color names, hex values, and rgb values.",
		 arguments: [],
		 example: '// create instance of a Color using CSS color name\nvar purple = new Color("blueviolet"),'+
		 '\n// create instance of a Color using hex values\nred = new Color("#FF0000"),'+
		 '\n// create instance of a Color using r,g,b values\nolive = new Color(128,128,0);',
		 methods: [{
			 name: "nameToRgb",
			 arguments: [{
				 name: "name",
				 units: "string"
			 	}],
			 val: "[r,g,b]",
			 description: "This static method takes a CSS color name and returns an [r,g,b] array.",
			 example: '// provide name of CSS color\nColor.prototype.nameToRgb("olive");'+
			 ' // [128, 128, 0]',
		 },
		 {
			 name: "clone",
			 arguments: [],
			 val: "Color",
			 description: "this method returns a new copy of a previously existing Color instance.",
			 equations: [],
			 example: '// create instance of a Color\nvar purple = new Color("purple");'+
				 '// provide name of CSS color\nColor.prototype.clone(purple); // Color {r: 128, g: 0, b: 128, a: 1}',
		 },
		 {
			 name: "toString",
			 arguments: [],
			 val: "string",
			 description: "This method returns an instance of a Color as hex",
			 equations: [],
			 example: '// create instance of a Color\nvar purple = new Color("purple");'+
			 '\npurple.toString(); // "#800080" ',
		 },
		 {
			 name: "hslToRgb",
			 arguments: [{
				 name: "h",
				 units: "degree"
			 	},
			 	{
					 name: "s",
					 units: "number"
				 },
				 {
					 name: "l",
					 units: "number"
				 }
			 ],
			 val: "[r,g,b]",
			 description: "This static method takes an hsl color and returns it as an [r,g,b] array",
			 example: '// provide name of CSS color\nColor.prototype.hslToRgb(72,0.5,0.2);'+
			 ' // [66, 77, 25]',
		 },
		 {
			 name: "toHsla",
			 arguments: [{
				 name: "r",
				 units: "number"
			 	},
			 	{
					 name: "g",
					 units: "number"
				 },
				 {
					 name: "b",
					 units: "number"
				 },
				 {
					 name: "a",
					 units: "number"
			 }],
			 val: "[h,s,l]",
			 description: "When called as a static method, this method takes an hsla color and returns an [h,s,l,a] array. When called from a Color instance, it returns that color as a an [h,s,l,a] array.",
			 example: '// create instance of a Color\nvar purple = new Color("purple");'+
			 '\npurple.toHsla(); // [300, 1, 0.25098039215686274, 1] \n' +
			 '// provide an rgb value (a optional) \nColor.prototype.toHsl(66,77,25); // [0.19940476190476186, 0.5714285714285715, 0.19215686274509802, 1]',
		 },
		 {
			 name: "cmykToRgb",
			 arguments: [{
				 name: "c",
				 units: "number"
			 	},
			 	{
					 name: "m",
					 units: "number"
				 },
				 {
					 name: "y",
					 units: "number"
				 },
				 {
					 name: "k",
					 units: "number"
			 }],
			 val: "[r,g,b]",
			 description: "This static method takes c,m,y,k values and returns an [r,g,b] array.",
			 example: '// provide a c,m,y,k value \nColor.prototype.cmykToRgb(35,0,25,0); // [166, 255, 191]',
		 },
		 {
			 name: "toCmyk",
			 arguments: [{
				 name: "r",
				 units: "number"
			 	},
			 	{
					 name: "g",
					 units: "number"
				 },
				 {
					 name: "b",
					 units: "number"
			 }],
			 val: "[c,m,y,k]",
			 description: "When called as a static method, this method takes an r,g,b color and returns a [c,m,y,k] array. When called from a Color instance, it returns that color as a an [c,m,y,k] array.",
			 example: '// create instance of a Color \nvar purple = new Color("purple");'+
			 '\npurple.toCmyk(); // [0, 1, 0, 0.4980392156862745] \n' +
			 '// provide an rgb value (a optional) \nColor.prototype.toCmyk(66,77,25); // [0.14285714285714307, 0, 0.6753246753246754, 0.6980392156862745]',
		 },
		 {
			 name: "hexToRgb",
			 arguments: [{
				 name: "hex",
				 units: "string"
			 	}],
			 val: "kcal",
			 description: "This static method takes a hex string and returns an [r,g,b] array",
			 example: '// provide a hex value \nColor.prototype.hexToRgb("#800080"); // [128, 0, 128]',
		 },
		 {
			 name: "toHex",
			 arguments: [{
				 name: "r",
				 units: "number"
			 	},
			 	{
					 name: "g",
					 units: "number"
				 },
				 {
					 name: "b",
					 units: "number"
			 }],
			 val: "",
			 description: "When called as a static method, this method takes an r,g,b color and returns a hex string. When called from a Color instance, it returns that color as a an hex string.",
			 example: '// create instance of a Color \nvar purple = new Color("purple");'+
			 '\npurple.toHex(); // "#800080" \n' +
			 '// provide a hex value \nColor.prototype.toHex(128, 0, 128); // "#800080"',
		 },
		 {
			 name: "isHex",
			 arguments: [{
				 name: "object",
				 units: "object"
			 }],
			 val: "boolean",
			 description: "This static method takes any object and returns whether or not the object is a valid hex string",
			 example: 'Color.prototype.isHex([]); // false\n'+
			 'Color.prototype.isHex("#800080"); // true',
		 },
		 {
			 name: "blend",
			 arguments: [{
				 name: "color",
				 units: "Color"
			 },
			 {
				 name: "percentage",
				 units: "number",
				 optional: true,
			 }],
			 val: "Color",
			 description: "This method blends two colors together using a specified percentage of the color. For example, <code class=\"language-javascript\">purple.blend(olive, 0.7)</code> blends the two colors using 70% olive, and 30% purple. The default percentage is 0.5 (or 50% of each color)",
			 example: '// create instance of two Colors \nvar purple = new Color("purple"),'+
			 'olive = new Color(128,128,0),'+
			 '\npurple.blend(olive, 0.7); // Color {r: 128, g: 90, b: 38, a: 1}',
		 },
		 {
			 name: "steps",
			 arguments: [{
				 name: "color",
				 units: "Color"
			 },
			 {
				 name: "steps",
				 units: "number",
				 optional: true,
			 }],
			 val: "Color",
			 description: "This method takes two colors and returns <code>steps</code> Colors between the two colors.",
			 example: '// create instance of two Colors \nvar purple = new Color("purple"),'+
			 'olive = new Color(128,128,0),'+
			 '\npurple.steps(olive, 5); // [Color, Color, Color, Color, Color]',
		 },
		 {
			 name: "add",
			 arguments: [],
			 val: "Color",
			 description: "This method adds any number of color instance values or numbers to all the values of each color.",
			 example: '// create instance of two Colors \nvar purple = new Color(128,0,128),\n'+
			 'olive = new Color(128,128,0),'+
			 '\npurple.add(olive); // Color {r: 255, g: 128, b: 128, a: 1}'+
			 '\n// or add a single number'+
			 '\npurple.add(5); // Color {r: 133, g: 5, b: 133, a: 1}',
		 },
		 {
			 name: "subtract",
			 arguments: [],
			 val: "Color",
			 description: "This method subtracts any number of color instance values or numbers from all the values of each channel.",
			 example: '// create instance of two Colors \nvar purple = new Color(128,0,128),'+
			 'olive = new Color(128,128,0),'+
			 '\npurple.subtract(olive); // Color {r: 0, g: 0, b: 128, a: 1}'+
			 '\n// or subtract a single number'+
			 '\npurple.subtract(5); // Color {r: 123, g: 0, b: 123, a: 1}',
		 },
		 {
			 name: "multiply",
			 arguments: [],
			 val: "Color",
			 description: "This method multiplies any number of color instance values or numbers from all the values of each channel.",
			 example: '// create instance of two Colors \nvar purple = new Color("purple"),'+
			 'olive = new Color(128,128,0),'+
			 '\npurple.multiply(olive); // Color {r: 255, g: 0, b: 0, a: 1}'+
			 '\n// or add a single number'+
			 '\npurple.multiply(5); // Color {r: 255, g: 0, b: 255, a: 1}',
		 },
		 {
			 name: "divide",
			 arguments: [],
			 val: "Color",
			 description: "This method divides any number of color instance values or numbers by the values of each channel.",
			 example: '// create instance of two Colors \nvar purple = new Color("purple"),'+
			 'olive = new Color(128,128,0),'+
			 '\npurple.divide(olive); // Color {r: 1, g: 0, b: 255, a: 1}'+
			 '\n// or add a single number'+
			 '\npurple.divide(5); // Color {r: 25.6, g: 0, b: 25.6, a: 1}',
		 },
		 {
			 name: "pow",
			 arguments: [],
			 val: "Color",
			 description: "This method take the values of each channel and takes the exponent of each Color or number given as an argument.",
			 example: '// create instance of two Colors \nvar purple = new Color("purple"),'+
			 'olive = new Color(128,128,0),'+
			 '\npurple.pow(olive); Color {r: 255, g: 0, b: 1, a: 1}'+
			 '\n// or add a single number'+
			 '\npurple.pow(5); // Color {r: 255, g: 0, b: 255, a: 1}',
		 },
		 {
			 name: "log",
			 arguments: [],
			 val: "Color",
			 description: "This method take the values of each channel and takes the logarithm of each Color or number given as an argument.",
			 example: '// create instance of two Colors \nvar purple = new Color("purple"),'+
			 'olive = new Color(128,128,0),'+
			 '\npurple.log(olive); Color {r: 1, g: 0, b: -0, a: 1}'+
			 '\n// or add a single number'+
			 '\npurple.log(5); // Color {r: 3.0147359065137516, g: 0, b: 3.0147359065137516, a: 1}',
		 },
		 
		 {
			 name: "math",
			 arguments: [{
				 name: "func",
				 units: "Function"
			 }],
			 val: "Color",
			 description: "This method is used to allow the developers an interface for performing custom calculations on a number.  The function argument must take r,g,b,a as arguments and return an [r,g,b,a] array of the result of the calculations",
			 example: '// create instance of a Colors \nvar purple = new Color("purple"),'+
			 '// create a custom function\n'+
			 'function custom(r,g,b,a) { return [r*1,g/2,b+2,a-0.2]; }'+
			 '\npurple.math(custom); Color {r: 128, g: 0, b: 130, a: 0.8}',
		 },
		 {
			 name: "hue",
			 arguments: [{
				 name: "degrees",
				 units: "number"
			 }],
			 val: "Color",
			 description: "This method takes a hue (in degrees) and returns a new Color instance with the specified hue value.",
			 example: '// create instance of a Colors \nvar purple = new Color("purple"),'+
			 '// specify a value (in degrees) for hue\n'+
			 'purple.hue(120); // Color {r: 0, g: 128, b: 0, a: 1}'
		 },
		 {
			 name: "saturation",
			 arguments: [{
				 name: "percentage",
				 units: "number"
			 }],
			 val: "Color",
			 description: "This method takes a saturation percentage and returns a new Color instance with the specified saturation value.",
			 example: '// create instance of a Colors \nvar purple = new Color("purple"),'+
			 '// specify a value for saturation\n'+
			 'purple.saturation(0.5); // Color {r: 96, g: 32, b: 96, a: 1}'
		 },
		 {
			 name: "lightness",
			 arguments: [{
				 name: "percentage",
				 units: "number"
			 }],
			 val: "Color",
			 description: "This method takes a lightness percentage and returns a new Color instance with the specified lightness value.",
			 example: '// create instance of a Colors \nvar purple = new Color("purple"),'+
			 '// specify a value for lightness\n'+
			 'purple.lightness(0.5); // Color {r: 255, g: 0, b: 255, a: 1}'
		 },
		 {
			 name: "alpha",
			 arguments: [{
				 name: "percentage",
				 units: "number"
			 }],
			 val: "Color",
			 description: "This method takes an alpha percentage and returns a new Color instance with the specified alpha value.",
			 example: '// create instance of a Colors \nvar purple = new Color("purple"),'+
			 '// specify a value for alpha\n'+
			 'purple.alpha(0.5); // Color Color {r: 128, g: 0, b: 128, a: 0.5}'
		 }
		 ],
		}
	],
	
	get = function() {
        return docs;
	};
    
    getModule = function(name){
        for(var i =0; i<docs.length; i++) {
            if (docs[i].name = name) {
                return docs[i];
            }
        }
        return false;
    }
    
    getMethod = function(moduleName, method){
        var module = getModule(moduleName);
        for(var i =0; j<module.methods.length; i++) {
            if(module.methods[i].name = method) {
                return module.methods[i]
            }
        }
        return false;
    }
	
	return {
		get: get,
		getModule: getModule,
		getMethod: getMethod,
	};
	
}]);

app.controller('overviewController', ['$scope','docsService', function($scope, docsService) {
	$scope.docs = docsService.get();
	
}]);

app.controller('listController', ['$scope', function($scope) {
}]);

app.controller('moduleController', ['$scope', function($scope) {
}]);

app.controller('methodController', ['$scope', function($scope) {
}]);

$(document).foundation();
