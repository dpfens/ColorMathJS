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
	    .addColumn('time_stamp', lf.Type.DATE_TIME)
	    .addUnique('uniqHex', ['hex'])
	    .addUnique('uniqName', ['name'])
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

var connection = new DBProvider();
get.JSON('/ColorMathJS/data/extended_hex.json', function(data) {
	connection.connect(function(db) {
		var colorTable = db.getSchema().table("Color"),
		rows = [];
		for(var i =0; i<data.length; i++) {
			var colorRow = data[i],
			row = colorTable.createRow({
				id: i+1,
				name: colorRow.name,
				hex: colorRow.hex,
				opacity: 1,
				userDefined: false,
				time_stamp: new Date()
			});
			rows.push(row);
		}
		return db.insertOrReplace().into(colorTable).values(rows).exec()
		.then(function() {
			return db.select().from(colorTable).where(colorTable.userDefined.eq(false)).exec();	
		}).then(function(results) {
			var content = listColors(results);
		})
		
	});
});

function listColors(colors) {
	var color, row, results="";
	console.log(colors.length);
	for (var i =0; i<colors.length; i++) {
		row = colors[i],
		color = formatColor(row);
		console.log(color);
		results += color;
	}
	return results;

	function formatColor(color) {
		var colorInstance = new Color(color.hex),
		textColor = (colorInstance.contrastRatio(new Color("black") ) > 4) ? "black" : "white";
		result = '<div style="background:'+color.hex+'; color: '+textColor+'">';
		result += "<h3>"+color.name+"</h3>";
		result += "<p>"+color.hex+"</p>";
		return result;
	}
}
