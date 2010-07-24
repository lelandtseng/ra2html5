/**
 * 
 * @param {Object} _screen
 * @param {Object} _world
 */
(function(){
    ra = {}
    
    /**
     * 游戏显卡，用于生成Screen要显示的图像，并将生成的图像向Screen。
     */
    ra.Graphics = function(_screen, _world){
    
        var world = _world;
        
        
        // var buildData = world.getBuildData();  暂时没有
        // var armData = world.getArmData();  暂时没有
        var screen = _screen; // 显示器
        // tile层canvas
        var tileCanvas = document.createElement('canvas');
        tileCanvas.id = "tileLayout";
        tileCanvas.style.display = 'none';
        tileCanvas.width = world.getWidth();
        tileCanvas.height = world.getHeight();
        //buffer
        var buffer = document.createElement('canvas');
        buffer.id = "buffer";
        buffer.style.display = 'none';
        buffer.width = screen.getWidth();
        buffer.height = screen.getHeight();
        
        
        /**
         * 生成屏幕显示的数据
         */
        this.createShowData = function(bool){
            if (bool) {
                updateLayoutData();
            }
            else {
                buffer.getContext('2d').clearRect(0, 0, screen.getWidth(), screen.getHeight());
                buffer.getContext('2d').drawImage(tileCanvas, screen.getX(), screen.getY(), screen.getWidth(), screen.getHeight(), 0, 0, screen.getWidth(), screen.getHeight())
            }
            return buffer;
        }
        
        /**
         * 生成整个底层地图大图片，储存在tileCanvas里。
         */
        this.createTileLayoutData = function(){
            //  var ii = 0,jj = 0;
            for (var j = 0; j < world.getTileData().length; j++) {
                //		ii++;
                var hang = world.getTileData()[j];
                for (var i = 0; i < hang.length; i++) {
                    //			jj++;
                    if (hang[i] instanceof ra.Tile) {
                        tileCanvas.getContext('2d').drawImage(hang[i].img, j * world.getUnitSize(), i * world.getUnitSize(), hang[i].size * world.getUnitSize(), hang[i].size * world.getUnitSize());
                    }
                }
            }
        //	alert("ii="+ii+"jj="+jj);
        }
        
        /**
         * 局部更新地图
         */
        this.updateLayoutData = function(){
            var st = new Date().getTime();
            var x = Math.floor(screen.getX() / world.getUnitSize() - 2);
            var y = Math.floor(screen.getY() / world.getUnitSize() - 2);
            if (x < 0) 
                x = 0;
            if (y < 0) 
                y = 0;
            var h = Math.floor(screen.getWidth() / world.getUnitSize()) + 2;
            var w = Math.floor(screen.getHeight() / world.getUnitSize()) + 2;
            
            tileCanvas.getContext('2d').clearRect(x, y, screen.getWidth(), screen.getHeight());
            
            //alert("h="+h+"w="+w+"y="+y+"x="+x);
            var tileData = world.getTileData();
            var ii = 0, jj = 0;
            for (var j = y; j < h + y; j++) {
            
            
            
            
                var hang = tileData[j];
                ii++;
                for (var i = x; i < w + x; i++) {
                    jj++;
                    try {
                        if (hang[i] != 'undefined') {
                        
                            if (j == y || i == x) {
                                if (hang[i].x) {
                                    var tileold = tileData[hang[i].y][hang[i].x];
                                    if (tileold instanceof ra.Tile) {
                                        tileCanvas.getContext('2d').drawImage(tileold.img, hang[i].y * world.getUnitSize(), hang[j].x * world.getUnitSize(), tileold.size * world.getUnitSize(), tileold.size * world.getUnitSize());
                                    }
                                }
                            }
                            
                            if (hang[i] instanceof ra.Tile) {
                                tileCanvas.getContext('2d').drawImage(hang[i].img, j * world.getUnitSize(), i * world.getUnitSize(), hang[i].size * world.getUnitSize(), hang[i].size * world.getUnitSize());
                            }
                        }
                    } 
                    catch (e) {
                    
                    }
                    
                }
            }
            var et = new Date().getTime();
        //  alert(et - st);alert("ii="+ii+"jj="+jj);
        }
    }
    
    
    /**
     * 显示器
     * @param _canvas
     */
    ra.Screen = function(){
    
        var canvas = document.createElement('canvas');
        canvas.id = "game";
        canvas.width = 500;
        canvas.height = 500;
        canvas.style.margin = 30;
        canvas.style.border = '1px solid #000000';
        var cxt = canvas.getContext('2d');
        var container = document.createElement('div');
        container.id = 'container';
        container.appendChild(canvas);
        container.style.border = '1px solid gray';
        container.style.background = '#FFFF00';
        container.style.width = 560;
        container.style.height = 560;
        container.style.cssFloat = 'left';
        var body = document.body;
        body.appendChild(container);
      
        var x = 0, y = 0; // Screen在所在世界的方位，这是左上角位置的坐标

        // 返回container
        this.getContainer = function(){
            return container;
        }
		
        this.getX = function(){
            return x;
        }
        
        this.setX = function(_x){
            x = _x;
        }
        
        this.getY = function(){
            return y;
        }
        
        this.setY = function(_y){
            y = _y;
        }
        
        this.getWidth = function(){
            return 500;
        }
        
        this.getHeight = function(){
            return 500;
        }
        
       
        /**
         * 推入显示数据
         * @param {Object} data
         */
        this.putShowData = function(data){
            showData = data;
            paint();
        }
        
        // 绘制屏幕
        paint = function(){
            cxt.clearRect(0, 0, canvas.width, canvas.height);
            cxt.drawImage(showData, 0, 0);
        }
        
        /**
         * 抓平功能
         */
        this.screenshots = function(){
            return showData;
        }
        
        /**
         * get canvas.
         */
        this.getCanvas = function(){
            return canvas;
        }
        
    }
    

    
    /**
     * 红警游戏世界
     * unitSize 单元格大小
     *
     */
    ra.World = function(_unitSize, _width, _height){
    
        var unitSize = _unitSize;
        var width = _width;
        var height = _height;
        
        var tileData = new Array(); // 最低层的地表瓦块二维数据
        var buildData = new Array(); // tile之上的建筑物层的二维数据
        var armData = new Array(); // 最上层的武器层，例如坦克，军人等
        for (var i = 0; i < height / unitSize; i++) {
            tileData[i] = buildData[i] = armData[i] = new Array();
            for (var j = 0; j < width / unitSize; j++) {
                tileData[i][j] = buildData[i][j] = armData[i][j] = null;
            }
        }
        
        /**
         * 为游戏世界的地图添加底层瓦块
         */
        this.addTile = function(x, y, tile){
            for (var i = 0; i < tile.size; i++) {
                for (var j = 0; j < tile.size; j++) {
                    if (!(tileData[y + i][x + j] == null)) {
                        this.deleteTile(x + j, y + i);
                    }
                    tileData[y + i][x + j] = {
                        'x': x,
                        'y': y
                    };
                }
            }
            tileData[y][x] = tile;
        }
        
        /**
         * 删除底层瓦块
         */
        this.deleteTile = function(x, y){
        
            if (tileData[y][x] instanceof ra.Tile) {
                var com = tileData[y][x]
                for (var i = 0; i < com.size; i++) {
                    for (var j = 0; j < com.size; j++) {
                        tileData[y + i][x + j] = null;
                    }
                }
            }
            else 
            if (tileData[y][x] != null) {
                var wz = tileData[y][x];
                var xx = wz.x;
                var yy = wz.y;
                var com = tileData[yy][xx]
                for (var i = 0; i < com.size; i++) {
                    for (var j = 0; j < com.size; j++) {
                        tileData[yy + i][xx + j] = null;
                    }
                }
            }
        }
        
        /**
         * 根据坐标得到底层瓦块
         */
        this.getTile = function(x, y){
            var c = tileData[y][x];
            if (c != null) {
                if (c instanceof ra.Tile) {
                    return c;
                }
                else {
                    return this.getTile(c.x, c.y);
                }
            }
            return null;
        }
        
        /**
         * 得到世界单元格大小
         */
        this.getUnitSize = function(){
            return unitSize;
        }
        
        /**
         * 地表层的二维数组数据
         */
        this.getTileData = function(){
            return tileData;
        }
        
        this.getWidth = function(){
            return width;
        }
        
        this.getHeight = function(){
            return height;
        }
    }
    
    /**
     * 构成地形的瓦块
     */
    ra.Tile = function(){
        // 瓦块图片
        this.img = null;
        // 是否可以被建筑
        this.canBuild = true;
        // 是否可以被军人在其之上
        this.canArm = true;
        // 大小
        this.size = 5;
    }    	

})();


