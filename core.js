
(function(){

    game = {}
    
    game.Scene = function(_unitSize, _width, _height){
    
        EventEmitter.call(this);

        var self = this;
        
        this.addLayout = function(index,layout,callback){
             function func(args){
                var s = "";
                for (var i = 0; i < args[0]; i++) {
                    s = s + i + "-";
                }
                return s;
             }
             
             work(func,[100000],function(data){
                self.emit("add",data);
             });
        }
        
        this.deleteLayout = function(index,callback){
        
        }

        this.getLayout = function(index,callback){

        }

    }

    game.Layout = function(){
        
        this.addTile = function(x,y,tile,callback){
        
        }
        
        this.deleteTile = function(x,y,callback){
        
        }
        
        this.getTile = function(x,y,callback){
        
        }
        
    }

    game.Tile = function(){
        
    }
    
})();


