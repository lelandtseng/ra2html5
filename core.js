(function(){

    /* 命名空间 */
    game = {}
    
    /*
     游戏地图
     width 地图宽度
     height 地图高度
     unit_size 单元大小(像素)
     */
    game.Map = function(unit_size, canvas){
        var canvas_, cxt;
        canvas_ = canvas;
        cxt = canvas.getContext('2d');
        var mapdata, this_unit_size;
        mapdata = null
        this_unit_size = unit_size;
        // begin  生成地图数组
        mapdata = new Array();
        for (var i = 0; i < canvas.height / this_unit_size; i++) {
            mapdata[i] = new Array();
            for (var j = 0; j < canvas.width / this_unit_size; j++) {
                mapdata[i][j] = null;
            }
        }
        // 得到地图宽度
        this.getWidth = function(){
            return canvas_.width;
        }
        
        // 得到地图高度
        this.getHeight = function(){
            return canvas_.height;
        }
        
        // 得到地图单元大小
        this.getUnitSize = function(){
            return this_unit_size;
        }
        
        // 得到地图数据
        this.getData = function(){
            return mapdata;
        }
        
        // 为地图添加部件
        this.addComp = function(x, y, comp){
        
            for (var i = 0; i < comp.size; i++) {
                for (var j = 0; j < comp.size; j++) {
                    // alert("i=>"+i+"  "+"j=>"+j);
                    mapdata[y + i][x + j] = {
                        'x': x,
                        'y': y
                    };
                }
            }
            mapdata[y][x] = comp;
        }
        // 删除地图的部件
        this.deleteComp = function(x, y, comp){
        
            if (mapdata[y][x] instanceof game.Comp) {
                //mapdata[y][x] = null;
                var com = mapdata[y][x]
                for (var i = 0; i < com.size; i++) {
                    for (var j = 0; j < com.size; j++) {
                        mapdata[y + i][x + j] = null;
                    }
                }
            }
            else 
                if (mapdata[y][x] != null) {
                    var wz = mapdata[y][x];
                    var xx = wz.x;
                    var yy = wz.y;
                    var com = mapdata[yy][xx]
                    for (var i = 0; i < com.size; i++) {
                        for (var j = 0; j < com.size; j++) {
                            mapdata[yy + i][xx + j] = null;
                        }
                    }
                }
            
        }
        
        this.createMapImg = function(){
            for (var j = 0; j < mapdata.length; j++) {
                var hang = mapdata[j];
                
                for (var i = 0; i < hang.length; i++) {
                    if (hang[i] instanceof game.Comp) {
                        cxt.drawImage(hang[i].img_current, j * this_unit_size, i * this_unit_size, hang[i].size * this_unit_size, hang[i].size * this_unit_size);
                    }
                }
            }
        }
    }
    
    /* 游戏部件 */
    game.Comp = function(){
        this.size = 5; //   组件大小 ;  实际像素大小为 ： map.unitSize * size
        this.img_east = null;
        this.img_south = null;
        this.img_west = null;
        this.img_north = null;
        this.img_north_west = null;
        this.img_north_east = null;
        this.img_south_west = null;
        this.img_south_east = null;
        this.img_current = null;
    }
    
    /**
     * 屏幕
     */
    game.Display = function(mapcanvas_, canvas_){
    
    
        var canvas,mapcanvas;
		canvas = canvas_;
        var cxt = canvas.getContext('2d');
        mapcanvas = mapcanvas_
        
        //参照点 是像素表示，不是单元格
        this.info = {
            x: 0,
            y: 0
        };
        
        // 绘制屏幕
        this.draw = function(){
            //alert(mapcanvas.width);
            cxt.drawImage(mapcanvas, this.info.x, this.info.y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        }
        
        
        
    }
    
})();
