(function(){
    ra.MapEditor = function(_world, _screen, _graphics){
        var world = _world;
        var screen = _screen;
        var graphics = _graphics;
        var screencanvas = screen.getCanvas();
        screencanvas.onclick = function(e){
            var xx = Math.round((screen.getX() + e.clientX - 30) / world.getUnitSize());
            var yy = Math.round((screen.getY() + e.clientY - 30) / world.getUnitSize());
            var t = new ra.Tile();
            var img = new Image();
            img.src = 'resource/model01.png';
			t.img = img;
            t.size = 10;
			//alert("x="+xx+"y="+yy+"t="+t.img.src);
			
            world.addTile(yy, xx, t);
            graphics.updateLayoutData();
            var bbb = graphics.createShowData()
            screen.putShowData(bbb);
        }
        
    }
})();
