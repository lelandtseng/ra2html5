(function(){
    ra.MapEditor = function(_world, _screen, _graphics){
        var world = _world;
        var screen = _screen;
        var graphics = _graphics;
        var screencanvas = screen.getCanvas();
        screencanvas.onclick = function(e){
            var xx = Math.ceil((screen.getX() + e.layerX) / world.getUnitSize())
            var yy = Math.ceil((screen.getY() + e.layerY) / world.getUnitSize());
            var t = new ra.Tile();
            var img = new Image();
            img.src = 'resource/model01.png';
			t.img = img;
            t.size = 10;
			//alert("x="+xx+"y="+yy+"t="+t.img.src);
			
            world.addTile(xx, yy, t);
            graphics.updateLayoutData();
            var bbb = graphics.createShowData()
            screen.putShowData(bbb);
        }
        
    }
})();
