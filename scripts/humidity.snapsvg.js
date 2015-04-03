/**
 * Humidity
 */

function Humidity(options) {

    var surface, drop = undefined;
    var drops = [];
    var dropsPos = [
        [ 't25,-2s,s0.55,0.55', 't25,0s,s0.55,0.55' ],
        [ 't12,-27s,s0.7,0.7', 't12,-25s,s0.7,0.7' ], 
        [ 't-10,-10s,s0.6,0.6', 't-10,-8s,s0.6,0.6' ]
    ];

    function drawDrop() {
        surface = Snap(ops.element);
        surface.attr({ viewBox: "0 0 100 100" });

        drop = surface.path("M30,50 A11,11 0 1,0 50,50 L40,35 z").attr({
            stroke: ops.stroke,
            strokeWidth: 2,
            fill: 'none'
        });
    }

    function adjustHumidity() {
        clearHumidity();
        for (var i = 0; i < ops.humidity; i++) {
            var extraDrop = drop.clone();
            drops[i] = extraDrop;
            extraDrop.attr({
                transform: dropsPos[i][0],
                strokeWidth: 0
            }).animate({
                transform: dropsPos[i][1],
                strokeWidth: 2
            }, ops.speed);
        }
    }

    function clearHumidity() {
        for (i = 0; i < drops.length; i++) {
            drops[i].animate({
                strokeWidth: 0
            }, (ops.speed / 10), function() {
                this.remove();
            });
        }
    }

    function extend(a, b){
        for(var key in b)
            if(b.hasOwnProperty(key))
                a[key] = b[key];
        return a;
    }

    var ops = {
        element: '#humidity',
        stroke: '#000',
        speed: 1000,
        humidity: 0
    };
    
    extend(ops, options);
    drawDrop();
    adjustHumidity();

    return {
        setHumidity : function(humidity) {
            ops.humimdity = humidity
            adjustHumidity();
        }
    }
    
};