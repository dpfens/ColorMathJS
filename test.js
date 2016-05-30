var test = new Color(150, 2, 255,0.2),
test2 = new Color(150,50,50,0.8),
test3 = new Color("aquamarine"),
test4 = new Color("#0ff"),
difference = test2.subtract(2,test),
product = test.multiply(test2,2),
quotient = test2.divide(5,test),
log = test2.log(2,test),
exp = test.pow(2),
newColor = Color.prototype.alpha.call(test2,0.9),
blend = test.blend( test2, 0.5 ),
gradient = Color.prototype.steps.call(test,test2, 4),
relLum = test.relLum(),
contrastRatio = test.contrastRatio(test2);

console.log(relLum);
console.log(contrastRatio);
console.log(gradient);