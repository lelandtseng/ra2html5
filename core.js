(function(){

    /* 命名空间 */
    game = {}
    
    /*
     游戏地图
     width 地图宽度
     height 地图高度
     unit_size 单元大小(像素)
     */
    game.Map = function(width, height, unit_size){
        var mapdata, this_width, this_height, this_unit_size;
        mapdata = null
        this_width = width
        this_height = height
        this_unit_size = unit_size;
        // begin  生成地图数组
        mapdata = new Array();
        for (var i = 0; i < this_height; i++) {
            mapdata[i] = new Array();
            for (var j = 0; j < this_width; j++) {
                mapdata[i][j] = null;
            }
        }//end
        // 得到地图宽度
        this.getWidth = function(){
            return this_width;
        }
        
        // 得到地图高度
        this.getHeight = function(){
            return this_height;
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
        
        this.visible = false;
        //  当前位置
        // this.x = 10;
        // this.y = 10;
        
        
        // 移动
        this.move = function(){
        
        }
    }
    
    /**
     * 屏幕
     */
    game.Display = function(map){
    
        // 地图
        var this_map;
        this_map = map;
        
        
        //参照点
        this.refer_point = {
            x: 0,
            y: 0
        };
        
        // 屏幕宽度  
        this.width = 50;
        
        // 屏幕高度
        this.height = 50;
        
        // 绘制屏幕
        this.draw = function(){
			
			// 
			
			
			
			
            var cxt = document.getElementById("game").getContext('2d');
            var mapdata = this_map.getData();
            var xyobj = mapdata[this.refer_point.y][this.refer_point.x]; // 做上角的对象。
            var drawX,drawY; // 绘制原点
            if(xyobj != null && !(xyobj instanceof game.Comp)){
			  // this.refer_point.y - xyobj.x	
			}	   
		   
            for (var j = 0; j < mapdata.length; j++) {
                var hang = mapdata[j];
                for (var i = 0; i < hang.length; i++) {
                    if (hang[i] instanceof game.Comp) {
                        
                        cxt.drawImage(hang[i].img_current, i * 5, j * 5, hang[i].size * 5, hang[i].size * 5);
                    }
                }
                
            }
            setTimeout("draw()", 50)
        }
        
        
    }
    
})();
