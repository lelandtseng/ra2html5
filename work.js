
function work(func, args, callback){

    var worker = new Worker("worker.js");
    worker.onmessage = function(ev){
        worker.terminate();
        callback(ev.data);
    }
    var src = {
        'func': func.toString(),
        'args': args
    }.toSource();
    
    worker.postMessage(src);
}

