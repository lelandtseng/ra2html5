(function(){
    //屏幕移动功能
    ra.ScreenMove = function(_screen){
        var screen = _screen;
        var container = screen.getContainer();
        var x = screen.getX();
        var y = screen.getY();
        function move(ex,ey){
            var cl = document.getElementById("color");
            if (ex > 0 && ex < 30)
                x = x-3;
            if (ey > 0 && ey < 30)
                y = y-3;
            if (ex > 530 && ex < 560)
                x = x+3;
            if (ey > 530 && ey < 560)
                y = y+3;
            if (ex > 31 && ex < 530)
                x = x;
            if (ey > 31 && ey < 530)
                y = y;
            if (x < 0 ) x = 0;
            if (y < 0 ) y = 0;
            screen.setX(x);
            screen.setY(y);
            cl.innerHTML = x + ":" + y;
        }

        var interval = null;

        container.addEventListener('mouseover', function(e){
            var ex = e.clientX;
            var ey = e.clientY;
            interval = setInterval(function(){
                move(ex,ey);
            }, 200)
        },false)

        container.addEventListener('mouseout', function(e){
            clearInterval(interval);
        },false)

        container.addEventListener('mousemove', function(e){
            var ex = e.clientX;
            var ey = e.clientY;
            clearInterval(interval);
            interval = setInterval(function(){
                move(ex,ey);
            }, 20)
        },false)
    }
})()