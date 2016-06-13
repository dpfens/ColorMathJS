var get = {
	JSON: function(url, cb) {
		var oReq = new XMLHttpRequest();
		oReq.onload = function(e) {
			var response = oReq.responseText;
			cb(JSON.parse(response));
		}
		oReq.open("GET", url);
		oReq.responseType = "text";
		oReq.send();
	}
},
promise = {
	JSON: function(url) {
		// Return a new promise.
		return new Promise(function(resolve, reject) {
			// Do the usual XHR stuff
			var req = new XMLHttpRequest();
			req.open('GET', url);

			req.onload = function() {
				// This is called even on 404 etc
				// so check the status
				if (req.status == 200) {
					// Resolve the promise with the response text
					resolve(JSON.parse(req.response));
				}
				else {
					// Otherwise reject with the status text
					// which will hopefully be a meaningful error
					reject(Error(req.statusText));
				}
			};

			// Handle network errors
			req.onerror = function() {
				reject(Error("Network Error"));
			};

			// Make the request
			req.send();
		});
	}
}


function DBProvider() {
	this._db = null;
	this._schema = null;
	this._tables = {};
}
	
DBProvider.prototype._buildSchema = function() {
	var sB = lf.schema.create('colors', 1);

	// Build Color table
	sB.createTable('Color')
	    .addColumn('id', lf.Type.INTEGER)
	    .addColumn('hex', lf.Type.STRING)
	    .addColumn('opacity', lf.Type.Number)
	    .addColumn('name', lf.Type.STRING)
	    .addColumn('userDefined', lf.Type.BOOLEAN)
	    .addColumn('source', lf.Type.STRING)
	    .addColumn('time_stamp', lf.Type.DATE_TIME)
	    .addIndex('idxNameAsc', ['name'], false, lf.Order.ASC)
	    .addPrimaryKey(['id']);
	
	// Build Palette table
	sB.createTable('Palette')
	    .addColumn('id', lf.Type.INTEGER)
	    .addColumn('name', lf.Type.STRING)
	    .addColumn('description', lf.Type.STRING)
	    .addUnique('uniqName', ['name'])
	    .addPrimaryKey(['id']);
	
	// Build many-to-many ColorPalette table
	sB.createTable('ColorPalette')
	    .addColumn('id', lf.Type.STRING)
            .addColumn('palette_id', lf.Type.INTEGER)
            .addColumn('color_id', lf.Type.INTEGER)
	    .addForeignKey('fk_paletteId', {
		local: 'palette_id',
		ref: 'Palette.id',
		action: lf.ConstraintAction.CASCADE
            })
            .addForeignKey('fk_colorId', {
		local: 'color_id',
		ref: 'Color.id',
		action: lf.ConstraintAction.CASCADE
            })
	    .addIndex('idxPaletteIdAsc', ['palette_id'], false, lf.Order.ASC)
	    .addPrimaryKey(['id']);

        /** Select Colors in Palette (across many-to-many table)
	* SELECT color.id, color.name 
	* FROM color INNERJOIN color_palette
	* ON color_palette.color_id=color.id
	* WHERE color_palette.palette_id={{palette.id}}
	**/

	/** Lovefield equivalent
	* db.select(Color.id, Color.name) 
	* .from(Color)
	* .innerjoin( ColorPalette, ColorPalette.color_id.eq( Color.id) )
	* .where(ColorPalette.palette_id.eq(palette.id) )
	**/

        /** Select color based on name with "red" inside it (untested)
	* SELECT *
	* FROM color
	* WHERE color.name LIKE `red`
	**/

	/** Lovefield equivalent
	* db.select(Color.id, Color.name) 
	* .from(Color)
	* .where(Color.name.match(/(.+)?red(.+)?/g) )
	**/
	
	this._schema = sB;
}

DBProvider.prototype.connect = function(cb) {
	if (this._schema === null) {
		this._buildSchema();
	}

	// return Then-able
	if(this._db) {
		cb(this._db);
	}

	
	this._schema.connect().then(function(db) {
		this._db = db;
		cb(this._db);

	});
}

var connection = new DBProvider(),
colorContainer = document.getElementById("color-list");


connection.connect(function(db) {
	var colorTable = db.getSchema().table("Color"),
	paletteTable =  db.getSchema().table("Palette"),
	colorPaletteTable =  db.getSchema().table("ColorPalette");
	
	
	
	get.JSON('/ColorMathJS/data/wikipedia-colors.json', function(data) {
		var rows = [];
		for(var i =0; i<data.length; i++) {
			var colorRow = data[i],
			row = colorTable.createRow({
				id: i+1,
				name: colorRow.Name,
				hex: colorRow.Hex,
				opacity: 1,
				source: colorRow.wikipedia,
				userDefined: false,
				time_stamp: new Date()
			});
			rows.push(row);
		}
		// Add rows of colors into Color table
		return db.insertOrReplace().into(colorTable).values(rows).exec()
		.then(function() {
			// Select all system-defined colors
			return db.select().from(colorTable).orderBy(colorTable.hex, lf.Order.ASC).where(colorTable.userDefined.eq(false)).exec();	
		})
		.then(function(systemColors) {
			var formattedColors = listColors(systemColors);;
			showColors(formattedColors);
		})
		
		
	});
});

function showColors(colorHTML) {
	colorContainer.innerHTML = colorHTML;
}

function activateCards() {
	
}

function listColors(colors) {
	var color, row, results="";
	for (var i =0; i<colors.length; i++) {
		row = colors[i],
		color = formatColor(row);
		results += color;
	}
	return results;

	function formatColor(color) {
		var colorInstance = new Color(color.hex),
		contrastRatios = {
			black: colorInstance.contrastRatio(new Color("black") ),
			white: colorInstance.contrastRatio(new Color("white") )
		},
		initialContrastRatio = colorInstance.contrastRatio(new Color("black") ),
		largeTextColor = (contrastRatios.white < contrastRatios.black) ? "black" : "white",
		normalTextColor = (contrastRatios.white < contrastRatios.black) ? "black" : "white",
				
		largeColorInstance = new Color(largeTextColor),
		normalColorInstance = new Color(normalTextColor),
		
		largeContrastRatio = colorInstance.contrastRatio(largeColorInstance),
		normalContrastRatio = colorInstance.contrastRatio(normalColorInstance),
		largeStandard = (largeContrastRatio > 4.5) ? "AAA" : (largeContrastRatio > 3) ? "AA" : "Not Met",
		normalStandard = (normalContrastRatio > 7) ? "AAA" : (normalContrastRatio > 4.5) ? "AA" : "Not Met";
				
		
		
		result = '<div class="card" data-hex="'+color.hex+'" style="background:'+color.hex+';">';
		result += '<h3 class="title" style="color: '+largeTextColor+'">'+color.name+' (' + largeStandard +') </h3>';
		result += '<p style="color:'+normalTextColor+'">'+color.hex+' (' + normalStandard +') </p>';
		result += '</div>';
		return result;
	}
}
