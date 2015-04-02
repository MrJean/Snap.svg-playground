/**
 * Windmill
 *
 * Speed will update after animation cycle is complete
 */

function Windmill(options) {

    var svg = undefined;

    var blades = {
        blade1 : { transform: 'r30 50 50', rotation: 'r390,50,50' },
        blade2 : { transform: 'r150 50 50' },
        blade3 : { transform: 'r270 50 50' }
    };
    var ringGroup = undefined;
    var bladeGroup = undefined;
    var windmill = undefined;

    function drawRings() {
        svg = Snap(ops.element);
        svg.attr({ viewBox: "0 0 100 100" });
        
        var ringMask = svg.path("M37,48 L8,67 L10,10 L44,10 L42,30 z").attr({
            fill: '#fff'
        });
        var outerRing = svg.circle(50, 50, 30);
        outerRing.attr({
            stroke: ops.fill,
            strokeWidth: 3,
            fill: 'none'
        });
        var innerRing = svg.circle(50, 50, 22);
        innerRing.attr({
            stroke: ops.fill,
            strokeWidth: 3,
            fill: 'none'
        });
        var ringPart1= svg.g(outerRing, innerRing);
        ringPart1.attr({
            mask: ringMask
        });
        var ringPart2 = ringPart1.clone().attr({
            transform: 'r120 50 50'
        });
        var ringPart3 = ringPart1.clone().attr({
            transform: 'r240 50 50'
        });
        ringGroup = svg.g(ringPart1, ringPart2, ringPart3);
    }

    function drawBlades() {
        var blade1 = svg.ellipse(70, 50, 20, 5);
        blade1.attr({
            fill: ops.fill,
            transform: blades.blade1.transform
        });
        var blade2 = blade1.clone();
        blade2.attr({
            transform: blades.blade2.transform
        });
        var blade3 = blade1.clone();
        blade3.attr({
            transform: blades.blade3.transform
        });
        bladeGroup = svg.g(blade1, blade2, blade3);
    }

    function mergeWindmill() {
        var motor = svg.circle(50, 50, 8).attr({
            fill: ops.fill
        });
        windmill = svg.g(ringGroup, bladeGroup, motor);
    }

    function animateWindmill() {
        windmill.stop().animate({
            transform: blades.blade1.rotation
        }, 
        ops.speed, 
        function() {
            windmill.transform(blades.blade1.transform);
            animateWindmill();
        });
    }

    function extend(a, b){
        for(var key in b)
            if(b.hasOwnProperty(key))
                a[key] = b[key];
        return a;
    }
    
    var ops = {
        element: '#windmill',
        fill: '#000',
        speed: 3000
    };
    
    extend(ops, options);
    
    drawRings();
    drawBlades();
    mergeWindmill();
    animateWindmill();

    return {
        changeSpeed : function(speed) {
            ops.speed = speed
        }
    }
};