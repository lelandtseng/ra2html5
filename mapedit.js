(function(){
    ra.MapEditor = function(_world, _screen, _graphics){
        var world = _world;
        var screen = _screen;
        var graphics = _graphics;
        var screencanvas = screen.getCanvas();
        screencanvas.onclick = function(e){
            var xx = Math.floor((screen.getX() + e.clientX - 30) / world.getUnitSize());
            var yy = Math.floor((screen.getY() + e.clientY - 30) / world.getUnitSize());
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
            var jsondata = eval('(' + data + ')');
            for (var d in jsondata) {
                var d2 = d.toString();
                ds = d2.split('_');
                
                if (jsondata[d].img) {
                    var t = new ra.Tile();
                    var img = new Image();
                    img.src = 'resource/'+jsondata[d].img;
                    t.img = img;
                    t.size = jsondata[d].size;
                    world.addTile(parseInt(ds[2]), parseInt(ds[1]), t);
                }
                else {
                
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
                            var src = data[i][j].img.src.split('/').pop();;
                            str = str + "p_" + i + "_" + j + ":{" +
                            "img:'" +
                            src +
                            "',size:" +
                            data[i][j].size +
                            "},"
                        }
                }
                
                
                
            }
            str = str.slice(0, -1) + "}"
            return str;
        }
        
    }
})();
