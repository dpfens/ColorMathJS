app = angular.module('app',[]);

app.factory('storage',[function storageFactory() {
    sB = lf.schema.create('colormathjs', 1);

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

    // Build many-to-many table
    sB.createTable('ColorPalette')
        .addColumn('id', lf.Type.STRING)
        .addColumn('palette_id', lf.Type.STRING)
        .addColumn('color_id', lf.Type.STRING)
        .addIndex('idxPaletteIdAsc', ['palette_id'], false, lf.Order.ASC)
        .addPrimaryKey(['id']);
     

    return sB;

}]);

app.controller('visualController', function($scope, storage) {
	storage.connect().then(function (db) { console.log(db); })
	
});
app.controller('inputController', function($scope) {
	
});
app.controller('outputController', function($scope) {
	
});
