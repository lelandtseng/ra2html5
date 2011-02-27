function EventEmitter(){
    var map = new Object;
    var listenernum = new Object;
    
    this.addListener = function(eventname, listener){
        this.on(eventname, listener);
    }
    
    this.on = function(eventname, listener){
        var self = this;
        if (arguments.length != 2) {
            self.emit("error", "on() method must have 2 arguments.");
            return;
        }
        if (typeof eventname != "string") {
            self.emit("error", "on() first argument must String type.");
            return;
        }
        if (!(listener instanceof Function)) {
            self.emit("error", "on() second argument must Function type.");
            return;
        }
        if (map[eventname]) 
            ;
        else 
            map[eventname] = new Object;
        
        if (listenernum[eventname]) 
            ;
        else 
            listenernum[eventname] = "1";
        var num = listenernum[eventname] = parseInt(listenernum[eventname]) + 1 + "";
        map[eventname][num] = listener;
        self.emit("newListener", eventname, listener);
        return num;
    }
    this.removeListener = function(eventname, listenernum){
        var self = this;
        if (arguments.length != 2) {
            self.emit("error", "removeListener() method must have 2 arguments.");
            return;
        }
        if (typeof eventname != "string") {
            self.emit("error", "removeListener() first argument must String type.");
            return;
        }
        if (typeof listenernum != "string") {
            self.emit("error", "removeListener() second argument must String type.");
            return;
        }
        delete map[eventname][listenernum];
    }
    this.removeAllListener = function(eventname){
        var self = this;
        if (arguments.length != 1) {
            self.emit("error", "removeAllListener() method must have 1 arguments.");
            return;
        }
        if (typeof eventname != "string") {
            self.emit("error", "removeAllListener() first argument must String type.");
            return;
        }
        delete map[eventname];
    }
    this.listeners = function(eventname){
        var self = this;
        if (arguments.length != 1) {
            self.emit("error", "listeners() method must have 1 arguments.");
            return;
        }
        if (typeof eventname != "string") {
            self.emit("error", "listeners() first argument must String type.");
            return;
        }
        var result = new Array;
        for (var key in map[eventname]) 
            result.push(map[eventname][key]);
        return result;
    }

    this.emit = function(eventname){
        var self = this;
        if (!(arguments.length >= 1)) {
            self.emit("error", "emit() method must have 1 arguments.");
            return;
        }
        if (typeof eventname != "string") {
            self.emit("error", "emit() first argument must String type.");
            return;
        }
        var args = new Array;
        
        for (var i = 0; i < arguments.length - 1; i++) {
            args[i] = arguments[i + 1];
        }
        
        for (var key in map[eventname]) {
            var func = map[eventname][key];
            func.apply(this, args);
        }
    }
    
    this.on("error", function(exception){
        alert(exception);
    });
    
}
