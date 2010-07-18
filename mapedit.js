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
        

		/**
		 * 生成地图数据
		 */
		this.importTileData = function(data){
			var jsondata = eval('('+data+')');
			for(var d in jsondata){
				var d2 = d.toString();
				ds = d2.split('_');
				
				if(jsondata[d].img){
					var t = new ra.Tile();
					var img = new Image();
					img.src = jsondata[d].img;
					t.img = img;
					t.size = jsondata[d].size;
					world.addTile(parseInt(ds[1]),parseInt(ds[2]),t);
				}else{
					
				}
			}
		}
		
		/**
		 * 生成地图数据
		 */

        this.exportTileData = function(){
            var data = world.getTileData();
            var str = "{";
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].length; j++) {
                    if (data[i][j] == null) 
                        ;
                    else 
                        if (data[i][j] instanceof ra.Tile) {

                            str = str + "p_" + i + "_" + j + ":{" +
                            "img:'" +
                            data[i][j].img.src +
                            "',size:" +
                            data[i][j].size+
                            "},"
                        }
                        else {
                            str = str + "p_" + i + "_" + j + ":{" +
                            "x:" +
                            data[i][j].x +
                            ",y:" +
                            data[i][j].y +
                            "},"
                        }
                }
             
					 
				
            }
            str = str.slice(0, -1) + "}"
			return str;
        }
        
    }
})();
