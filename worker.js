
onmessage = function(ev){
    jsonobj = eval('(' + ev.data + ')');
    var func = eval('(' + jsonobj.func + ')');
    var result = func(jsonobj.args);
    postMessage(result);
}
