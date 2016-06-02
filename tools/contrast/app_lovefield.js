function dbProvider() {
	this._db = null;
	this._schema = null;
	this._tables = {};
}
	
dbProvider.prototype._buildSchema = function() {
	var sB = lf.schema.create('colors', 1);

	// Build Color table
	sB.createTable('Color')
	    .addColumn('id', lf.Type.STRING)
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
	    .addColumn('id', lf.Type.STRING)
	    .addColumn('name', lf.Type.STRING)
	    .addColumn('description', lf.Type.STRING)
	    .addUnique('uniqName', ['name'])
	    .addPrimaryKey(['id']);
	
	// Build many-to-many ColorPalette table
	sB.createTable('ColorPalette')
	    .addColumn('id', lf.Type.STRING)
	    .addForeignKey('palette_id', lf.Type.STRING)
	    .addForeignKey('color_id', lf.Type.STRING)
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
	
	return sB;
}

dbProvider.prototype._getDBConnection = function() {
	if (this._db != null) {
		return this._db;
	}

	return this.buildSchema_().connect(connectOptions).then(
		function(db) {
		this.db_ = db;
		this.onConnected_();
		return db;
		}.bind(this));
}

dbProvider.prototype.onConnected_ = function() {
	this._color = this.db_.getSchema().table('Color');
	this.hd_ = this.db_.getSchema().table('Palette');

	var si = this._color,
	hd = this.hd_;

	// Creating a two parametrized queries. Parameters will be bound to actual
	// values before executing such queries.
	this.stockClosingPricesQuery_ = this.db_.
	select().
	from(hd).
	where(lf.op.and(
		hd.Date.between(lf.bind(0), lf.bind(1)),
		hd.Stock.eq(lf.bind(2)))).
		orderBy(hd.Date, lf.Order.ASC);
};
